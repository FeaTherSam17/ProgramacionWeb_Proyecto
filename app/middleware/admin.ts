declare const defineNuxtRouteMiddleware: any
declare const $fetch: any
declare const useRequestEvent: any
declare const useRequestHeaders: any
declare const setHeader: any

export default defineNuxtRouteMiddleware(async (to: any) => {
  if (to.path === '/admin/login') {
    return
  }

  const isServer = typeof window === 'undefined'

  const session = isServer
    ? await (async () => {
        // On server, ensure admin pages are not cached by CDN or browser
        try {
          const ev = useRequestEvent && useRequestEvent()
          if (ev && setHeader) {
            setHeader(ev, 'Cache-Control', 'no-store, no-cache, max-age=0, must-revalidate')
          }
        } catch (e) {
          // ignore
        }

        const headers = useRequestHeaders ? useRequestHeaders(['cookie']) : undefined

        const result = await $fetch('/api/auth/session', {
          headers
        })

        return result
      })()
    : await $fetch('/api/auth/session', {
        credentials: 'include'
      })

  if (!session?.ok) {
    return navigateTo('/admin/login')
  }
})
