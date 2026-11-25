import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase, supabaseEnabled } from '../supabaseClient.js'
import { useAuth } from '../auth.jsx'
import { brand } from '../config.js'
import { AuthShell } from './AuthShell.jsx'

function Tools() {
  const [tools, setTools] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    let cancelled = false
    supabase
      .from('tools')
      .select('id, name, description, url')
      .order('sort_order', { ascending: true })
      .order('name', { ascending: true })
      .then(({ data, error: err }) => {
        if (cancelled) return
        if (err) setError(true)
        else setTools(data)
      })
    return () => { cancelled = true }
  }, [])

  if (error) return <p className="error">We could not load your tools. Please refresh, or contact us if this keeps happening.</p>
  if (!tools) return <p className="small">Loading tools…</p>
  if (tools.length === 0) return <p className="small">No tools have been added to your account yet. We will let you know when they are ready.</p>

  return (
    <ul className="tool-grid">
      {tools.map((t) => (
        <li key={t.id} className="tool-card">
          <h3>{t.name}</h3>
          {t.description && <p className="small">{t.description}</p>}
          <a className="btn btn-small" href={t.url} target="_blank" rel="noreferrer">Open tool</a>
        </li>
      ))}
    </ul>
  )
}

export default function Dashboard() {
  const { user, profile, loading, needsPassword, signOut } = useAuth()

  if (!supabaseEnabled) return <Navigate to="/login" replace />
  if (needsPassword) return <Navigate to="/set-password" replace />
  if (loading) return <AuthShell title="Your dashboard"><p>Loading…</p></AuthShell>
  if (!user) return <Navigate to="/login" replace />

  const status = profile?.status ?? 'pending'
  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <AuthShell title="Your dashboard" wide>
      <div className="acct">
        <dl>
          <div><dt>Name</dt><dd>{profile?.full_name || '—'}</dd></div>
          <div><dt>Email</dt><dd>{user.email}</dd></div>
          <div><dt>Status</dt><dd><span className={`pill ${status}`}>{status}</span></dd></div>
          {memberSince && <div><dt>Member since</dt><dd>{memberSince}</dd></div>}
        </dl>
        <button type="button" className="btn btn-small btn-outline" onClick={signOut}>Log out</button>
      </div>

      {status === 'approved' && (
        <section>
          <h2 className="dash-h">Your tools</h2>
          <Tools />
        </section>
      )}
      {status === 'pending' && (
        <p className="callout">Thanks for signing up. Our team is reviewing your account and your tools will appear here once it is approved. Questions? Email <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p>
      )}
      {status === 'blocked' && (
        <p className="callout">This account does not currently have access. Please contact <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p>
      )}
    </AuthShell>
  )
}
