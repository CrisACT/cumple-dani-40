import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Heart, Glasses } from 'lucide-react';
import FadeIn from './FadeIn';
import { PARTY } from '../config';

const DETAILS = [
  { icon: Calendar, label: 'Fecha',    value: PARTY.fecha,     sub: 'Viernes' },
  { icon: Clock,    label: 'Hora',     value: PARTY.hora,      sub: 'En punto' },
  { icon: MapPin,   label: 'Lugar',    value: PARTY.lugar,     sub: PARTY.ciudad },
  { icon: Glasses,  label: 'Temática', value: PARTY.tematica,  sub: 'Ven con los lentes más divertidos' },
];

// Icon background palette per index
const ICON_GRADIENTS = [
  'linear-gradient(135deg, rgba(201,162,39,0.18), rgba(168,145,105,0.1))',
  'linear-gradient(135deg, rgba(168,145,105,0.18), rgba(146,116,82,0.1))',
  'linear-gradient(135deg, rgba(146,116,82,0.18), rgba(201,162,39,0.1))',
  'linear-gradient(135deg, rgba(201,162,39,0.22), rgba(214,200,177,0.12))',
];

export default function DetailsSection() {
  return (
    <section
      id="detalles"
      style={{
        background: '#EDE9E1',
        borderRadius: '36px 36px 0 0',
        padding: 'clamp(3rem, 10vw, 5rem) 1.4rem clamp(4rem, 12vw, 6rem)',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Top handle */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: 44,
          height: 4,
          background: 'linear-gradient(90deg, #A89169, #C9A227)',
          borderRadius: '0 0 4px 4px',
          marginTop: -1,
        }}
      />

      <div className="max-w-sm mx-auto flex flex-col gap-9">

        {/* Heading */}
        <FadeIn>
          <div className="flex flex-col gap-1">
            <p style={{ color: '#A7A296', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
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
        <div className="flex flex-col gap-2.5">
          {DETAILS.map(({ icon: Icon, label, value, sub }, i) => (
            <FadeIn key={label} delay={i * 0.07}>
              <div
                style={{
                  background: 'rgba(255,255,255,0.75)',
                  borderRadius: 20,
                  padding: '1rem 1.2rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  border: '1px solid rgba(168,145,105,0.14)',
                  boxShadow:
                    '0 2px 12px rgba(37,37,30,0.07), 0 1px 3px rgba(168,145,105,0.08)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                }}
              >
                {/* Icon square */}
                <div
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: ICON_GRADIENTS[i] ?? ICON_GRADIENTS[0],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(201,162,39,0.16)',
                  }}
                >
                  <Icon size={19} style={{ color: '#A89169' }} />
                </div>

                {/* Text */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minWidth: 0 }}>
                  <span
                    style={{
                      color: '#A7A296',
                      fontSize: '0.55rem',
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      color: '#1E1E17',
                      fontSize: '0.94rem',
                      fontWeight: 600,
                      lineHeight: 1.2,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {value}
                  </span>
                  <span style={{ color: '#927452', fontSize: '0.7rem', lineHeight: 1.3 }}>
                    {sub}
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Quote card */}
        <FadeIn delay={0.38}>
          <div
            style={{
              borderRadius: 22,
              padding: '1.4rem 1.5rem',
              background:
                'linear-gradient(135deg, rgba(168,145,105,0.1), rgba(201,162,39,0.07))',
              border: '1px solid rgba(201,162,39,0.22)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.85rem',
            }}
          >
            <Heart size={18} style={{ color: '#C9A227' }} />
            <p style={{ color: '#25251E', fontSize: '0.86rem', fontStyle: 'italic', lineHeight: 1.6, maxWidth: '28ch', margin: '0 auto' }}>
              "Los 40 no se cumplen, se celebran a lo grande.
              Ven a festejar esta noche con Dani."
            </p>
            <div className="gold-line w-14" />
            <p style={{ color: '#927452', fontSize: '0.65rem', letterSpacing: '0.18em', textTransform: 'uppercase' }}>
              Con cariño
            </p>
          </div>
        </FadeIn>

        {/* Map button */}
        <FadeIn delay={0.44}>
          <motion.a
            href={`https://maps.google.com/?q=${encodeURIComponent(PARTY.lugar + ', ' + PARTY.ciudad)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary w-full text-center"
            style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}
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
