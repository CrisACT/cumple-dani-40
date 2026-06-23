import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Sparkles, Heart, Glasses } from 'lucide-react';
import FadeIn from './FadeIn';
import { PARTY } from '../config';

const DETAILS = [
  {
    icon: Calendar,
    label: 'Fecha',
    value: PARTY.fecha,
    sub: 'Viernes',
  },
  {
    icon: Clock,
    label: 'Hora',
    value: PARTY.hora,
    sub: 'En punto',
  },
  {
    icon: MapPin,
    label: 'Lugar',
    value: PARTY.lugar,
    sub: PARTY.ciudad,
  },
  {
    icon: Glasses,
    label: 'Temática',
    value: PARTY.tematica,
    sub: 'Ven con los lentes más divertidos',
  },
  {
    icon: Sparkles,
    label: 'Dress Code',
    value: 'Elegante Casual',
    sub: 'Tonos tierra y dorados',
  },
];

export default function DetailsSection() {
  return (
    <section
      id="detalles"
      style={{
        background: '#F1F0EF',
        borderRadius: '40px 40px 0 0',
        padding: 'clamp(3rem, 10vw, 5rem) 1.5rem clamp(4rem, 12vw, 6rem)',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: 48,
          height: 4,
          background: 'linear-gradient(90deg, #A89169, #C9A227)',
          borderRadius: '0 0 4px 4px',
          marginTop: -1,
        }}
      />

      <div className="max-w-sm mx-auto flex flex-col gap-10">

        {/* Heading */}
        <FadeIn>
          <div className="flex flex-col gap-1 text-center">
            <p style={{ color: '#A7A296', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Todo lo que necesitas saber
            </p>
            <h2
              className="hero-heading"
              style={{ fontSize: 'clamp(2.2rem, 12vw, 4rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.02em' }}
            >
              Detalles<br />del Evento
            </h2>
          </div>
        </FadeIn>

        {/* Detail cards */}
        <div className="flex flex-col gap-3">
          {DETAILS.map(({ icon: Icon, label, value, sub }, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <div
                style={{
                  background: 'white',
                  borderRadius: 18,
                  padding: '1.1rem 1.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid rgba(168,145,105,0.12)',
                  boxShadow: '0 2px 12px rgba(37,37,30,0.05)',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(168,145,105,0.15), rgba(201,162,39,0.1))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(201,162,39,0.15)',
                  }}
                >
                  <Icon size={18} style={{ color: '#A89169' }} />
                </div>
                <div className="flex flex-col gap-0">
                  <span style={{ color: '#A7A296', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                    {label}
                  </span>
                  <span style={{ color: '#25251E', fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.2 }}>
                    {value}
                  </span>
                  <span style={{ color: '#927452', fontSize: '0.72rem' }}>
                    {sub}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Message card */}
        <FadeIn delay={0.35}>
          <div
            style={{
              borderRadius: 20,
              padding: '1.4rem',
              background: 'linear-gradient(135deg, rgba(168,145,105,0.08), rgba(201,162,39,0.06))',
              border: '1px solid rgba(201,162,39,0.2)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Heart size={20} style={{ color: '#C9A227' }} />
            <p style={{ color: '#25251E', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.55 }}>
              "Los 40 no se cumplen, se celebran a lo grande.<br />
              Ven a festejar esta noche especial con Dani."
            </p>
            <div className="gold-line w-16" />
            <p style={{ color: '#927452', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Con cariño ✦
            </p>
          </div>
        </FadeIn>

        {/* Map link */}
        <FadeIn delay={0.4}>
          <motion.a
            href={`https://maps.google.com/?q=${encodeURIComponent(PARTY.lugar + ', ' + PARTY.ciudad)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full text-center"
            style={{ display: 'flex', justifyContent: 'center' }}
            whileTap={{ scale: 0.97 }}
          >
            <MapPin size={15} />
            Ver en Google Maps
          </motion.a>
        </FadeIn>

      </div>
    </section>
  );
}
