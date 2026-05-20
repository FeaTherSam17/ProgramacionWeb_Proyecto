export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/admin/login') {
    return
  }

  const headers = import.meta.server ? useRequestHeaders(['cookie']) : undefined

  const session = await $fetch<{ ok: boolean }>('/api/auth/session', {
    headers,
    credentials: import.meta.server ? undefined : 'include'
  })

  if (!session.ok) {
    return navigateTo('/admin/login')
  }
})
