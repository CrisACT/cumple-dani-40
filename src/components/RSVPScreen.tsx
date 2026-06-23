import { motion } from 'framer-motion';
import { Check, X, Calendar, MapPin, Clock } from 'lucide-react';
import { PARTY } from '../config';

interface RSVPScreenProps {
  onAccept: () => void;
  onDecline: () => void;
}

export default function RSVPScreen({ onAccept, onDecline }: RSVPScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 overflow-hidden relative"
      style={{ background: '#25251E' }}
    >
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 30%, rgba(201,162,39,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Top & bottom gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="absolute bottom-0 left-0 right-0 h-px gold-line" />

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-8 h-8" style={{ borderTop: '2px solid rgba(201,162,39,0.4)', borderLeft: '2px solid rgba(201,162,39,0.4)' }} />
      <div className="absolute top-6 right-6 w-8 h-8" style={{ borderTop: '2px solid rgba(201,162,39,0.4)', borderRight: '2px solid rgba(201,162,39,0.4)' }} />
      <div className="absolute bottom-6 left-6 w-8 h-8" style={{ borderBottom: '2px solid rgba(201,162,39,0.4)', borderLeft: '2px solid rgba(201,162,39,0.4)' }} />
      <div className="absolute bottom-6 right-6 w-8 h-8" style={{ borderBottom: '2px solid rgba(201,162,39,0.4)', borderRight: '2px solid rgba(201,162,39,0.4)' }} />

      <div className="w-full max-w-sm flex flex-col items-center gap-8 relative z-10">

        {/* Label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ color: '#A7A296', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}
        >
          Invitación Personal
        </motion.p>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center"
        >
          <div className="ivory-heading" style={{ fontSize: 'clamp(3.5rem, 20vw, 6rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em' }}>
            DANI
          </div>
          <div className="gold-shimmer" style={{ fontSize: 'clamp(4rem, 24vw, 8rem)', fontWeight: 900, lineHeight: 0.85, letterSpacing: '-0.03em' }}>
            40
          </div>
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="gold-line w-full"
        />

        {/* Event details preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col gap-2.5 w-full"
        >
          {[
            { Icon: Calendar, text: PARTY.fecha },
            { Icon: Clock, text: PARTY.hora },
            { Icon: MapPin, text: `${PARTY.lugar}, ${PARTY.ciudad}` },
          ].map(({ Icon, text }) => (
            <div key={text} className="flex items-center gap-3" style={{ color: '#D6C8B1' }}>
              <Icon size={14} style={{ color: '#C9A227', flexShrink: 0 }} />
              <span style={{ fontSize: '0.8rem', letterSpacing: '0.05em' }}>{text}</span>
            </div>
          ))}
        </motion.div>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="gold-line w-full"
        />

        {/* RSVP question */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75 }}
          className="text-center"
        >
          <p style={{ color: '#A7A296', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
            ¿Confirmas tu asistencia?
          </p>
          <p style={{ color: 'rgba(241,240,239,0.4)', fontSize: '0.72rem' }}>
            Tu respuesta nos ayuda a organizarlo todo ✨
          </p>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
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
        </motion.div>

      </div>
    </motion.div>
  );
}
