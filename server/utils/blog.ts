export type EstadoPublicacion = 'borrador' | 'publicado'

export type BlogPayload = {
  titulo: string
  slug?: string
  resumen?: string | null
  contenido: string
  imagenPortada?: string | null
  estado?: EstadoPublicacion
  etiquetas?: string[]
}

const VALID_STATES: EstadoPublicacion[] = ['borrador', 'publicado']
const IMAGE_URL_PATTERN = /^https?:\/\/.+\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i

const countWords = (value: string) => value.trim().split(/\s+/).filter(Boolean).length

export const slugify = (value: string) => {
  return value
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export const normalizeTags = (tags: unknown) => {
  if (!Array.isArray(tags)) {
    return [] as string[]
  }

  const cleaned = tags
    .map(tag => String(tag).trim().toLowerCase())
    .filter(Boolean)

  return [...new Set(cleaned)]
}

export const parseBlogPayload = (body: unknown): Required<BlogPayload> => {
  const data = (body || {}) as BlogPayload
  const titulo = String(data.titulo || '').trim()
  const contenido = String(data.contenido || '').trim()
  const slug = slugify(data.slug?.trim() || titulo)
  const estado = (data.estado || 'borrador') as EstadoPublicacion

  if (!titulo) {
    throw createError({ statusCode: 400, statusMessage: 'El titulo es obligatorio.' })
  }

  if (!contenido) {
    throw createError({ statusCode: 400, statusMessage: 'El contenido es obligatorio.' })
  }

  if (countWords(contenido) < 20) {
    throw createError({ statusCode: 400, statusMessage: 'El contenido debe tener al menos 20 palabras.' })
  }

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'No se pudo generar un slug valido.' })
  }

  if (!VALID_STATES.includes(estado)) {
    throw createError({ statusCode: 400, statusMessage: 'Estado invalido.' })
  }

  const resumen = data.resumen?.trim() || null

  if (!resumen) {
    throw createError({ statusCode: 400, statusMessage: 'El resumen es obligatorio.' })
  }

  if (countWords(resumen) < 10) {
    throw createError({ statusCode: 400, statusMessage: 'El resumen debe tener al menos 10 palabras.' })
  }

  const imagenPortada = data.imagenPortada?.trim() || null
  if (imagenPortada && !IMAGE_URL_PATTERN.test(imagenPortada)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'La imagen de portada debe ser una URL valida (http/https) con extension de imagen.'
    })
  }

  return {
    titulo,
    slug,
    resumen,
    contenido,
    imagenPortada,
    estado,
    etiquetas: normalizeTags(data.etiquetas)
  }
}
