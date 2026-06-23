import { motion } from 'framer-motion';
import { PARTY } from '../config';

interface HeroSectionProps {
  onRSVP: () => void;
}

export default function HeroSection({ onRSVP }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative flex flex-col overflow-hidden"
      style={{ minHeight: '100svh', background: '#25251E' }}
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,39,0.07) 0%, transparent 70%)' }}
      />

      {/* Horizontal gold lines decoration */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.6), transparent)' }} />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-between items-center px-6 pt-6 pb-2 relative z-20"
      >
        {['Detalles', 'Invitados', 'Playlist', 'RSVP'].map(link => (
          <a
            key={link}
            href={link === 'RSVP' ? undefined : `#${link.toLowerCase()}`}
            onClick={link === 'RSVP' ? onRSVP : undefined}
            style={{
              color: '#D6C8B1',
              fontSize: '0.65rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              opacity: 0.85,
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.85')}
          >
            {link}
          </a>
        ))}
      </motion.nav>

      {/* Hero content */}
      <div className="flex-1 flex flex-col justify-between px-5 pb-8 relative z-10">

        {/* Main heading */}
        <div className="overflow-hidden mt-2">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="ivory-heading"
            style={{
              fontSize: 'clamp(5rem, 28vw, 10rem)',
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              whiteSpace: 'nowrap',
              width: '100%',
            }}
          >
            DANI
          </motion.h1>
        </div>

        {/* Center: portrait + "cumple 40" */}
        <div className="flex flex-col items-center gap-2 my-2 relative">

          {/* "cumple" label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              color: '#A7A296',
              fontSize: '0.7rem',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              alignSelf: 'flex-start',
              paddingLeft: '0.5rem',
            }}
          >
            cumple
          </motion.p>

          {/* Photo + 40 */}
          <div className="relative flex items-center justify-center w-full">
            {/* Portrait placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="float-anim relative z-10"
              style={{
                width: 'clamp(160px, 42vw, 220px)',
                height: 'clamp(200px, 52vw, 280px)',
                borderRadius: '50% 50% 50% 50% / 45% 45% 55% 55%',
                border: '2px solid rgba(201,162,39,0.35)',
                background: 'linear-gradient(180deg, rgba(201,162,39,0.06) 0%, rgba(146,116,82,0.1) 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 0 60px rgba(201,162,39,0.1)',
                overflow: 'hidden',
              }}
            >
              {/* Replace this div content with <img src="/dani.jpg" ... /> */}
              <span style={{ fontSize: '3rem' }}>📸</span>
              <span style={{ color: 'rgba(214,200,177,0.4)', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'center', padding: '0 1rem' }}>
                Foto de Daniela
              </span>
            </motion.div>

            {/* "40" large behind portrait */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute gold-shimmer pointer-events-none"
              style={{
                fontSize: 'clamp(7rem, 40vw, 14rem)',
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                zIndex: 0,
                userSelect: 'none',
              }}
            >
              40
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-between items-end"
        >
          <div className="flex flex-col gap-1">
            <p style={{ color: '#A7A296', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              Una noche
            </p>
            <p style={{ color: '#D6C8B1', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', lineHeight: 1.3 }}>
              para celebrar<br />con todo ✨
            </p>
          </div>
          <button className="btn-primary" onClick={onRSVP} style={{ fontSize: '0.72rem', padding: '0.7rem 1.4rem' }}>
            Confirmar
          </button>
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: 'rgba(201,162,39,0.5)' }}
      >
        <div style={{
          width: 1.5,
          height: 28,
          background: 'linear-gradient(to bottom, rgba(201,162,39,0.6), transparent)',
          borderRadius: 1,
          animation: 'float 2s ease-in-out infinite',
        }} />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.3), transparent)' }} />
    </section>
  );
}
