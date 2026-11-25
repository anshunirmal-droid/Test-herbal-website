-- Vanyaa Roots: Supabase schema
-- Run this once in Supabase Dashboard -> SQL Editor -> New query -> paste -> Run.
-- Safe to read top to bottom: every table has Row Level Security (RLS) switched on,
-- and the policies below are the ONLY things the browser is allowed to do.

-- ============================================================
-- 1. Public forms (anyone can submit, nobody can read from the site)
--    You read the entries in Dashboard -> Table Editor.
-- ============================================================

create table public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null check (char_length(email) between 5 and 254),
  created_at timestamptz not null default now()
);
create unique index waitlist_email_key on public.waitlist (lower(email));
alter table public.waitlist enable row level security;
create policy "Anyone can join the waitlist"
  on public.waitlist for insert to anon, authenticated
  with check (true);

create table public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) between 5 and 254),
  message text not null check (char_length(message) between 1 and 2000),
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
create policy "Anyone can send a contact message"
  on public.contact_messages for insert to anon, authenticated
  with check (true);

-- ============================================================
-- 2. Customer accounts
--    Supabase Auth stores the login (auth.users). We keep one profile row per
--    user with an approval status: pending -> approved (or blocked).
--      * Someone who signs up on the website starts as 'pending'.
--      * Someone you invite from the Supabase dashboard starts as 'approved'.
-- ============================================================

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'blocked')),
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;

-- Users may read ONLY their own profile. There is deliberately no insert/update
-- policy, so a customer can never approve themselves.
create policy "Users can read their own profile"
  on public.profiles for select to authenticated
  using (id = (select auth.uid()));

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name, status)
  values (
    new.id,
    new.email,
    left(nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''), 100),
    case when new.invited_at is not null then 'approved' else 'pending' end
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create or replace function public.is_approved()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and status = 'approved'
  );
$$;

-- ============================================================
-- 3. Dashboard tools
--    One row per internal tool shown on the customer dashboard.
--    Add / edit / hide tools in Table Editor -> tools. Only approved customers
--    can read them.
-- ============================================================

create table public.tools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  url text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
alter table public.tools enable row level security;
create policy "Approved customers can read active tools"
  on public.tools for select to authenticated
  using (active and public.is_approved());

-- ============================================================
-- 4. API permissions
--    Newer Supabase projects do NOT give the browser roles access to new tables
--    automatically. RLS above still decides which rows are allowed; these grants
--    only open the door. Visitors can insert form entries but never read them.
--    Safe to run again.
-- ============================================================

grant usage on schema public to anon, authenticated;
grant insert on public.waitlist to anon, authenticated;
grant insert on public.contact_messages to anon, authenticated;
grant select on public.profiles to authenticated;
grant select on public.tools to authenticated;
grant execute on function public.is_approved() to authenticated;

-- ============================================================
-- Day-to-day admin (run in the SQL Editor, or just edit the row in Table Editor)
-- ============================================================
-- Approve a customer:
--   update public.profiles set status = 'approved' where email = 'customer@example.com';
-- Block a customer:
--   update public.profiles set status = 'blocked'  where email = 'customer@example.com';
-- Add a tool:
--   insert into public.tools (name, description, url, sort_order)
--   values ('Example tool', 'What it does, in one line', 'https://example.com', 1);
