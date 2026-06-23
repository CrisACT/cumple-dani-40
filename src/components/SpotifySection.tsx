import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import FadeIn from './FadeIn';
import { PARTY } from '../config';

export default function SpotifySection() {
  return (
    <section
      id="playlist"
      style={{
        background: '#F1F0EF',
        borderRadius: '40px 40px 0 0',
        padding: 'clamp(3.5rem, 10vw, 5rem) 1.5rem clamp(4rem, 12vw, 6rem)',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 3,
      }}
    >
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

      <div className="max-w-sm mx-auto flex flex-col gap-8">

        {/* Heading */}
        <FadeIn>
          <div className="flex flex-col gap-1">
            <p style={{ color: '#A7A296', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Pon tu canción favorita
            </p>
            <h2
              className="hero-heading"
              style={{ fontSize: 'clamp(2.2rem, 12vw, 4rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.02em' }}
            >
              Playlist<br />de la Noche
            </h2>
          </div>
        </FadeIn>

        {/* Description card */}
        <FadeIn delay={0.1}>
          <div
            style={{
              background: 'white',
              border: '1px solid rgba(168,145,105,0.15)',
              borderRadius: 18,
              padding: '1.1rem 1.2rem',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '0.85rem',
              boxShadow: '0 2px 12px rgba(37,37,30,0.05)',
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
              <Music size={18} color="white" />
            </div>
            <div>
              <p style={{ color: '#25251E', fontSize: '0.85rem', fontWeight: 600 }}>Playlist colaborativa</p>
              <p style={{ color: '#927452', fontSize: '0.75rem', lineHeight: 1.4, marginTop: '0.2rem' }}>
                ¿Cuál canción no puede faltar en la fiesta? Agrégala a la playlist de la noche 🎶
              </p>
            </div>
          </div>
        </FadeIn>

        {/* Spotify embed */}
        <FadeIn delay={0.15}>
          <div
            style={{
              borderRadius: 18,
              overflow: 'hidden',
              border: '1px solid rgba(168,145,105,0.15)',
              boxShadow: '0 4px 20px rgba(37,37,30,0.08)',
            }}
          >
            <iframe
              src={`https://open.spotify.com/embed/playlist/${PARTY.spotifyPlaylistId}?utm_source=generator&theme=0`}
              width="100%"
              height="380"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Playlist Cumple Dani 40"
              style={{ display: 'block' }}
            />
          </div>
        </FadeIn>

        {/* Open in Spotify button */}
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

        <FadeIn delay={0.25}>
          <p style={{ color: '#A7A296', fontSize: '0.7rem', textAlign: 'center', lineHeight: 1.5 }}>
            Toca "Seguir" en Spotify y agrega las canciones<br />
            que quieras escuchar esa noche ✨
          </p>
        </FadeIn>

      </div>
    </section>
  );
}
