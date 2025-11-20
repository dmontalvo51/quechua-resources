import React, { useState } from 'react'
import QRForUrl from './components/QRForUrl.jsx'
import { translatedLink, youtubeWithQuechua, hostLabel } from './utils.js'
import content from './content.json'

const getLocalizedText = (field, lang) => {
  if (!field) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'object') {
    return field[lang] ?? field.es ?? field.qu ?? ''
  }
  return ''
}

function ItemRow({ it, lang }) {
  if (it.type === 'web') {
    const shouldTranslate = it.translate !== false
    const targetUrl = shouldTranslate ? translatedLink(it.url, 'qu') : it.url
    return (
      <div className="item">
        <h4>{getLocalizedText(it.title, lang)}</h4>
        <h6>(Fuente: {it.source})</h6>
        <a className="btn" href={targetUrl} target="_blank" rel="noopener noreferrer">WEB</a>
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
        <h4>{getLocalizedText(it.title, lang)}</h4>
        <h6>(Fuente: {it.source})</h6>
        <a className="btn" href={yLink} target="_blank" rel="noopener noreferrer">Ver en YouTube (CC Quechua)</a>
        <div className="meta">YouTube</div>
        <div className="item-actions">
          <button className="iconbtn" onClick={() => navigator.clipboard?.writeText(yLink)}>Copiar enlace</button>
        </div>
      </div>
    )
  }
  if (it.type === 'pdf') {
    const translated = it.translated !== false
    const pdfUrl = translated ? `${it.url}` : `${it.url}`
    return (
      <div className="item">
        <h4>{getLocalizedText(it.title, lang)}</h4>
        <h6>(Fuente: {it.source})</h6>
        <a className="btn" href={pdfUrl} target="_blank" rel="noopener noreferrer">PDF</a>
        <div className="item-actions">
          <button className="iconbtn" onClick={() => navigator.clipboard?.writeText(pdfUrl)}>Copiar enlace</button>
        </div>
      </div>
    )
  }
  return <div className="warning">Tipo de recurso no soportado.</div>
}

function SubjectCard({ subject, lang }) {
  return (
    <div className="card">
      <div className="kicker">{getLocalizedText(subject.highlight, lang)}</div>
      <div className="grid">
        {subject.items.map((it, idx) => <ItemRow key={idx} it={it} lang={lang} />)}
      </div>
    </div>
  )
}

export default function App() {
  const [active, setActive] = useState(content.subjects?.[0]?.id ?? null)
  const [lang, setLang] = useState('es')
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
                <h1>{getLocalizedText(content['main-title'], lang)}</h1>
                <div className="lang-switch">
                  <button
                    type="button"
                    className={'langbtn ' + (lang === 'es' ? 'active' : '')}
                    onClick={() => setLang('es')}
                    aria-pressed={lang === 'es'}
                  >Español</button>
                  <button
                    type="button"
                    className={'langbtn ' + (lang === 'qu' ? 'active' : '')}
                    onClick={() => setLang('qu')}
                    aria-pressed={lang === 'qu'}
                  >Quechua (runasimi)</button>
                </div>
              </div>
            </div>
            <div className="header-qr">
              <QRForUrl url={pageUrl} />
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
            >{getLocalizedText(s.title, lang)}</button>
          )}
        </div>

        {current ? <SubjectCard subject={current} s3BaseUrl={content.s3BaseUrl} lang={lang} /> : <div>Seleccione una pestaña</div>}

        <div className="footer">
          <div className="credit">© Developed by Diego Montalvo</div>
        </div>
      </main>
    </>
  )
}
