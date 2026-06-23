import { motion } from 'framer-motion';

interface HeroSectionProps {
  onRSVP: () => void;
}

// Glass navbar styles (liquid-glass refraction effect)
const NAV_GLASS: React.CSSProperties = {
  position: 'sticky',
  top: 0,
  zIndex: 40,
  background: 'rgba(37, 37, 30, 0.70)',
  backdropFilter: 'blur(22px) saturate(160%)',
  WebkitBackdropFilter: 'blur(22px) saturate(160%)',
  borderBottom: '1px solid rgba(201, 162, 39, 0.22)',
  boxShadow: '0 1px 24px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.04)',
};

export default function HeroSection({ onRSVP }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: '100dvh', background: '#25251E' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(201,162,39,0.06) 0%, transparent 70%)' }}
      />

      {/* ── Glass navbar ── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        style={NAV_GLASS}
        className="flex items-center justify-between px-5 py-3"
      >
        {/* Brand mark */}
        <span style={{ color: '#C9A227', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em' }}>
          D · 4.0
        </span>

        {/* Nav links */}
        <div className="flex gap-5">
          {['Detalles', 'Invitados', 'Playlist'].map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: '#D6C8B1',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                opacity: 0.75,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.75')}
            >
              {link}
            </a>
          ))}
        </div>

        {/* RSVP pill */}
        <button
          onClick={onRSVP}
          style={{
            background: 'rgba(201,162,39,0.15)',
            border: '1px solid rgba(201,162,39,0.45)',
            borderRadius: 999,
            color: '#C9A227',
            fontSize: '0.6rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '0.35rem 0.85rem',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,162,39,0.25)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = 'rgba(201,162,39,0.15)')}
        >
          RSVP
        </button>
      </motion.nav>

      {/* ── Hero content ── */}
      <div className="flex-1 flex flex-col items-center justify-between px-5 pb-8 pt-4 relative z-10">

        {/* DANI + MI CUMPLE — centered */}
        <div className="text-center w-full">
          <div className="overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              className="ivory-heading"
              style={{
                fontSize: 'clamp(4.8rem, 28vw, 9.5rem)',
                fontWeight: 900,
                lineHeight: 0.88,
                letterSpacing: '-0.03em',
              }}
            >
              DANI
            </motion.h1>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              color: '#A7A296',
              fontSize: '0.62rem',
              letterSpacing: '0.42em',
              textTransform: 'uppercase',
              marginTop: '0.3rem',
            }}
          >
            MI CUMPLE
          </motion.p>
        </div>

        {/* ── Photo + 4.0 ── */}
        <div className="flex flex-col items-center gap-4 my-2">

          {/* Photo of Dani */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="float-anim"
            style={{
              width: 'clamp(155px, 44vw, 205px)',
              height: 'clamp(195px, 55vw, 260px)',
              borderRadius: '50% 50% 50% 50% / 44% 44% 56% 56%',
              border: '2px solid rgba(201,162,39,0.38)',
              overflow: 'hidden',
              boxShadow: '0 12px 48px rgba(201,162,39,0.12), 0 4px 16px rgba(0,0,0,0.3)',
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
                objectPosition: 'center 15%',
                display: 'block',
              }}
            />
          </motion.div>

          {/* 4.0 — below photo, not behind it */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="gold-shimmer"
            style={{
              fontSize: 'clamp(3.8rem, 22vw, 7.5rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.04em',
            }}
          >
            4.0
          </motion.div>
        </div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="flex justify-between items-end w-full"
        >
          <div className="flex flex-col gap-1">
            <p style={{ color: 'rgba(167,162,150,0.6)', fontSize: '0.58rem', letterSpacing: '0.28em', textTransform: 'uppercase' }}>
              Versión 4.0
            </p>
            <p style={{ color: '#D6C8B1', fontSize: '0.8rem', letterSpacing: '0.06em', lineHeight: 1.35 }}>
              La más épica<br />de todas
            </p>
          </div>
          <motion.button
            className="btn-primary"
            onClick={onRSVP}
            style={{ fontSize: '0.72rem', padding: '0.72rem 1.5rem', flexShrink: 0 }}
            whileTap={{ scale: 0.96 }}
          >
            Confirmar
          </motion.button>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2"
        style={{ color: 'rgba(201,162,39,0.45)' }}
      >
        <div style={{
          width: 1.5, height: 28,
          background: 'linear-gradient(to bottom, rgba(201,162,39,0.55), transparent)',
          borderRadius: 1,
          animation: 'float 2.2s ease-in-out infinite',
          margin: '0 auto',
        }} />
      </motion.div>
    </section>
  );
}
