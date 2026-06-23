import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '../config';

export const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export type Guest = {
  id: string;
  nombre: string;
  apellido: string;
  created_at: string;
};

export async function addGuest(nombre: string, apellido: string): Promise<{ error: string | null }> {
  if (!supabase) return { error: 'Supabase no configurado' };
  const { error } = await supabase.from('rsvp_guests').insert([{ nombre, apellido }]);
  return { error: error?.message ?? null };
}

export async function getGuests(): Promise<{ data: Guest[]; error: string | null }> {
  if (!supabase) return { data: [], error: null };
  const { data, error } = await supabase
    .from('rsvp_guests')
    .select('*')
    .order('created_at', { ascending: true });
  return { data: (data as Guest[]) ?? [], error: error?.message ?? null };
}
