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

type AdjacentPostRow = {
  title: string
  slug: string
  resumen: string | null
  image?: string
  date: string
}

const mapPostRow = (row: PublicPostRow | undefined | null): PublicPostRow | null => {
  if (!row) {
    return null
  }

  return row
}

const mapAdjacentRow = (row: PublicPostRow | undefined | null): AdjacentPostRow | null => {
  if (!row) {
    return null
  }

  return {
    title: row.titulo,
    slug: row.slug,
    resumen: row.resumen || null,
    image: row.imagen_portada && /^https?:\/\//i.test(row.imagen_portada) ? row.imagen_portada : undefined,
    date: row.publicado_en || row.creado_en
  }
}

export default defineEventHandler(async (event) => {
  const slug = String(getRouterParam(event, 'slug') || '').trim()

  if (!slug) {
    return {
      ok: true,
      data: {
        post: null,
        prev: null,
        next: null
      }
    }
  }

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

  const post = mapPostRow(result.rows[0] || null)

  if (!post) {
    return {
      ok: true,
      data: {
        post: null,
        prev: null,
        next: null
      }
    }
  }

  const pivotDate = post.publicado_en || post.creado_en

  const [prevResult, nextResult] = await Promise.all([
    sqlQuery<PublicPostRow>(
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
        WHERE p.estado = 'publicado' AND p.publicado_en > $1
        GROUP BY p.id
        ORDER BY p.publicado_en ASC
        LIMIT 1
      `,
      [pivotDate]
    ),
    sqlQuery<PublicPostRow>(
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
        WHERE p.estado = 'publicado' AND p.publicado_en < $1
        GROUP BY p.id
        ORDER BY p.publicado_en DESC
        LIMIT 1
      `,
      [pivotDate]
    )
  ])

  return {
    ok: true,
    data: {
      post,
      prev: mapAdjacentRow(prevResult.rows[0] || null),
      next: mapAdjacentRow(nextResult.rows[0] || null)
    }
  }
})
