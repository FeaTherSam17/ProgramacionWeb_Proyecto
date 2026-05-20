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
        console.log('[admin.middleware] SSR - cookies:', headers?.cookie ? 'PRESENT' : 'MISSING')

        const result = await $fetch('/api/auth/session', {
          headers
        })
        
        console.log('[admin.middleware] SSR - session response:', result?.ok ? 'OK' : 'FAIL')
        return result
      })()
    : await $fetch('/api/auth/session', {
        credentials: 'include'
      })

  console.log(`[admin.middleware] ${isServer ? 'SSR' : 'CLIENT'} - session?.ok: ${session?.ok}`)
  
  if (!session?.ok) {
    console.log(`[admin.middleware] Session invalid, redirecting to /admin/login`)
    return navigateTo('/admin/login')
  }
})
