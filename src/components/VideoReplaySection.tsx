import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import FadeIn from './FadeIn';
import { VIMEO_VIDEO_ID } from '../config';

export default function VideoReplaySection() {
  const [expanded, setExpanded] = useState(false);

  if (!VIMEO_VIDEO_ID) return null;

  return (
    <section style={{ background: '#1E1E17', padding: '1.6rem 1.4rem' }}>
      <div className="max-w-sm mx-auto">
        <FadeIn>
          <AnimatePresence mode="wait">
            {!expanded ? (
              /* ── Compact card ── */
              <motion.button
                key="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                onClick={() => setExpanded(true)}
                style={{
                  width: '100%',
                  background: 'rgba(201,162,39,0.055)',
                  border: '1px solid rgba(201,162,39,0.22)',
                  borderRadius: 22,
                  padding: '1.1rem 1.3rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.1rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  /* Liquid glass */
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    'rgba(201,162,39,0.09)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLButtonElement).style.background =
                    'rgba(201,162,39,0.055)')
                }
              >
                {/* Play circle */}
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #A89169, #C9A227)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 0 0 6px rgba(201,162,39,0.1)',
                  }}
                >
                  <Play size={18} fill="white" color="white" style={{ marginLeft: 2 }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem', minWidth: 0 }}>
                  <p
                    style={{
                      color: '#D6C8B1',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      letterSpacing: '0.03em',
                    }}
                  >
                    Ver el video de nuevo
                  </p>
                  <p style={{ color: '#A7A296', fontSize: '0.72rem', lineHeight: 1.3 }}>
                    El mensaje especial de la fiesta
                  </p>
                </div>
              </motion.button>
            ) : (
              /* ── Expanded player ── */
              <motion.div
                key="player"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.32 }}
                style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
              >
                {/* Close button */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <p
                    style={{
                      color: '#A7A296',
                      fontSize: '0.62rem',
                      letterSpacing: '0.28em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Video de invitación
                  </p>
                  <button
                    onClick={() => setExpanded(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      background: 'rgba(237,233,225,0.07)',
                      border: '1px solid rgba(237,233,225,0.14)',
                      borderRadius: 999,
                      color: '#A7A296',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      padding: '0.3rem 0.75rem',
                      cursor: 'pointer',
                    }}
                  >
                    <X size={12} />
                    Cerrar
                  </button>
                </div>

                {/* Vimeo embed — no autoplay; user taps Vimeo's own play button
                    which guarantees iOS audio permission */}
                <div
                  style={{
                    position: 'relative',
                    paddingTop: '177.78%',
                    borderRadius: 18,
                    overflow: 'hidden',
                    border: '1px solid rgba(201,162,39,0.25)',
                  }}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=0&muted=0&loop=0&title=0&byline=0&portrait=0&color=C9A227&playsinline=1`}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none',
                    }}
                    allow="autoplay; fullscreen; picture-in-picture"
                    title="Video de invitación"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
}
