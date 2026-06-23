import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PARTY } from '../config';

function getTimeLeft() {
  const target = new Date(PARTY.isoDate).getTime();
  const now = Date.now();
  const diff = target - now;
  if (diff <= 0) return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((diff % (1000 * 60)) / 1000);
  return { dias, horas, minutos, segundos };
}

function Digit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        style={{
          background: '#25251E',
          border: '1px solid rgba(201,162,39,0.25)',
          borderRadius: 14,
          padding: 'clamp(0.6rem, 3vw, 1rem) clamp(0.7rem, 4vw, 1.4rem)',
          minWidth: 'clamp(60px, 18vw, 88px)',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(201,162,39,0.06) 0%, transparent 100%)',
            pointerEvents: 'none',
          }}
        />
        <span
          className="hero-heading"
          style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)', fontWeight: 900, lineHeight: 1, display: 'block' }}
        >
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span style={{ color: '#A7A296', fontSize: '0.58rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
        {label}
      </span>
    </div>
  );
}

export default function CountdownSection() {
  const [time, setTime] = useState(getTimeLeft());
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
            {partyStarted ? '¡Feliz Cumpleaños Dani! 🎉' : 'Para la Fiesta'}
          </h2>
        </motion.div>

        {!partyStarted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex gap-3 justify-center"
          >
            <Digit value={time.dias} label="Días" />
            <div style={{ color: '#C9A227', fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', fontWeight: 300, alignSelf: 'flex-start', paddingTop: '0.7rem' }}>:</div>
            <Digit value={time.horas} label="Horas" />
            <div style={{ color: '#C9A227', fontSize: 'clamp(1.5rem, 6vw, 2.5rem)', fontWeight: 300, alignSelf: 'flex-start', paddingTop: '0.7rem' }}>:</div>
            <Digit value={time.minutos} label="Min" />
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
