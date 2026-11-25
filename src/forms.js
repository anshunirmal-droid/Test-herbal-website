import { supabase } from './supabaseClient.js'

// Saves a form entry to a Supabase table. Anonymous visitors may insert but never read
// (see supabase/schema.sql). A duplicate waitlist email (Postgres code 23505) is treated
// as success so we never reveal who is already on the list.
export async function saveEntry(table, row) {
  const { error } = await supabase.from(table).insert(row)
  if (error && error.code !== '23505') throw error
}
