import { useState } from 'react';
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
  // Si hay video de Vimeo, mostramos el "tap to play" primero
  // para que el navegador permita sonido al reproducir tras gesto del usuario
  const [playing, setPlaying] = useState(false);

  const handleFinish = () => {
    setVisible(false);
    setTimeout(onFinish, 600);
  };

  const handlePlay = () => {
    setPlaying(true);
    // Auto-avanzar después del tiempo del video + pequeño margen
    setTimeout(handleFinish, 10000);
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

          {/* Gold border lines */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />
          <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'linear-gradient(90deg, transparent, #C9A227, transparent)' }} />

          {VIMEO_VIDEO_ID ? (
            <div className="relative w-full max-w-sm mx-auto px-4 flex flex-col items-center gap-5">
              {playing ? (
                /* ── Vimeo iframe (arranca CON sonido porque el usuario tocó "Ver video") ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full rounded-2xl overflow-hidden"
                  style={{ paddingTop: '177.78%', border: '1px solid rgba(201,162,39,0.3)' }}
                >
                  <iframe
                    src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&muted=0&loop=0&title=0&byline=0&portrait=0&color=C9A227&playsinline=1`}
                    className="absolute inset-0 w-full h-full"
                    allow="autoplay; fullscreen; picture-in-picture"
                    title="Video de invitación"
                  />
                </motion.div>
              ) : (
                /* ── Pantalla de "tap to play" ── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                  className="flex flex-col items-center gap-7 text-center px-4"
                >
                  {/* Animated ring */}
                  <div
                    className="relative flex items-center justify-center float-anim"
                    style={{
                      width: 140, height: 140, borderRadius: '50%',
                      border: '2px solid rgba(201,162,39,0.4)',
                      boxShadow: '0 0 50px rgba(201,162,39,0.12), inset 0 0 40px rgba(201,162,39,0.05)',
                    }}
                  >
                    <div style={{ width: 108, height: 108, borderRadius: '50%', border: '1px solid rgba(201,162,39,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>
                      🥂
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <p style={{ color: '#A7A296', fontSize: '0.65rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
                      Tienes una invitación de
                    </p>
                    <h1 className="ivory-heading" style={{ fontSize: 'clamp(2.8rem, 16vw, 5.5rem)', fontWeight: 900, lineHeight: 0.9 }}>
                      {PARTY.alias}
                    </h1>
                    <div className="gold-shimmer" style={{ fontSize: 'clamp(3.5rem, 20vw, 7rem)', fontWeight: 900, lineHeight: 0.85 }}>
                      40
                    </div>
                  </div>

                  <div className="gold-line w-20" />

                  {/* Play button — el toque aquí autoriza el sonido */}
                  <button
                    onClick={handlePlay}
                    style={{
                      width: 72, height: 72, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #A89169, #C9A227)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: 'none', cursor: 'pointer',
                      boxShadow: '0 0 30px rgba(201,162,39,0.4)',
                      flexShrink: 0,
                    }}
                  >
                    {/* Play triangle */}
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  </button>

                  <p style={{ color: 'rgba(241,240,239,0.4)', fontSize: '0.72rem', letterSpacing: '0.1em' }}>
                    Toca para ver el video 🎬
                  </p>
                </motion.div>
              )}

              {/* Skip / Continuar */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: playing ? 0.5 : 1.2 }}
                onClick={handleFinish}
                className="btn-ghost"
                style={{ fontSize: '0.75rem', padding: '0.6rem 1.5rem' }}
              >
                Continuar →
              </motion.button>
            </div>
          ) : (
            /* ── Placeholder sin video configurado ── */
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center gap-6 px-8 text-center"
            >
              <div className="relative flex items-center justify-center float-anim" style={{ width: 140, height: 140, borderRadius: '50%', border: '2px solid rgba(201,162,39,0.5)', boxShadow: '0 0 40px rgba(201,162,39,0.15)' }}>
                <div style={{ width: 108, height: 108, borderRadius: '50%', border: '1px solid rgba(201,162,39,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3.5rem' }}>🥂</div>
              </div>
              <div className="flex flex-col gap-2">
                <p style={{ color: '#A7A296', fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>Te invito a celebrar</p>
                <h1 className="ivory-heading" style={{ fontSize: 'clamp(2.5rem, 14vw, 5rem)', fontWeight: 900, lineHeight: 1 }}>{PARTY.alias}</h1>
                <div className="gold-shimmer" style={{ fontSize: 'clamp(3.5rem, 20vw, 7rem)', fontWeight: 900, lineHeight: 0.9 }}>40</div>
              </div>
              <div className="gold-line w-24" />
              <p style={{ color: '#D6C8B1', fontSize: '0.85rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{PARTY.fecha}</p>
              <button onClick={handleFinish} className="btn-primary" style={{ fontSize: '0.8rem' }}>Ver invitación →</button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
