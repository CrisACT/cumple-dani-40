import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PARTY } from '../config';

function getTimeLeft() {
  const target = new Date(PARTY.isoDate).getTime();
  const diff = target - Date.now();
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  return {
    dias: Math.floor(diff / 86_400_000),
    horas: Math.floor((diff % 86_400_000) / 3_600_000),
    minutos: Math.floor((diff % 3_600_000) / 60_000),
    segundos: Math.floor((diff % 60_000) / 1000),
  };
}

// Animated digit: flips when value changes
function Digit({ value, label }: { value: number; label: string }) {
  const str = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        style={{
          background: '#25251E',
          border: '1px solid rgba(201,162,39,0.25)',
          borderRadius: 14,
          padding: 'clamp(0.5rem, 2.5vw, 0.9rem) clamp(0.6rem, 3.5vw, 1.2rem)',
          minWidth: 'clamp(58px, 17vw, 84px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(201,162,39,0.06) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        {/* key=str triggers AnimatePresence flip on every change */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={str}
            initial={{ y: -18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 18, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="hero-heading"
            style={{
              fontSize: 'clamp(1.9rem, 9.5vw, 3.2rem)',
              fontWeight: 900,
              lineHeight: 1,
              display: 'block',
            }}
          >
            {str}
          </motion.span>
        </AnimatePresence>
      </div>
      <span style={{ color: '#A7A296', fontSize: '0.56rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
}

// Separator colon
function Sep() {
  return (
    <div style={{
      color: '#C9A227',
      fontSize: 'clamp(1.4rem, 5.5vw, 2.2rem)',
      fontWeight: 300,
      alignSelf: 'flex-start',
      paddingTop: 'clamp(0.5rem, 2vw, 0.8rem)',
      opacity: 0.7,
    }}>
      :
    </div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft);
  const partyStarted = new Date(PARTY.isoDate).getTime() <= Date.now();

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section style={{ background: '#F1F0EF', padding: 'clamp(3rem, 10vw, 5rem) 1.5rem' }}>
      <div className="flex flex-col items-center gap-8 max-w-sm mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center flex flex-col gap-1"
        >
          <p style={{ color: '#A7A296', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            {partyStarted ? '¡Ya es hora de celebrar!' : 'Faltan'}
          </p>
          <h2 className="hero-heading" style={{ fontSize: 'clamp(1.8rem, 9vw, 3rem)', fontWeight: 800, lineHeight: 1 }}>
            {partyStarted ? '¡Feliz Cumpleaños Dani!' : 'Para la Fiesta'}
          </h2>
        </motion.div>

        {!partyStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-2 justify-center"
          >
            <Digit value={time.dias} label="Días" />
            <Sep />
            <Digit value={time.horas} label="Horas" />
            <Sep />
            <Digit value={time.minutos} label="Min" />
            <Sep />
            <Digit value={time.segundos} label="Seg" />
          </motion.div>
        )}

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="gold-line w-32"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          style={{ color: '#927452', fontSize: '0.78rem', letterSpacing: '0.08em', textAlign: 'center' }}
        >
          {PARTY.fecha} · {PARTY.hora}
        </motion.p>

      </div>
    </section>
  );
}
