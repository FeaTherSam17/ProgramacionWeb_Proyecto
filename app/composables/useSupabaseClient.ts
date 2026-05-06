import { createClient, type SupabaseClient } from '@supabase/supabase-js'

let supabaseClient: SupabaseClient | null = null

export const useSupabaseClient = () => {
  if (supabaseClient) {
    return supabaseClient
  }

  const config = useRuntimeConfig()
  const publicConfig = config.public as Record<string, unknown>
  const supabaseUrl = typeof publicConfig.supabaseUrl === 'string' ? publicConfig.supabaseUrl : ''
  const supabaseAnonKey = typeof publicConfig.supabaseAnonKey === 'string' ? publicConfig.supabaseAnonKey : ''

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase public configuration. Set SUPABASE_URL and SUPABASE_ANON_KEY.')
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    }
  })

  return supabaseClient
}
