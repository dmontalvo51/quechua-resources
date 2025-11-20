import React, { useEffect, useRef } from 'react'
import QRCode from 'qrcode'

export default function QRForUrl({ url }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    if (!canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, url, { margin: 1, width: 195 }).catch(console.error)
  }, [url])
  return (
    <div className="qr-box">
      <canvas ref={canvasRef} />
    </div>
  )
}
