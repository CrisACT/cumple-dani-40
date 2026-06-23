import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Player from '@vimeo/player';
import { VIMEO_VIDEO_ID, PARTY } from '../config';

interface VideoIntroProps {
  onFinish: () => void;
}

// Deterministic particles (no Math.random on each render)
const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3 + 13) % 100}%`,
  delay: `${((i * 0.7) % 5).toFixed(1)}s`,
  duration: `${(7 + (i * 1.3) % 6).toFixed(1)}s`,
  size: i % 2 === 0 ? 3 : 5,
}));

export default function VideoIntro({ onFinish }: VideoIntroProps) {
  const [visible, setVisible] = useState(true);
  const [playing, setPlaying] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = () => {
    if (fallbackRef.current) clearTimeout(fallbackRef.current);
    setVisible(false);
    setTimeout(onFinish, 600);
  };

  // Initialize Vimeo Player SDK once iframe is mounted
  useEffect(() => {
    if (!VIMEO_VIDEO_ID || !iframeRef.current) return;
    const p = new Player(iframeRef.current);
    playerRef.current = p;
    p.on('ended', finish);
    return () => {
      p.off('ended');
      p.destroy().catch(() => {});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlay = () => {
    setPlaying(true);
    // player.play() inside a click handler — iOS grants audio permission
    if (playerRef.current) {
      playerRef.current.play().catch(() => {});
    }
    // Safety fallback: advance after 35s if 'ended' never fires
    fallbackRef.current = setTimeout(finish, 35000);
  };

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

          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />

          {VIMEO_VIDEO_ID ? (
            <div className="relative w-full max-w-sm mx-auto px-4 flex flex-col items-center gap-6">

              {/* ── Vimeo iframe ─────────────────────────────────
                  Always in the DOM so the Player SDK can initialize.
                  Positioned off-screen when not playing; visible when playing. */}
              <div
                style={{
                  position: playing ? 'relative' : 'absolute',
                  left: playing ? 'auto' : '-9999px',
                  width: playing ? '100%' : '1px',
                  height: playing ? undefined : '1px',
                  paddingTop: playing ? '177.78%' : 0,
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: playing ? '1px solid rgba(201,162,39,0.3)' : 'none',
                  transition: 'opacity 0.4s',
                  opacity: playing ? 1 : 0,
                }}
              >
                <iframe
                  ref={iframeRef}
                  src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=0&muted=0&loop=0&title=0&byline=0&portrait=0&color=C9A227&playsinline=1&autopause=0`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Video de invitación"
                />
              </div>

              {/* ── Splash screen (visible before tapping play) ── */}
              <AnimatePresence>
                {!playing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-7 text-center w-full px-4"
                  >
                    {/* Animated ring */}
                    <div
                      className="float-anim flex items-center justify-center"
                      style={{
                        width: 136, height: 136, borderRadius: '50%',
                        border: '2px solid rgba(201,162,39,0.35)',
                        boxShadow: '0 0 48px rgba(201,162,39,0.1), inset 0 0 32px rgba(201,162,39,0.04)',
                        flexShrink: 0,
                      }}
                    >
                      <div style={{
                        width: 104, height: 104, borderRadius: '50%',
                        border: '1px solid rgba(201,162,39,0.2)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '3.2rem',
                      }}>
                        🥂
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p style={{ color: '#A7A296', fontSize: '0.62rem', letterSpacing: '0.38em', textTransform: 'uppercase' }}>
                        Tienes una invitación de
                      </p>
                      <div className="ivory-heading" style={{ fontSize: 'clamp(2.6rem, 15vw, 5rem)', fontWeight: 900, lineHeight: 0.9 }}>
                        {PARTY.alias}
                      </div>
                      <div className="gold-shimmer" style={{ fontSize: 'clamp(3rem, 18vw, 6rem)', fontWeight: 900, lineHeight: 0.9, letterSpacing: '-0.02em' }}>
                        4.0
                      </div>
                    </div>

                    <div className="gold-line w-16" />

                    {/* Gold play button — tapping here grants iOS audio permission */}
                    <motion.button
                      onClick={handlePlay}
                      whileTap={{ scale: 0.94 }}
                      style={{
                        width: 76, height: 76, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #A89169, #C9A227)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: 'none', cursor: 'pointer',
                        boxShadow: '0 0 0 8px rgba(201,162,39,0.1), 0 0 28px rgba(201,162,39,0.3)',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                        <polygon points="6,3 20,12 6,21" />
                      </svg>
                    </motion.button>

                    <p style={{ color: 'rgba(241,240,239,0.35)', fontSize: '0.7rem', letterSpacing: '0.1em' }}>
                      Toca para ver el video
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* ── Placeholder: sin video configurado ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-6 px-8 text-center"
            >
              <div className="float-anim" style={{ width: 136, height: 136, borderRadius: '50%', border: '2px solid rgba(201,162,39,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem' }}>
                🥂
              </div>
              <div>
                <p style={{ color: '#A7A296', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Te invito a celebrar
                </p>
                <div className="ivory-heading" style={{ fontSize: 'clamp(2.5rem, 14vw, 5rem)', fontWeight: 900, lineHeight: 1 }}>{PARTY.alias}</div>
                <div className="gold-shimmer" style={{ fontSize: 'clamp(3rem, 18vw, 6rem)', fontWeight: 900, lineHeight: 0.9 }}>4.0</div>
              </div>
              <div className="gold-line w-24" />
              <p style={{ color: '#D6C8B1', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{PARTY.fecha}</p>
              <button onClick={finish} className="btn-primary" style={{ fontSize: '0.8rem' }}>
                Ver invitación
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
