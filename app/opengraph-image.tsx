import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Dario Hernandez — Desarrollador Front-End'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0b14',
          padding: '60px',
          position: 'relative',
        }}
      >
        {/* Zaun gradient blobs */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 20% 50%, rgba(180, 50, 180, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, rgba(50, 180, 200, 0.10) 0%, transparent 60%)',
        }} />

        {/* Logo */}
        <div style={{
          fontSize: 72,
          fontWeight: 700,
          color: '#cc44cc',
          marginBottom: 24,
          fontFamily: 'monospace',
        }}>
          {'<Dariohg/>'}
        </div>

        {/* Separator */}
        <div style={{
          width: 300,
          height: 2,
          background: 'linear-gradient(90deg, #cc44cc, #44cccc, #cc44cc)',
          marginBottom: 24,
        }} />

        {/* Title */}
        <div style={{
          fontSize: 36,
          fontWeight: 600,
          color: '#eaeaf0',
          marginBottom: 16,
          textAlign: 'center',
        }}>
          Desarrollador Front-End
        </div>

        {/* Stack */}
        <div style={{
          fontSize: 20,
          color: '#44cccc',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
        }}>
          React · Next.js · TypeScript · Framer Motion
        </div>

        {/* URL */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          right: 60,
          fontSize: 16,
          color: 'rgba(180, 50, 180, 0.6)',
          fontFamily: 'monospace',
        }}>
          dariohg.site
        </div>
      </div>
    ),
    { ...size }
  )
}
