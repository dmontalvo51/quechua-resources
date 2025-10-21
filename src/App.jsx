import React, { useState } from 'react'
import QRForUrl from './components/QRForUrl.jsx'
import { translatedLink, youtubeWithQuechua, hostLabel } from './utils.js'
import content from './content.json'

function ItemRow({ it, s3BaseUrl }) {
  if (it.type === 'web') {
    const shouldTranslate = it.translate !== false
    const targetUrl = shouldTranslate ? translatedLink(it.url, 'qu') : it.url
    const linkLabel = shouldTranslate ? 'Abrir traducido (Quechua)' : 'Abrir sitio original'
    const metaHint = shouldTranslate ? hostLabel(it.url) : hostLabel(it.url) + ' - sin traducción automática'
    return (
      <div className="item">
        <h4>{it.title}</h4>
        <a className="btn" href={targetUrl} target="_blank" rel="noopener noreferrer">{linkLabel}</a>
        <div className="meta">{metaHint}</div>
        <div className="item-actions">
          <button className="iconbtn" onClick={() => navigator.clipboard?.writeText(targetUrl)}>Copiar enlace</button>
        </div>
      </div>
    )
  }
  if (it.type === 'youtube') {
    const yLink = youtubeWithQuechua(it.url)
    return (
      <div className="item">
        <h4>{it.title}</h4>
        <a className="btn" href={yLink} target="_blank" rel="noopener noreferrer">Ver en YouTube (CC Quechua)</a>
        <div className="meta">YouTube</div>
        <div className="item-actions">
          <button className="iconbtn" onClick={() => navigator.clipboard?.writeText(yLink)}>Copiar enlace</button>
        </div>
      </div>
    )
  }
  if (it.type === 'pdf') {
    const pdfUrl = `${s3BaseUrl}/${it.key}`
    return (
      <div className="item">
        <h4>{it.title}</h4>
        <a className="btn" href={pdfUrl} target="_blank" rel="noopener noreferrer">Abrir PDF (S3)</a>
        <div className="meta">S3: {it.key}</div>
        <div className="item-actions">
          <button className="iconbtn" onClick={() => navigator.clipboard?.writeText(pdfUrl)}>Copiar enlace</button>
        </div>
      </div>
    )
  }
  return <div className="warning">Tipo de recurso no soportado.</div>
}

function SubjectCard({ subject, s3BaseUrl }) {
  return (
    <div className="card">
      <div className="kicker">{subject.highlight}</div>
      <h2>{subject.title}</h2>
      <div className="grid">
        {subject.items.map((it, idx) => <ItemRow key={idx} it={it} s3BaseUrl={s3BaseUrl} />)}
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState(content.subjects?.[0]?.id ?? null)
  const current = content.subjects.find(s => s.id === active)
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      <header>
        <div className="wrap">
          <div className="header-content">
            <div className="brand">
              <div className="logo" aria-hidden="true"></div>
              <div>
                <h1>Recursos Sociales <span className="lang">Quechua</span></h1>
                <div className="sub">Comparte este enlace con el código QR. Cada pestaña incluye enlaces traducidos al quechua y videos de YouTube.</div>
              </div>
            </div>
            <div className="header-qr">
              <QRForUrl url={pageUrl} label="Escanea para abrir este sitio." />
            </div>
          </div>
        </div>
      </header>

      <main className="wrap">
        <div className="tabs">
          {content.subjects.map(s =>
            <button
              key={s.id}
              className={'tabbtn ' + (active === s.id ? 'active' : '')}
              onClick={() => setActive(s.id)}
            >{s.title}</button>
          )}
        </div>

        {current ? <SubjectCard subject={current} s3BaseUrl={content.s3BaseUrl} /> : <div>Seleccione una pestaña</div>}

        <div className="footer">
          <div>Consejo: si ves la interfaz en otro idioma en YouTube o Google, agrega <code>?hl=qu</code> a la URL.</div>
          <div className="credit">© Developer by Diego Montalvo</div>
        </div>
      </main>
    </>
  )
}
