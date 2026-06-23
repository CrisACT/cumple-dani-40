import { motion } from 'framer-motion';

interface HeroSectionProps {
  onRSVP: () => void;
}

export default function HeroSection({ onRSVP }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: '100dvh', background: '#1E1E17' }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 45%, rgba(201,162,39,0.055) 0%, transparent 70%)',
        }}
      />

      {/* ── Glass navbar ─────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          /* Respect iPhone notch / Dynamic Island */
          paddingTop: 'max(14px, env(safe-area-inset-top))',
          paddingBottom: 14,
          paddingLeft: 20,
          paddingRight: 20,
          background: 'rgba(30, 30, 23, 0.72)',
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          borderBottom: '1px solid rgba(201,162,39,0.18)',
          /* Liquid-glass inner refraction */
          boxShadow:
            '0 1px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.045)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
        }}
      >
        {/* Brand mark */}
        <span
          style={{
            color: '#C9A227',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.14em',
            flexShrink: 0,
          }}
        >
          D · 4.0
        </span>

        {/* Centre links */}
        <div
          style={{
            display: 'flex',
            gap: '1.2rem',
            alignItems: 'center',
            flexShrink: 1,
            overflow: 'hidden',
          }}
        >
          {['Detalles', 'Invitados', 'Playlist'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: '#D6C8B1',
                fontSize: '0.68rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                opacity: 0.78,
                transition: 'opacity 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.78')}
            >
              {link}
            </a>
          ))}
        </div>

        {/* RSVP pill */}
        <button
          onClick={onRSVP}
          style={{
            background: 'rgba(201,162,39,0.13)',
            border: '1px solid rgba(201,162,39,0.42)',
            borderRadius: 999,
            color: '#C9A227',
            fontSize: '0.64rem',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            padding: '0.38rem 0.9rem',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'background 0.2s',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              'rgba(201,162,39,0.24)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background =
              'rgba(201,162,39,0.13)')
          }
        >
          RSVP
        </button>
      </motion.nav>

      {/* ── Hero body ─────────────────────────────────────────────── */}
      <div
        className="relative z-10 flex flex-col"
        style={{ flex: 1, padding: '1.2rem 1.4rem 1.4rem' }}
      >
        {/* DANI — centered */}
        <div className="overflow-hidden text-center">
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
            className="ivory-heading"
            style={{
              fontSize: 'clamp(4.4rem, 26vw, 8.5rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
            }}
          >
            DANI
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.28 }}
          style={{
            color: '#A7A296',
            fontSize: '0.62rem',
            letterSpacing: '0.44em',
            textTransform: 'uppercase',
            textAlign: 'center',
            marginTop: '0.35rem',
          }}
        >
          MI CUMPLE
        </motion.p>

        {/* Photo + 4.0 — centred, fills remaining space */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            marginTop: '0.8rem',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.78, ease: [0.25, 0.1, 0.25, 1] }}
            className="float-anim"
            style={{
              width: 'clamp(148px, 42vw, 196px)',
              height: 'clamp(185px, 53vw, 248px)',
              borderRadius: '50% 50% 50% 50% / 44% 44% 56% 56%',
              border: '2px solid rgba(201,162,39,0.35)',
              overflow: 'hidden',
              boxShadow:
                '0 16px 48px rgba(0,0,0,0.35), 0 4px 12px rgba(201,162,39,0.1)',
              flexShrink: 0,
            }}
          >
            <img
              src="/04.png"
              alt="Daniela"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 12%',
                display: 'block',
              }}
            />
          </motion.div>

          {/* 4.0 — below photo, always visible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="gold-shimmer"
            style={{
              fontSize: 'clamp(3.4rem, 20vw, 6.5rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            4.0
          </motion.div>
        </div>

        {/* ── Glass bottom card ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{
            marginTop: '1rem',
            borderRadius: 22,
            padding: '1.1rem 1.4rem 1.2rem',
            background: 'rgba(30,30,23,0.52)',
            backdropFilter: 'blur(18px) saturate(160%)',
            WebkitBackdropFilter: 'blur(18px) saturate(160%)',
            border: '1px solid rgba(201,162,39,0.2)',
            boxShadow:
              '0 8px 28px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.04)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.85rem',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                color: '#A7A296',
                fontSize: '0.58rem',
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                marginBottom: '0.2rem',
              }}
            >
              Versión 4.0
            </p>
            <p
              style={{
                color: '#D6C8B1',
                fontSize: '0.88rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
                lineHeight: 1.3,
              }}
            >
              La más épica de todas
            </p>
          </div>

          <div className="gold-line" style={{ width: '100%' }} />

          <motion.button
            className="btn-primary"
            onClick={onRSVP}
            style={{ fontSize: '0.78rem', padding: '0.78rem 2rem', width: '100%' }}
            whileTap={{ scale: 0.96 }}
          >
            Confirmar asistencia
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
