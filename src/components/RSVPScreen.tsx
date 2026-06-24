import { motion } from 'framer-motion';
import { Check, X, Calendar, MapPin, Clock, Glasses } from 'lucide-react';
import { PARTY } from '../config';

interface RSVPScreenProps {
  onAccept: () => void;
  onDecline: () => void;
  onSkip: () => void;
}

export default function RSVPScreen({ onAccept, onDecline, onSkip }: RSVPScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-[100dvh] flex flex-col items-center justify-center px-6 py-12 overflow-hidden relative"
      style={{ background: '#25251E' }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.08) 0%, transparent 60%)' }}
      />

      {/* Corner marks */}
      <div className="absolute top-6 left-6 w-8 h-8" style={{ borderTop: '1.5px solid rgba(201,162,39,0.35)', borderLeft: '1.5px solid rgba(201,162,39,0.35)' }} />
      <div className="absolute top-6 right-6 w-8 h-8" style={{ borderTop: '1.5px solid rgba(201,162,39,0.35)', borderRight: '1.5px solid rgba(201,162,39,0.35)' }} />
      <div className="absolute bottom-6 left-6 w-8 h-8" style={{ borderBottom: '1.5px solid rgba(201,162,39,0.35)', borderLeft: '1.5px solid rgba(201,162,39,0.35)' }} />
      <div className="absolute bottom-6 right-6 w-8 h-8" style={{ borderBottom: '1.5px solid rgba(201,162,39,0.35)', borderRight: '1.5px solid rgba(201,162,39,0.35)' }} />

      <div className="w-full max-w-sm flex flex-col items-center gap-7 relative z-10">

        {/* Header label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            color: '#A7A296',
            fontSize: '0.6rem',
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
          }}
        >
          TE INVITO A MI CUMPLE
        </motion.p>

        {/* DANI + 4.0 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center"
          style={{ lineHeight: 0.9 }}
        >
          <div
            className="ivory-heading"
            style={{ fontSize: 'clamp(3.5rem, 20vw, 6rem)', fontWeight: 900, letterSpacing: '-0.02em' }}
          >
            DANI
          </div>
          <div
            className="gold-shimmer"
            style={{ fontSize: 'clamp(4rem, 24vw, 8rem)', fontWeight: 900, letterSpacing: '-0.03em' }}
          >
            4.0
          </div>
        </motion.div>

        {/* Temática badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1rem',
            borderRadius: 999,
            border: '1px solid rgba(201,162,39,0.4)',
            background: 'rgba(201,162,39,0.06)',
          }}
        >
          <Glasses size={14} style={{ color: '#C9A227' }} />
          <span style={{ color: '#D6C8B1', fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600 }}>
            {PARTY.tematica}
          </span>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="gold-line w-full"
        />

        {/* Event details */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="flex flex-col gap-2.5 w-full"
        >
          {[
            { Icon: Calendar, text: PARTY.fecha },
            { Icon: Clock, text: PARTY.hora },
            { Icon: MapPin, text: `${PARTY.lugar}, ${PARTY.ciudad}` },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-3">
              <Icon size={14} style={{ color: '#C9A227', flexShrink: 0 }} />
              <span style={{ color: '#D6C8B1', fontSize: '0.8rem', letterSpacing: '0.04em' }}>{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="gold-line w-full"
        />

        {/* Question */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.72 }}
          className="text-center flex flex-col gap-1"
        >
          <p style={{ color: '#A7A296', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase' }}>
            ¿Confirmas tu asistencia?
          </p>
          <p style={{ color: 'rgba(241,240,239,0.35)', fontSize: '0.72rem' }}>
            Tu respuesta nos ayuda a organizarlo todo
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.82 }}
          className="flex flex-col gap-3 w-full"
        >
          <button className="btn-primary w-full" onClick={onAccept}>
            <Check size={16} />
            ¡Sí, asistiré!
          </button>
          <button className="btn-ghost w-full" onClick={onDecline} style={{ fontSize: '0.8rem' }}>
            <X size={14} />
            No podré asistir
          </button>
          <button
            onClick={onSkip}
            style={{
              background: 'rgba(167,162,150,0.07)',
              border: '1px solid rgba(167,162,150,0.3)',
              borderRadius: 9999,
              cursor: 'pointer',
              color: '#D6C8B1',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textAlign: 'center',
              padding: '0.75rem 1.5rem',
              width: '100%',
              fontFamily: 'Kanit, sans-serif',
              transition: 'background 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(167,162,150,0.14)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(167,162,150,0.55)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(167,162,150,0.07)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(167,162,150,0.3)';
            }}
          >
            Ya confirmé — ver la invitación →
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
}
