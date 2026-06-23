import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink, RefreshCw } from 'lucide-react';
import FadeIn from './FadeIn';
import { PARTY } from '../config';

export default function SpotifySection() {
  // Incrementing this key forces React to unmount+remount the iframe,
  // picking up any newly-added songs from the collaborative playlist.
  const [refreshKey, setRefreshKey] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState(new Date());

  // Auto-refresh every 90 seconds so new songs appear without manual action
  useEffect(() => {
    const id = setInterval(() => {
      setRefreshKey((k) => k + 1);
      setLastRefreshed(new Date());
    }, 90_000);
    return () => clearInterval(id);
  }, []);

  const handleManualRefresh = () => {
    setRefreshing(true);
    setRefreshKey((k) => k + 1);
    setLastRefreshed(new Date());
    setTimeout(() => setRefreshing(false), 1200);
  };

  const timeLabel = () => {
    const diff = Math.floor((Date.now() - lastRefreshed.getTime()) / 1000);
    if (diff < 10) return 'ahora mismo';
    if (diff < 60) return `hace ${diff}s`;
    return `hace ${Math.floor(diff / 60)}min`;
  };

  return (
    <section
      id="playlist"
      style={{
        background: '#EDE9E1',
        borderRadius: '36px 36px 0 0',
        padding: 'clamp(3.5rem, 10vw, 5rem) 1.4rem clamp(4rem, 12vw, 6rem)',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 3,
      }}
    >
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

      <div className="max-w-sm mx-auto flex flex-col gap-7">

        {/* Heading row + refresh */}
        <FadeIn>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
            <div className="flex flex-col gap-1">
              <p style={{ color: '#A7A296', fontSize: '0.6rem', letterSpacing: '0.32em', textTransform: 'uppercase' }}>
                Pon tu canción favorita
              </p>
              <h2
                className="hero-heading"
                style={{ fontSize: 'clamp(2.2rem, 12vw, 4rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.02em' }}
              >
                Playlist<br />de la Noche
              </h2>
            </div>

            {/* Manual refresh button */}
            <motion.button
              onClick={handleManualRefresh}
              whileTap={{ scale: 0.9 }}
              style={{
                marginTop: '1.4rem',
                flexShrink: 0,
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: 'rgba(201,162,39,0.1)',
                border: '1px solid rgba(201,162,39,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#A89169',
              }}
              title="Actualizar playlist"
            >
              <motion.div
                animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.7, ease: 'linear' }}
              >
                <RefreshCw size={16} />
              </motion.div>
            </motion.button>
          </div>
          <p style={{ color: '#A7A296', fontSize: '0.62rem', marginTop: '0.3rem' }}>
            Actualizada {timeLabel()}
          </p>
        </FadeIn>

        {/* Info card */}
        <FadeIn delay={0.08}>
          <div
            style={{
              background: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(168,145,105,0.15)',
              borderRadius: 18,
              padding: '1rem 1.15rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              boxShadow: '0 2px 12px rgba(37,37,30,0.07)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #1DB954, #158a3e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Music size={17} color="white" />
            </div>
            <div>
              <p style={{ color: '#1E1E17', fontSize: '0.84rem', fontWeight: 600 }}>
                Playlist colaborativa
              </p>
              <p style={{ color: '#927452', fontSize: '0.74rem', lineHeight: 1.45, marginTop: '0.18rem' }}>
                Agrega la canción que no puede faltar esa noche. Se actualiza en vivo.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Spotify embed — key forces reload when refreshKey changes */}
        <FadeIn delay={0.14}>
          <div
            style={{
              borderRadius: 18,
              overflow: 'hidden',
              border: '1px solid rgba(168,145,105,0.15)',
              boxShadow: '0 4px 20px rgba(37,37,30,0.09)',
            }}
          >
            <iframe
              key={refreshKey}
              src={`https://open.spotify.com/embed/playlist/${PARTY.spotifyPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Playlist Cumple Dani 4.0"
              style={{ display: 'block' }}
            />
          </div>
        </FadeIn>

        {/* Open in Spotify */}
        <FadeIn delay={0.2}>
          <motion.a
            href={PARTY.spotifyPlaylistUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full text-center"
            style={{ display: 'flex', justifyContent: 'center', textDecoration: 'none' }}
            whileTap={{ scale: 0.97 }}
          >
            <Music size={15} />
            Abrir en Spotify
            <ExternalLink size={12} style={{ opacity: 0.7 }} />
          </motion.a>
        </FadeIn>

        <FadeIn delay={0.26}>
          <p style={{ color: '#A7A296', fontSize: '0.7rem', textAlign: 'center', lineHeight: 1.55 }}>
            Toca "Seguir" en Spotify y agrega las canciones<br />
            que quieras escuchar esa noche
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
