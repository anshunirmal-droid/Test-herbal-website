import { useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { brand, products, faqs } from './config.js'
import { Leaf } from './Leaf.jsx'
import { supabaseEnabled } from './supabaseClient.js'
import { saveEntry } from './forms.js'
import { useAuth } from './auth.jsx'
import Login from './pages/Login.jsx'
import SetPassword from './pages/SetPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'

function Nav() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const links = [
    ['#products', 'Products'],
    ['#sourcing', 'Sourcing'],
    ['#quality', 'Quality'],
    ['#faq', 'FAQ'],
    ['#contact', 'Contact'],
  ]
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="logo">
          <Leaf size={28} />
          <span>{brand.name}</span>
        </a>
        <button className="menu-btn" aria-expanded={open} aria-label="Menu" onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
        <nav className={open ? 'links open' : 'links'}>
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          {supabaseEnabled && (
            <Link to={user ? '/dashboard' : '/login'} onClick={() => setOpen(false)}>{user ? 'Dashboard' : 'Log in'}</Link>
          )}
          <a href="#waitlist" className="btn btn-small" onClick={() => setOpen(false)}>Join the list</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <p className="eyebrow light">From Indian farms to your shelf</p>
          <h1>Ayurvedic herbs, <em>straight from the source.</em></h1>
          <p className="lead">{brand.tagline} Root-only ashwagandha, organic psyllium and standardised boswellia, each traced to the Indian region it grows in.</p>
          <div className="hero-ctas">
            <a href="#products" className="btn">Explore the range</a>
            <a href="#waitlist" className="btn btn-ghost">Get launch updates</a>
          </div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orb orb-1"><Leaf color="#E8A94A" size={120} /></div>
          <div className="orb orb-2"><Leaf color="#9DBF8F" size={80} /></div>
          <div className="orb orb-3"><Leaf color="#D9B98A" size={64} /></div>
        </div>
      </div>
      <div className="wrap trust">
        <span>Single-origin India</span>
        <span>Every lot lab-tested</span>
        <span>Made in a cGMP facility</span>
        <span>Vegan capsules</span>
      </div>
    </section>
  )
}

