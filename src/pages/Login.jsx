import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { supabase, supabaseEnabled } from '../supabaseClient.js'
import { useAuth } from '../auth.jsx'
import { brand } from '../config.js'
import { AuthShell } from './AuthShell.jsx'

export default function Login() {
  const { user, loading, needsPassword } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'signup' | 'forgot'
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  if (needsPassword) return <Navigate to="/set-password" replace />
  if (user && !loading) return <Navigate to="/dashboard" replace />

  if (!supabaseEnabled) {
    return (
      <AuthShell title="Customer login">
        <p>Customer accounts are not switched on yet. Please check back soon, or email us at <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p>
      </AuthShell>
    )
  }

  function switchMode(next) {
    setMode(next)
    setError('')
    setNotice('')
  }

  async function submit(e) {
    e.preventDefault()
    setError('')
    setNotice('')
    setBusy(true)
    try {
      if (mode === 'login') {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) setError('That email and password did not match. Please try again.')
      } else if (mode === 'signup') {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName.trim() }, emailRedirectTo: window.location.origin + '/login' },
        })
        if (err) setError(err.message)
        else setNotice('Almost there. Check your email and click the confirmation link. After that, our team reviews new accounts and you will get access once approved.')
      } else {
        const { error: err } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: window.location.origin + '/set-password',
        })
        if (err) setError(err.message)
        else setNotice('If an account exists for that email, a reset link is on its way.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const titles = { login: 'Customer login', signup: 'Create your account', forgot: 'Reset your password' }

  return (
    <AuthShell title={titles[mode]}>
      {mode === 'signup' && <p className="small">New accounts are reviewed by our team before the dashboard unlocks. Already invited? Use the link in your invitation email instead.</p>}
      <form className="auth-form" onSubmit={submit}>
        {mode === 'signup' && (
          <label>
            Full name
            <input type="text" required maxLength={100} autoComplete="name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </label>
        )}
        <label>
          Email
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {mode !== 'forgot' && (
          <label>
            Password
            <input
              type="password"
              required
              minLength={8}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        )}
        <button className="btn" type="submit" disabled={busy}>
          {busy ? 'Please wait…' : mode === 'login' ? 'Log in' : mode === 'signup' ? 'Create account' : 'Send reset link'}
        </button>
      </form>
      {error && <p className="error" role="alert">{error}</p>}
      {notice && <p className="thanks" role="status">{notice}</p>}
      <div className="auth-links">
        {mode === 'login' && (
          <>
            <button type="button" className="link-btn" onClick={() => switchMode('forgot')}>Forgot password?</button>
            <button type="button" className="link-btn" onClick={() => switchMode('signup')}>Create an account</button>
          </>
        )}
        {mode !== 'login' && <button type="button" className="link-btn" onClick={() => switchMode('login')}>Back to log in</button>}
        <Link to="/">Back to website</Link>
      </div>
    </AuthShell>
  )
}
