import { PARTY } from '../config';

const TEXT_ITEMS = [
  `✦ ${PARTY.nombreFestejada}`,
  `✦ ${PARTY.edad} Años`,
  `✦ ${PARTY.fecha}`,
  `✦ ${PARTY.lugar}`,
  `✦ ${PARTY.ciudad}`,
  `✦ ¡Una noche inolvidable!`,
];

const TRACK = [...TEXT_ITEMS, ...TEXT_ITEMS];

export default function MarqueeSection() {
  return (
    <section
      style={{ background: '#25251E', padding: '0', overflow: 'hidden', borderTop: '1px solid rgba(201,162,39,0.15)', borderBottom: '1px solid rgba(201,162,39,0.15)' }}
    >
      <div style={{ padding: '1rem 0', overflow: 'hidden' }}>
        <div
          className="marquee-track"
          style={{ display: 'flex', gap: '0rem', width: 'max-content' }}
        >
          {TRACK.map((item, i) => (
            <span
              key={i}
              style={{
                padding: '0 1.5rem',
                color: i % 2 === 0 ? '#C9A227' : '#A7A296',
                fontSize: '0.72rem',
                fontWeight: 500,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
