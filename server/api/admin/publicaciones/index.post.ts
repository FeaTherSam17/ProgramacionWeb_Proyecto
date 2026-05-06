import { requireAdminSession } from '../../../utils/auth'
import { parseBlogPayload } from '../../../utils/blog'
import { sqlQuery } from '../../../utils/db'

const syncTags = async (postId: number, tags: string[]) => {
  await sqlQuery('DELETE FROM publicaciones_etiquetas WHERE publicacion_id = $1', [postId])

  for (const tag of tags) {
    const tagResult = await sqlQuery<{ id: number }>(
      `
        INSERT INTO etiquetas (nombre)
        VALUES ($1)
        ON CONFLICT (nombre)
        DO UPDATE SET nombre = EXCLUDED.nombre
        RETURNING id
      `,
      [tag]
    )

    const tagId = tagResult.rows[0]?.id

    if (!tagId) {
      throw createError({ statusCode: 500, statusMessage: 'No se pudo resolver la etiqueta.' })
    }

    await sqlQuery(
      `
        INSERT INTO publicaciones_etiquetas (publicacion_id, etiqueta_id)
        VALUES ($1, $2)
        ON CONFLICT (publicacion_id, etiqueta_id)
        DO NOTHING
      `,
      [postId, tagId]
    )
  }
}

export default defineEventHandler(async (event) => {
  requireAdminSession(event)
  const body = await readBody(event)
  const payload = parseBlogPayload(body)

  let result

  try {
    result = await sqlQuery<{ id: number }>(
      `
        INSERT INTO publicaciones_blog (titulo, slug, resumen, contenido, imagen_portada, estado, publicado_en)
        VALUES ($1, $2, $3, $4, $5, $6::varchar, CASE WHEN $6::varchar = 'publicado' THEN CURRENT_TIMESTAMP ELSE NULL END)
        RETURNING id
      `,
      [
        payload.titulo,
        payload.slug,
        payload.resumen,
        payload.contenido,
        payload.imagenPortada,
        payload.estado
      ]
    )
  } catch (error: any) {
    if (error?.code === '23505') {
      throw createError({ statusCode: 409, statusMessage: 'El slug ya existe. Usa uno diferente.' })
    }

    throw error
  }

  const postId = result.rows[0]?.id

  if (!postId) {
    throw createError({ statusCode: 500, statusMessage: 'No se pudo crear la publicacion.' })
  }

  await syncTags(postId, payload.etiquetas)

  return {
    ok: true,
    data: {
      id: postId
    }
  }
})
