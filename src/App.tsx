import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import VideoIntro from './components/VideoIntro';
import RSVPScreen from './components/RSVPScreen';
import RSVPForm from './components/RSVPForm';
import HeroSection from './components/HeroSection';
import MarqueeSection from './components/MarqueeSection';
import VideoReplaySection from './components/VideoReplaySection';
import CountdownSection from './components/CountdownSection';
import DetailsSection from './components/DetailsSection';
import GuestListSection from './components/GuestListSection';
import SpotifySection from './components/SpotifySection';

type Screen = 'video' | 'rsvp' | 'form' | 'main';

function MainPage({ onRSVP }: { onRSVP: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ overflowX: 'clip' }}
    >
      <HeroSection onRSVP={onRSVP} />
      <MarqueeSection />
      {/* Video replay — between marquee and countdown */}
      <VideoReplaySection />
      <CountdownSection />
      <DetailsSection />
      <GuestListSection />
      <SpotifySection />

      {/* Footer */}
      <footer
        style={{
          background: '#1E1E17',
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          borderTop: '1px solid rgba(201,162,39,0.13)',
        }}
      >
        <p
          className="gold-shimmer"
          style={{
            fontSize: '0.62rem',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
          }}
        >
          ✦ Daniela Poblete ✦ 4.0 Años ✦
        </p>
        <p style={{ color: '#A7A296', fontSize: '0.65rem' }}>
          Hecho con amor · 24 Julio 2026
        </p>
      </footer>
    </motion.div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('video');

  return (
    <div
      style={{
        maxWidth: 430,
        margin: '0 auto',
        minHeight: '100svh',
        background: '#1E1E17',
      }}
    >
      <AnimatePresence mode="wait">
        {screen === 'video' && (
          <VideoIntro key="video" onFinish={() => setScreen('rsvp')} />
        )}
        {screen === 'rsvp' && (
          <RSVPScreen
            key="rsvp"
            onAccept={() => setScreen('form')}
            onDecline={() => setScreen('main')}
            onSkip={() => setScreen('main')}
          />
        )}
        {screen === 'form' && (
          <RSVPForm
            key="form"
            onBack={() => setScreen('rsvp')}
            onSuccess={() => setScreen('main')}
          />
        )}
        {screen === 'main' && (
          <MainPage key="main" onRSVP={() => setScreen('rsvp')} />
        )}
      </AnimatePresence>
    </div>
  );
}
