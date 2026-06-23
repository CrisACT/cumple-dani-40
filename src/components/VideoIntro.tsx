import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VIMEO_VIDEO_ID, PARTY } from '../config';

interface VideoIntroProps {
  onFinish: () => void;
}

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${6 + Math.random() * 8}s`,
  size: Math.random() > 0.5 ? 3 : 5,
}));

export default function VideoIntro({ onFinish }: VideoIntroProps) {
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFinish = () => {
    setVisible(false);
    setTimeout(onFinish, 600);
  };

  useEffect(() => {
    if (!VIMEO_VIDEO_ID) {
      timerRef.current = setTimeout(handleFinish, 4000);
    } else {
      // Auto-skip after 12 seconds if video doesn't end
      timerRef.current = setTimeout(handleFinish, 12000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#25251E' }}
        >
          {/* Particles */}
          {PARTICLES.map(p => (
            <span
              key={p.id}
              className="particle"
              style={{
                left: p.left,
                bottom: '-10px',
                width: p.size,
                height: p.size,
                animationDelay: p.delay,
                animationDuration: p.duration,
              }}
            />
          ))}

          {/* Gold top border */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />

          {VIMEO_VIDEO_ID ? (
            /* ── Vimeo embed ── */
            <div className="relative w-full max-w-sm mx-auto px-4">
              <div className="relative rounded-2xl overflow-hidden" style={{ paddingTop: '177.78%', border: '1px solid rgba(201,162,39,0.3)' }}>
                <iframe
                  src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&muted=1&loop=0&title=0&byline=0&portrait=0&color=C9A227&playsinline=1`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title="Video de invitación"
                />
              </div>
            </div>
          ) : (
            /* ── Placeholder elegante ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center gap-6 px-8 text-center"
            >
              {/* Decorative ring */}
              <div
                className="relative flex items-center justify-center float-anim"
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: '50%',
                  border: '2px solid rgba(201,162,39,0.5)',
                  boxShadow: '0 0 40px rgba(201,162,39,0.15), inset 0 0 40px rgba(201,162,39,0.05)',
                }}
              >
                <div
                  style={{
                    width: 108,
                    height: 108,
                    borderRadius: '50%',
                    border: '1px solid rgba(201,162,39,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3.5rem',
                  }}
                >
                  🥂
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p style={{ color: '#A7A296', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                  Te invito a celebrar
                </p>
                <h1 className="ivory-heading" style={{ fontSize: 'clamp(2.5rem, 14vw, 5rem)', fontWeight: 900, lineHeight: 1 }}>
                  {PARTY.alias}
                </h1>
                <div className="gold-shimmer" style={{ fontSize: 'clamp(3.5rem, 20vw, 7rem)', fontWeight: 900, lineHeight: 0.9 }}>
                  40
                </div>
              </div>

              <div className="gold-line w-24" />

              <p style={{ color: '#D6C8B1', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {PARTY.fecha}
              </p>
            </motion.div>
          )}

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={handleFinish}
            className="btn-ghost absolute bottom-10"
            style={{ fontSize: '0.75rem', padding: '0.6rem 1.5rem' }}
          >
            Continuar →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
