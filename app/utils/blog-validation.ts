import type { PostEditorData } from '../components/admin/PostEditorForm.vue'

export type PostFormErrors = Partial<Record<keyof PostEditorData, string>>

const IMAGE_URL_PATTERN = /^https?:\/\/.+\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i

const countWords = (value: string) => value.trim().split(/\s+/).filter(Boolean).length

export const validatePostEditorData = (form: PostEditorData): PostFormErrors => {
  const errors: PostFormErrors = {}

  if (!form.titulo.trim()) {
    errors.titulo = 'El titulo es obligatorio.'
  }

  const resumenWords = countWords(form.resumen)
  if (!form.resumen.trim()) {
    errors.resumen = 'El resumen es obligatorio.'
  } else if (resumenWords < 10) {
    errors.resumen = 'El resumen debe tener al menos 10 palabras.'
  }

  const contenidoWords = countWords(form.contenido)
  if (!form.contenido.trim()) {
    errors.contenido = 'El contenido es obligatorio.'
  } else if (contenidoWords < 20) {
    errors.contenido = 'El contenido debe tener al menos 20 palabras.'
  }

  if (form.imagenPortada.trim() && !IMAGE_URL_PATTERN.test(form.imagenPortada.trim())) {
    errors.imagenPortada = 'La imagen debe ser una URL valida (http/https) con extension de imagen.'
  }

  return errors
}

export const splitTags = (value: string) => {
  return value
    .split(',')
    .map(tag => tag.trim())
    .filter(Boolean)
}

export const countTextWords = countWords
