Deployment checklist for Vercel and Google OAuth

1) Do NOT commit `.env` or secrets to the repo. Use `.env.example` as template.

2) Vercel Environment Variables (set these in Project → Settings → Environment Variables)

Production (main):
- AUTH_SECRET = <secure random string>
- SESSION_SECRET = <optional, same or another secure string>
- AUTH_ALLOWED_EMAILS = samaftvmon@gmail.com
- GOOGLE_CLIENT_ID = <from Google Console>
- GOOGLE_CLIENT_SECRET = <from Google Console>
- GOOGLE_CALLBACK_URL = https://programacion-web-proyecto-lilac.vercel.app/api/auth/google/callback
- NUXT_PUBLIC_SITE_URL = https://programacion-web-proyecto-lilac.vercel.app/
- NUXT_SITE_URL = https://programacion-web-proyecto-lilac.vercel.app/
- DATABASE_URL = <production DB URL>
- SUPABASE_ANON_KEY = <if using supabase>

Preview (branch `test-auth` or any PR previews):
- Set the same variables but change GOOGLE_CALLBACK_URL and the site URLs to the preview domain provided by Vercel for that deployment. Example:
  - GOOGLE_CALLBACK_URL = https://<preview-domain>.vercel.app/api/auth/google/callback
  - NUXT_PUBLIC_SITE_URL = https://<preview-domain>.vercel.app/

3) Google Cloud Console
- Go to APIs & Services → Credentials → OAuth 2.0 Client IDs → select your client.
- Add Authorized redirect URI(s):
  - https://programacion-web-proyecto-lilac.vercel.app/api/auth/google/callback
  - (Optional) https://<preview-domain>.vercel.app/api/auth/google/callback
- Save.

4) Redeploy
- After setting env variables in Vercel, trigger a redeploy of the `main` branch (or the preview branch).

5) Test (use Incognito / cleared cookies)
- Open: https://programacion-web-proyecto-lilac.vercel.app/admin/login
- Click "Continuar con Google" and complete consent.
- In DevTools → Network:
  - Confirm `GET /api/auth/google/callback` returns 302 and includes a `Set-Cookie: admin_session=...; SameSite=None; Secure; HttpOnly; Path=/` header.
  - Confirm subsequent `GET /api/auth/session` includes the `Cookie: admin_session=...` in request headers and returns `{ ok: true, data: ... }`.

6) If something fails
- If `Set-Cookie` is missing: check server code (`server/utils/auth-session.ts`) and ensure `AUTH_SECRET` is set.
- If cookie is set but not sent: ensure domain of callbacks and site match, and SameSite/secure are correct.
- If server responds `{ ok: false }`: ensure `AUTH_SECRET` in Vercel matches the one used to sign the cookie (rotate if necessary).

7) Clean up after a secret leak
- If you accidentally committed secrets to a public repo, rotate those secrets immediately and remove them from git history.

