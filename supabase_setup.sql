-- Ejecuta este SQL en el SQL Editor de tu proyecto Supabase
-- Supabase Dashboard → SQL Editor → New query → pega esto → Run

create table if not exists rsvp_guests (
  id uuid default gen_random_uuid() primary key,
  nombre text not null,
  apellido text not null,
  created_at timestamp with time zone default now()
);

-- Habilitar Row Level Security
alter table rsvp_guests enable row level security;

-- Política: cualquiera puede registrarse (insert)
create policy "Cualquiera puede confirmar asistencia"
  on rsvp_guests
  for insert
  with check (true);

-- Política: cualquiera puede ver la lista (select)
create policy "Cualquiera puede ver la lista"
  on rsvp_guests
  for select
  using (true);
