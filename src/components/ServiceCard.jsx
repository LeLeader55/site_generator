import React from 'react'

export default function ServiceCard({ title, text, delay, price }) {
  return (
    <article className="card service-card">
      <div className="service-top">
        <div>
          <h3>{title}</h3>
          {delay && <p className="muted">{delay}</p>}
        </div>
        {price && <span className="pill">{price}</span>}
      </div>
      <p>{text}</p>
      <a className="text-link" href="#contact">Réserver cette intervention</a>
    </article>
  )
}
