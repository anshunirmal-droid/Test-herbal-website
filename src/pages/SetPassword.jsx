import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { supabase, supabaseEnabled } from '../supabaseClient.js'
import { useAuth } from '../auth.jsx'
import { AuthShell } from './AuthShell.jsx'

// Landing page for invitation emails and password-reset emails.
export default function SetPassword() {
  const { user, loading, clearNeedsPassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  if (!supabaseEnabled) return <Navigate to="/login" replace />

  if (loading) {
    return <AuthShell title="Set your password"><p>Checking your link…</p></AuthShell>
  }

  if (!user) {
    return (
      <AuthShell title="Link expired">
        <p>This link is no longer valid. Ask for a new reset link from the <Link to="/login">login page</Link>, or contact us for a fresh invitation.</p>
      </AuthShell>
    )
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('The two passwords do not match.')
      return
    }
    setBusy(true)
    const { error: err } = await supabase.auth.updateUser({ password })
    setBusy(false)
    if (err) {
      setError(err.message)
      return
    }
    clearNeedsPassword()
    navigate('/dashboard', { replace: true })
  }

  return (
    <AuthShell title="Set your password">
      <p className="small">Choose a password for {user.email}. Use at least 8 characters.</p>
      <form className="auth-form" onSubmit={submit}>
        <label>
          New password
          <input type="password" required minLength={8} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <label>
          Confirm password
          <input type="password" required minLength={8} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        </label>
        <button className="btn" type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save password'}</button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
    </AuthShell>
  )
}
