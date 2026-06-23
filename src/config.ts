export const VIMEO_VIDEO_ID = import.meta.env.VITE_VIMEO_VIDEO_ID || '';

export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const PARTY = {
  nombreFestejada: 'Daniela Poblete',
  alias: 'Dani',
  edad: 40,
  fecha: '24 de Julio · 2026',
  hora: '20:00 hrs',
  lugar: 'Pasaje Lo López N° 371',
  ciudad: 'Isla de Maipo',
  // ISO date for countdown (Chile Summer Time = UTC-3, but party is in winter = UTC-4)
  isoDate: '2026-07-24T20:00:00-04:00',
  tematica: 'Lentes Divertidos',
  spotifyPlaylistId: '4GY2SPUpikmZqtIKGENd8k',
  spotifyPlaylistUrl: 'https://open.spotify.com/playlist/4GY2SPUpikmZqtIKGENd8k',
};
