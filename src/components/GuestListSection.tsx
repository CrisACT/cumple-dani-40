import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, RefreshCw, UserCheck } from 'lucide-react';
import FadeIn from './FadeIn';
import { getGuests, type Guest } from '../lib/supabase';

export default function GuestListSection() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchGuests = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true);
    const { data } = await getGuests();
    setGuests(data);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => { fetchGuests(); }, []);

  return (
    <section
      id="invitados"
      style={{
        background: '#25251E',
        padding: 'clamp(3.5rem, 10vw, 5rem) 1.5rem',
        position: 'relative',
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(201,162,39,0.06) 0%, transparent 60%)' }}
      />

      <div className="max-w-sm mx-auto flex flex-col gap-8 relative z-10">

        {/* Heading */}
        <FadeIn>
          <div className="flex flex-col gap-1">
            <p style={{ color: '#A7A296', fontSize: '0.62rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Los que estarán presentes
            </p>
            <h2
              className="ivory-heading"
              style={{ fontSize: 'clamp(2.2rem, 12vw, 4rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-0.02em' }}
            >
              Lista de<br />Invitados
            </h2>
          </div>
        </FadeIn>

        {/* Counter badge */}
        <FadeIn delay={0.1}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'rgba(201,162,39,0.1)',
              border: '1px solid rgba(201,162,39,0.25)',
              borderRadius: 999,
              padding: '0.5rem 1rem',
              alignSelf: 'flex-start',
            }}
          >
            <Users size={14} style={{ color: '#C9A227' }} />
            <span style={{ color: '#D6C8B1', fontSize: '0.78rem', fontWeight: 600 }}>
              {loading ? '...' : `${guests.length} confirmado${guests.length !== 1 ? 's' : ''}`}
            </span>
          </div>
        </FadeIn>

        {/* Guest list */}
        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <svg width="24" height="24" viewBox="0 0 24 24" style={{ animation: 'spin 1s linear infinite', color: '#C9A227' }}>
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="40" strokeDashoffset="15" />
              </svg>
            </div>
          ) : guests.length === 0 ? (
            <FadeIn>
              <div
                style={{
                  textAlign: 'center',
                  padding: '2.5rem 1rem',
                  border: '1px dashed rgba(201,162,39,0.2)',
                  borderRadius: 20,
                  color: '#A7A296',
                  fontSize: '0.82rem',
                }}
              >
                <p>Sé el primero en confirmar</p>
                <p style={{ fontSize: '0.72rem', marginTop: '0.25rem', opacity: 0.6 }}>
                  La lista aparecerá aquí cuando alguien confirme asistencia
                </p>
              </div>
            </FadeIn>
          ) : (
            guests.map((guest, i) => (
              <motion.div
                key={guest.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.85rem',
                  background: 'rgba(241,240,239,0.04)',
                  border: '1px solid rgba(201,162,39,0.1)',
                  borderRadius: 14,
                  padding: '0.75rem 1rem',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, hsl(${(i * 47) % 360}, 25%, 40%), hsl(${(i * 47 + 40) % 360}, 35%, 30%))`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: '1px solid rgba(201,162,39,0.2)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#D6C8B1',
                  }}
                >
                  {guest.nombre.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col gap-0 flex-1 min-w-0">
                  <span style={{ color: '#F1F0EF', fontSize: '0.9rem', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {guest.nombre} {guest.apellido}
                  </span>
                  <span style={{ color: '#A7A296', fontSize: '0.62rem', letterSpacing: '0.1em' }}>
                    Confirmado ✓
                  </span>
                </div>
                <UserCheck size={14} style={{ color: '#C9A227', flexShrink: 0 }} />
              </motion.div>
            ))
          )}
        </div>

        {/* Refresh button */}
        {!loading && (
          <FadeIn delay={0.2}>
            <button
              onClick={() => fetchGuests(true)}
              className="btn-ghost w-full"
              style={{ fontSize: '0.75rem' }}
              disabled={refreshing}
            >
              <RefreshCw size={13} style={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
              Actualizar lista
            </button>
          </FadeIn>
        )}

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  );
}
