import { sqlQuery } from '../../utils/db'

type PublicPostRow = {
  id: number
  titulo: string
  slug: string
  resumen: string | null
  contenido: string
  imagen_portada: string | null
  estado: string
  publicado_en: string | null
  creado_en: string
  etiquetas: string[]
}

type AdjacentPost = {
  title: string
  slug: string
  resumen: string | null
  image?: string
  date: string
}

type PublicationPayload = {
  post: PublicPostRow | null
  prev: AdjacentPost | null
  next: AdjacentPost | null
}

const isValidImageUrl = (value: string | null) => {
  if (!value) {
    return false
  }
  return /^https?:\/\//i.test(value)
}

export default defineEventHandler(async (event): Promise<PublicationPayload> => {
  const slug = getRouterParam(event, 'slug')

  if (!slug || typeof slug !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Slug invalido.' })
  }

  // Obtener el post actual
  const result = await sqlQuery<PublicPostRow>(
    `
      SELECT
        p.id,
        p.titulo,
        p.slug,
        p.resumen,
        p.contenido,
        p.imagen_portada,
        p.estado,
        p.publicado_en,
        p.creado_en,
        COALESCE(array_remove(array_agg(e.nombre), NULL), '{}') AS etiquetas
      FROM publicaciones_blog p
      LEFT JOIN publicaciones_etiquetas pe ON pe.publicacion_id = p.id
      LEFT JOIN etiquetas e ON e.id = pe.etiqueta_id
      WHERE p.slug = $1 AND p.estado = 'publicado'
      GROUP BY p.id
      LIMIT 1
    `,
    [slug]
  )

  const post = result.rows[0] || null

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Publicacion no encontrada.' })
  }

  // Obtener posts anteriores y siguientes para navegación
  const navResult = await sqlQuery<{
    slug: string
    titulo: string
    resumen: string | null
    imagen_portada: string | null
    publicado_en: string | null
    creado_en: string
    position: 'prev' | 'next'
  }>(
    `
      WITH ordered_posts AS (
        SELECT
          p.id,
          p.slug,
          p.titulo,
          p.resumen,
          p.imagen_portada,
          p.publicado_en,
          p.creado_en,
          ROW_NUMBER() OVER (ORDER BY COALESCE(p.publicado_en, p.creado_en) DESC, p.id DESC) as rn
        FROM publicaciones_blog p
        WHERE p.estado = 'publicado'
      ),
      current_post AS (
        SELECT rn FROM ordered_posts WHERE slug = $1
      )
      SELECT
        p.slug,
        p.titulo,
        p.resumen,
        p.imagen_portada,
        p.publicado_en,
        p.creado_en,
        CASE 
          WHEN p.rn < (SELECT rn FROM current_post) THEN 'next'
          ELSE 'prev'
        END as position
      FROM ordered_posts p
      CROSS JOIN current_post cp
      WHERE (p.rn = cp.rn - 1 OR p.rn = cp.rn + 1)
      ORDER BY p.rn
    `,
    [slug]
  )

  let prev: AdjacentPost | null = null
  let next: AdjacentPost | null = null

  for (const row of navResult.rows) {
    const adjacentPost: AdjacentPost = {
      title: row.titulo,
      slug: row.slug,
      resumen: row.resumen,
      image: isValidImageUrl(row.imagen_portada) ? row.imagen_portada || undefined : undefined,
      date: row.publicado_en || row.creado_en
    }

    if (row.position === 'prev') {
      prev = adjacentPost
    } else {
      next = adjacentPost
    }
  }

  return {
    post,
    prev,
    next
  }
})
