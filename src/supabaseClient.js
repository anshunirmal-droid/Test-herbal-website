import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// The site still works without Supabase (forms fall back to email, login pages explain
// that accounts are not set up yet), so a missing .env never breaks the build.
export const supabaseEnabled = Boolean(url && anonKey)
export const supabase = supabaseEnabled ? createClient(url, anonKey) : null
