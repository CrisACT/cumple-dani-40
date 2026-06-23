import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Send, Check, ArrowLeft } from 'lucide-react';
import { addGuest } from '../lib/supabase';

interface RSVPFormProps {
  onBack: () => void;
  onSuccess: () => void;
}

export default function RSVPForm({ onBack, onSuccess }: RSVPFormProps) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !apellido.trim()) {
      setError('Por favor ingresa tu nombre y apellido.');
      return;
    }
    setLoading(true);
    setError('');
    const { error: err } = await addGuest(nombre.trim(), apellido.trim());
    setLoading(false);
    if (err) {
      setError(`Error: ${err}`);
    } else {
      setDone(true);
      setTimeout(onSuccess, 2200);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative"
      style={{ background: '#25251E' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />
      <div className="absolute bottom-0 left-0 right-0 h-px gold-line" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(201,162,39,0.06) 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-sm flex flex-col gap-7 relative z-10">

        {/* Back button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 self-start"
          style={{ color: '#A7A296', fontSize: '0.75rem', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
        >
          <ArrowLeft size={14} /> Volver
        </button>

        {/* Heading */}
        <div className="flex flex-col gap-1">
          <p style={{ color: '#A7A296', fontSize: '0.65rem', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Confirmar asistencia
          </p>
          <h2 className="ivory-heading" style={{ fontSize: 'clamp(1.6rem, 8vw, 2.5rem)', fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
            ¿Quién asistirá?
          </h2>
          <p style={{ color: 'rgba(241,240,239,0.45)', fontSize: '0.8rem', marginTop: '0.25rem' }}>
            Ingresa los datos de quien asistirá a la fiesta.
          </p>
        </div>

        <div className="gold-line w-full" />

        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-8 text-center"
          >
            <div
              className="float-anim flex items-center justify-center"
              style={{
                width: 72, height: 72, borderRadius: '50%',
                background: 'linear-gradient(135deg, #A89169, #C9A227)',
                boxShadow: '0 0 30px rgba(201,162,39,0.3)',
              }}
            >
              <Check size={32} color="white" strokeWidth={3} />
            </div>
            <p style={{ color: '#D6C8B1', fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
              ¡{nombre}, ya estás en la lista! 🥂
            </p>
            <p style={{ color: '#A7A296', fontSize: '0.8rem' }}>
              Preparando tu invitación...
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Input: Nombre */}
            <div className="flex flex-col gap-1.5">
              <label style={{ color: '#A7A296', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Nombre
              </label>
              <div className="relative">
                <User size={15} className="absolute" style={{ left: 14, top: '50%', transform: 'translateY(-50%)', color: '#C9A227' }} />
                <input
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Tu nombre"
                  autoComplete="given-name"
                  style={{
                    width: '100%',
                    background: 'rgba(241,240,239,0.06)',
                    border: '1px solid rgba(201,162,39,0.25)',
                    borderRadius: 12,
                    padding: '0.8rem 1rem 0.8rem 2.5rem',
                    color: '#F1F0EF',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontSize: 16,
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.25)'}
                />
              </div>
            </div>

            {/* Input: Apellido */}
            <div className="flex flex-col gap-1.5">
              <label style={{ color: '#A7A296', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Apellido
              </label>
              <div className="relative">
                <User size={15} className="absolute" style={{ left: 14, top: '50%', transform: 'translateY(-50%)', color: '#C9A227' }} />
                <input
                  type="text"
                  value={apellido}
                  onChange={e => setApellido(e.target.value)}
                  placeholder="Tu apellido"
                  autoComplete="family-name"
                  style={{
                    width: '100%',
                    background: 'rgba(241,240,239,0.06)',
                    border: '1px solid rgba(201,162,39,0.25)',
                    borderRadius: 12,
                    padding: '0.8rem 1rem 0.8rem 2.5rem',
                    color: '#F1F0EF',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    fontSize: 16,
                  }}
                  onFocus={e => e.target.style.borderColor = 'rgba(201,162,39,0.6)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(201,162,39,0.25)'}
                />
              </div>
            </div>

            {error && (
              <p style={{ color: '#CAA18E', fontSize: '0.78rem', textAlign: 'center' }}>{error}</p>
            )}

            <button
              type="submit"
              className="btn-primary w-full mt-2"
              disabled={loading}
              style={{ opacity: loading ? 0.7 : 1 }}
            >
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="8" cy="8" r="6" fill="none" stroke="white" strokeWidth="2" strokeDasharray="28" strokeDashoffset="10" />
                  </svg>
                  Confirmando...
                </span>
              ) : (
                <>
                  <Send size={15} />
                  ¡Confirmar mi asistencia!
                </>
              )}
            </button>
          </form>
        )}

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </motion.div>
  );
}
