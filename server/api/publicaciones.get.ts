import { sqlQuery } from '../utils/db'

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

type PublicBlogPost = {
  id: number
  title: string
  description: string
  image?: string
  date?: string
  minRead: number
  path: string
  slug: string
  author: null
  etiquetas: string[]
}

const estimateReadTime = (content: string) => {
  const words = content.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

const isValidImageUrl = (value: string | null) => {
  if (!value) {
    return false
  }

  return /^https?:\/\//i.test(value)
}

export default defineEventHandler(async () => {
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
      WHERE p.estado = 'publicado'
      GROUP BY p.id
      ORDER BY COALESCE(p.publicado_en, p.creado_en) DESC, p.id DESC
    `
  )

  const posts: PublicBlogPost[] = result.rows.map((row) => ({
    id: row.id,
    title: row.titulo,
    description: row.resumen || '',
    image: isValidImageUrl(row.imagen_portada) ? row.imagen_portada || undefined : undefined,
    date: row.publicado_en || row.creado_en,
    minRead: estimateReadTime(row.contenido || ''),
    path: `/blog/${row.slug}`,
    slug: row.slug,
    author: null,
    etiquetas: row.etiquetas || []
  }))

  return {
    ok: true,
    data: posts
  }
})
