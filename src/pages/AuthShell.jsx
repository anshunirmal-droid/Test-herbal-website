import { Link } from 'react-router-dom'
import { brand } from '../config.js'
import { Leaf } from '../Leaf.jsx'

// Shared page frame for login, set-password and dashboard screens.
export function AuthShell({ title, children, wide = false }) {
  return (
    <div className="auth-page">
      <header className="auth-top">
        <div className="wrap">
          <Link to="/" className="logo"><Leaf size={26} /><span>{brand.name}</span></Link>
        </div>
      </header>
      <main className={wide ? 'auth-main wide' : 'auth-main'}>
        <div className="auth-card">
          <h1 className="auth-title">{title}</h1>
          {children}
        </div>
      </main>
    </div>
  )
}
