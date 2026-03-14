import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Phone, Menu } from 'lucide-react'
import { siteConfig } from '../data/siteConfig'

export default function Layout({ children }) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand">
            <span className="brand-icon"><ShieldCheck size={20} /></span>
            <span>
              <strong>{siteConfig.brand}</strong>
              <small>Dépannage local premium</small>
            </span>
          </Link>

          <nav className="desktop-nav">
            <Link to="/">Accueil</Link>
            <Link to="/serrurier/27/val-de-reuil">Val-de-Reuil</Link>
            <a href="#services">Services</a>
          </nav>

          <div className="header-actions">
            <a className="btn btn-outline" href={`tel:${siteConfig.phone.replace(/\s+/g, '')}`}>
              <Phone size={16} /> {siteConfig.phone}
            </a>
            <a className="btn btn-dark" href="#contact">Devis gratuit</a>
            <button className="mobile-menu" aria-label="Menu">
              <Menu size={18} />
            </button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            <h3>{siteConfig.brand}</h3>
            <p>Base de site moderne, locale et duplicable par ville et par métier.</p>
          </div>
          <div className="footer-links">
            <Link to="/">Accueil</Link>
            <Link to="/serrurier/27/val-de-reuil">Page Val-de-Reuil</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
