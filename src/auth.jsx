import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from './supabaseClient.js'

const AuthContext = createContext(null)

// Invite and password-reset emails send people back to the site with
// "#...&type=invite" or "#...&type=recovery" in the URL. Read it once, before
// supabase-js clears the hash, so we can send them to the set-password page.
function initialNeedsPassword() {
  const hash = window.location.hash
  return /[#&]type=(invite|recovery)\b/.test(hash)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(Boolean(supabase))
  const [needsPassword, setNeedsPassword] = useState(initialNeedsPassword)

  useEffect(() => {
    if (!supabase) return undefined
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (!data.session) setLoading(false)
    })
    const { data: sub } = supabase.auth.onAuthStateChange((event, next) => {
      setSession(next)
      if (event === 'PASSWORD_RECOVERY') setNeedsPassword(true)
      if (!next) {
        setProfile(null)
        setLoading(false)
      }
    })
    return () => sub.subscription.unsubscribe()
  }, [])

  const userId = session?.user?.id

  useEffect(() => {
    if (!supabase || !userId) return undefined
    let cancelled = false
    setLoading(true)
    supabase
      .from('profiles')
      .select('id, email, full_name, status, created_at')
      .eq('id', userId)
      .maybeSingle()
      .then(({ data }) => {
        if (cancelled) return
        setProfile(data ?? null)
        setLoading(false)
      })
    return () => { cancelled = true }
  }, [userId])

  const value = {
    session,
    user: session?.user ?? null,
    profile,
    loading,
    needsPassword,
    clearNeedsPassword: () => setNeedsPassword(false),
    signOut: () => supabase?.auth.signOut(),
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
