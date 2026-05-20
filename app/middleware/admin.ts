declare const defineNuxtRouteMiddleware: any
declare const useRequestFetch: any
declare const $fetch: any

export default defineNuxtRouteMiddleware(async (to: any) => {
  if (to.path === '/admin/login') {
    return
  }

  const session = typeof window === 'undefined'
    ? await useRequestFetch()('/api/auth/session')
    : await $fetch('/api/auth/session', {
        credentials: 'include'
      })

  if (!session?.ok) {
    return navigateTo('/admin/login')
  }
})