function Products() {
  return (
    <section className="section" id="products">
      <div className="wrap">
        <p className="eyebrow">The range</p>
        <h2>Three herbs, done properly</h2>
        <div className="grid-3">
          {products.map((p) => (
            <article className="product" key={p.id}>
              <div className="product-art" style={{ background: p.color }}>
                <Leaf color="#F7F3EA" size={72} />
                <span className="role">{p.role}</span>
              </div>
              <div className="product-body">
                <h3>{p.name}</h3>
                <p className="latin">{p.latin} · {p.origin}</p>
                <p className="benefit">{p.benefit}</p>
                <ul>
                  {p.details.map((d) => <li key={d}>{d}</li>)}
                </ul>
                <p className="format">{p.format}</p>
                <p className="caution"><strong>Caution:</strong> {p.caution}</p>
                <div className="product-foot">
                  <span className="price">{p.price}</span>
                  {brand.amazonStoreUrl ? (
                    <a className="btn btn-small" href={brand.amazonStoreUrl} target="_blank" rel="noreferrer">Buy on Amazon</a>
                  ) : (
                    <span className="soon">Coming soon to Amazon</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Sourcing() {
  const regions = [
    ['North Gujarat', 'Psyllium', 'The world’s psyllium heartland, processed around Unjha.'],
    ['Madhya Pradesh & Rajasthan', 'Ashwagandha', 'Dry-land roots harvested at maturity, root only.'],
    ['Central India', 'Boswellia', 'Gum resin tapped from Boswellia serrata trees.'],
  ]
  return (
    <section className="section sand" id="sourcing">
      <div className="wrap split">
        <div>
          <p className="eyebrow">Sourcing</p>
          <h2>We start where the herb grows best</h2>
          <p>Most supplement brands buy from global brokers. We buy from Indian growing regions with generations of know-how, and print the origin on every label so you know exactly where your herb came from.</p>
        </div>
        <ol className="regions">
          {regions.map(([place, herb, note], i) => (
            <li key={place}>
              <span className="num">0{i + 1}</span>
              <div>
                <h3>{place}</h3>
                <p className="small"><strong>{herb}.</strong> {note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Quality() {
  const steps = [
    ['Identity', 'Each lot is checked to confirm it is the right plant and the right part, root only for ashwagandha.'],
    ['Potency', 'Active compounds are measured against the label, such as withanolides and AKBA.'],
    ['Heavy metals', 'Lead, arsenic, cadmium and mercury are tested against strict California Prop 65 limits.'],
    ['Purity', 'Microbes, pesticides and undeclared ingredients are screened by an independent ISO 17025 lab.'],
  ]
  return (
    <section className="section dark" id="quality">
      <div className="wrap">
        <p className="eyebrow light">Quality</p>
        <h2>Four checks on every lot</h2>
        <div className="grid-4">
          {steps.map(([t, d], i) => (
            <div className="check" key={t}>
              <span className="check-num">{i + 1}</span>
              <h3>{t}</h3>
              <p className="small">{d}</p>
            </div>
          ))}
        </div>
        <p className="note">Want the certificate of analysis for your bottle? Email us your lot number at <a href={`mailto:${brand.email}`}>{brand.email}</a>.</p>
      </div>
    </section>
  )
}

function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap narrow">
        <p className="eyebrow">FAQ</p>
        <h2>Questions, answered</h2>
        <div className="faq">
          {faqs.map(({ q, a }) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

function Waitlist() {
  const [email, setEmail] = useState('')
  const [trap, setTrap] = useState('') // honeypot: real visitors never see or fill this
  const [status, setStatus] = useState('idle')

  async function submit(e) {
    e.preventDefault()
    if (!email) return
    if (trap) { setStatus('done'); return }
    if (supabaseEnabled) {
      setStatus('sending')
      try {
        await saveEntry('waitlist', { email: email.trim() })
        setStatus('done')
      } catch {
        setStatus('error')
      }
      return
    }
    if (!brand.waitlistEndpoint) {
      window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('Launch waitlist')}&body=${encodeURIComponent('Please add me to the launch list: ' + email)}`
      setStatus('done')
      return
    }
    setStatus('sending')
    try {
      const res = await fetch(brand.waitlistEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section sand" id="waitlist">
      <div className="wrap narrow center">
        <p className="eyebrow">Launching on Amazon US</p>
        <h2>Be first to know</h2>
        <p>Join the list for launch-day access. One email when we go live, nothing else.</p>
        {status === 'done' ? (
          <p className="thanks">Thank you. You’re on the list.</p>
        ) : (
          <form className="waitlist" onSubmit={submit}>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input id="email" type="email" required maxLength={254} placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} />
            <button className="btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Joining…' : 'Join the list'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="error">Something went wrong. Please email us at {brand.email}.</p>}
      </div>
    </section>
  )
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [trap, setTrap] = useState('')
  const [status, setStatus] = useState('idle')
  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value })

  async function submit(e) {
    e.preventDefault()
    if (trap) { setStatus('done'); return }
    if (!supabaseEnabled) {
      window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('Message from ' + form.name)}&body=${encodeURIComponent(form.message + '\n\n' + form.email)}`
      setStatus('done')
      return
    }
    setStatus('sending')
    try {
      await saveEntry('contact_messages', {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
      })
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="wrap narrow">
        <p className="eyebrow">Contact</p>
        <h2>Send us a message</h2>
        <p>Questions about our herbs, testing or wholesale? Write to us and we will reply by email. Please do not include health or medical details.</p>
        {status === 'done' ? (
          <p className="thanks">Thank you. We have your message and will be in touch.</p>
        ) : (
          <form className="contact-form" onSubmit={submit}>
            <label>
              Name
              <input type="text" required maxLength={100} autoComplete="name" value={form.name} onChange={set('name')} />
            </label>
            <label>
              Email
              <input type="email" required maxLength={254} autoComplete="email" value={form.email} onChange={set('email')} />
            </label>
            <label>
              Message
              <textarea required maxLength={2000} rows={5} value={form.message} onChange={set('message')} />
            </label>
            <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={(e) => setTrap(e.target.value)} />
            <button className="btn" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}
        {status === 'error' && <p className="error">Something went wrong. Please email us at {brand.email}.</p>}
      </div>
    </section>
  )
}

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <a href="#top" className="logo"><Leaf size={24} /><span>{brand.name}</span></a>
          <div className="footer-links">
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            {brand.instagram && <a href={brand.instagram} target="_blank" rel="noreferrer">Instagram</a>}
          </div>
        </div>
        <p className="disclaimer">
          *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease. Consult your healthcare provider before use, especially if you are pregnant, nursing, taking medication or have a medical condition.
        </p>
        <p className="copy">© {year} {brand.name}. All rights reserved.</p>
      </div>
    </footer>
  )
}

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Products />
        <Sourcing />
        <Quality />
        <Faq />
        <Contact />
        <Waitlist />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/set-password" element={<SetPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
