import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Player from '@vimeo/player';
import { Volume2 } from 'lucide-react';
import { VIMEO_VIDEO_ID, PARTY } from '../config';

interface VideoIntroProps {
  onFinish: () => void;
}

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
  // true when iOS auto-muted the video after play()
  const [showUnmute, setShowUnmute] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<Player | null>(null);
  const fallbackRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finish = () => {
    if (fallbackRef.current) clearTimeout(fallbackRef.current);
    setVisible(false);
    setTimeout(onFinish, 600);
  };

  useEffect(() => {
    if (!VIMEO_VIDEO_ID || !iframeRef.current) return;
    const p = new Player(iframeRef.current);
    playerRef.current = p;

    p.on('ended', () => {
      // Small grace-period so the last frame is fully visible before transition
      setTimeout(finish, 1500);
    });

    return () => {
      p.off('ended');
      p.destroy().catch(() => {});
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePlay = () => {
    setPlaying(true);

    if (playerRef.current) {
      // Fire all calls synchronously (without await) to stay in the
      // iOS user-gesture window as long as possible
      playerRef.current.setVolume(1).catch(() => {});
      playerRef.current.setMuted(false).catch(() => {});
      playerRef.current.play().catch(() => {});

      // After a short delay, check if iOS auto-muted and surface the hint
      setTimeout(async () => {
        try {
          const muted = await playerRef.current?.getMuted();
          if (muted) setShowUnmute(true);
        } catch (_) { /* ignore */ }
      }, 900);
    }

    // Safety fallback — if 'ended' never fires (e.g. very long video or error)
    fallbackRef.current = setTimeout(finish, 90_000);
  };

  const handleUnmute = () => {
    if (playerRef.current) {
      // Called from a user tap — iOS should grant audio permission here
      playerRef.current.setMuted(false).catch(() => {});
      playerRef.current.setVolume(1).catch(() => {});
    }
    setShowUnmute(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#1E1E17' }}
        >
          {/* Particles */}
          {PARTICLES.map((p) => (
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

          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.6), transparent)' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.6), transparent)' }}
          />

          {VIMEO_VIDEO_ID ? (
            <div className="relative w-full max-w-sm mx-auto px-4 flex flex-col items-center gap-5">

              {/* ── Vimeo iframe — always in DOM for SDK initialisation ── */}
              {/* Off-screen when not playing; slides in when playing=true  */}
              <div
                style={{
                  position: playing ? 'relative' : 'absolute',
                  left: playing ? 'auto' : '-9999px',
                  width: playing ? '100%' : '1px',
                  height: playing ? undefined : '1px',
                  paddingTop: playing ? '177.78%' : 0,
                  borderRadius: 18,
                  overflow: 'hidden',
                  border: playing ? '1px solid rgba(201,162,39,0.28)' : 'none',
                  opacity: playing ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                }}
              >
                <iframe
                  ref={iframeRef}
                  src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=0&muted=0&loop=0&title=0&byline=0&portrait=0&color=C9A227&playsinline=1&autopause=0`}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Video de invitación"
                />

                {/* iOS unmute hint — appears only when iOS auto-muted */}
                <AnimatePresence>
                  {showUnmute && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      onClick={handleUnmute}
                      style={{
                        position: 'absolute',
                        bottom: 16,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.4rem',
                        background: 'rgba(30,30,23,0.85)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(201,162,39,0.4)',
                        borderRadius: 999,
                        color: '#C9A227',
                        fontSize: '0.72rem',
                        letterSpacing: '0.1em',
                        padding: '0.5rem 1.1rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        zIndex: 10,
                      }}
                    >
                      <Volume2 size={14} />
                      Activar sonido
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* ── Splash screen — shown until user taps play ── */}
              <AnimatePresence>
                {!playing && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.93 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-6 text-center w-full px-4"
                  >
                    {/* Animated ring */}
                    <div
                      className="float-anim flex items-center justify-center"
                      style={{
                        width: 132,
                        height: 132,
                        borderRadius: '50%',
                        border: '1.5px solid rgba(201,162,39,0.32)',
                        boxShadow:
                          '0 0 40px rgba(201,162,39,0.08), inset 0 0 28px rgba(201,162,39,0.03)',
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          width: 100,
                          height: 100,
                          borderRadius: '50%',
                          border: '1px solid rgba(201,162,39,0.18)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '3rem',
                        }}
                      >
                        🥂
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      <p
                        style={{
                          color: '#A7A296',
                          fontSize: '0.6rem',
                          letterSpacing: '0.4em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Tienes una invitación de
                      </p>
                      <div
                        className="ivory-heading"
                        style={{ fontSize: 'clamp(2.6rem, 15vw, 5rem)', fontWeight: 900, lineHeight: 0.9 }}
                      >
                        {PARTY.alias}
                      </div>
                      <div
                        className="gold-shimmer"
                        style={{ fontSize: 'clamp(3rem, 18vw, 6rem)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.02em' }}
                      >
                        4.0
                      </div>
                    </div>

                    <div className="gold-line w-16" />

                    {/* Gold play button */}
                    <motion.button
                      onClick={handlePlay}
                      whileTap={{ scale: 0.93 }}
                      style={{
                        width: 74,
                        height: 74,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #A89169, #C9A227)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 0 0 10px rgba(201,162,39,0.09)',
                        flexShrink: 0,
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
                        <polygon points="6,3 20,12 6,21" />
                      </svg>
                    </motion.button>

                    <p
                      style={{
                        color: 'rgba(237,233,225,0.3)',
                        fontSize: '0.68rem',
                        letterSpacing: '0.1em',
                      }}
                    >
                      Toca para ver el video
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            /* ── Placeholder (no Vimeo ID configured) ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-6 px-8 text-center"
            >
              <div
                className="float-anim"
                style={{
                  width: 132,
                  height: 132,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(201,162,39,0.45)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                }}
              >
                🥂
              </div>
              <div>
                <p style={{ color: '#A7A296', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  Te invito a celebrar
                </p>
                <div className="ivory-heading" style={{ fontSize: 'clamp(2.5rem, 14vw, 5rem)', fontWeight: 900, lineHeight: 1 }}>
                  {PARTY.alias}
                </div>
                <div className="gold-shimmer" style={{ fontSize: 'clamp(3rem, 18vw, 6rem)', fontWeight: 900, lineHeight: 0.9 }}>
                  4.0
                </div>
              </div>
              <div className="gold-line w-24" />
              <p style={{ color: '#D6C8B1', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                {PARTY.fecha}
              </p>
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
