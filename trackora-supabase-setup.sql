-- =====================================================================
-- TRACKORA — Supabase database setup
-- Run this entire file in your Supabase project: SQL Editor → New query → Run
-- =====================================================================

-- ---------- Extensions ----------
create extension if not exists "pgcrypto";

-- ---------- Shared trigger: keep updated_at fresh ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- Profiles (auto-created on signup) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles: read own" on public.profiles;
create policy "Profiles: read own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "Profiles: insert own" on public.profiles;
create policy "Profiles: insert own" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "Profiles: update own" on public.profiles;
create policy "Profiles: update own" on public.profiles
  for update using (auth.uid() = id);

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- Auto-insert a profile row when a new auth user is created
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================================================================
-- Helper macro pattern: each table below has
--   user_id uuid references auth.users on delete cascade
--   RLS: owner-only (select/insert/update/delete) via auth.uid() = user_id
--   updated_at trigger
-- =====================================================================

-- ---------- Expenses ----------
create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  amount numeric(12,2) not null,
  category text not null default 'Other',
  notes text,
  date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_expenses_user_date on public.expenses (user_id, date desc);

alter table public.expenses enable row level security;
drop policy if exists "Expenses: owner all" on public.expenses;
create policy "Expenses: owner all" on public.expenses
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop trigger if exists trg_expenses_updated_at on public.expenses;
create trigger trg_expenses_updated_at
  before update on public.expenses
  for each row execute function public.set_updated_at();

-- ---------- Income ----------
create table if not exists public.income (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  source text not null,
  amount numeric(12,2) not null,
  category text not null default 'Other',
  notes text,
  date date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_income_user_date on public.income (user_id, date desc);

alter table public.income enable row level security;
drop policy if exists "Income: owner all" on public.income;
create policy "Income: owner all" on public.income
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop trigger if exists trg_income_updated_at on public.income;
create trigger trg_income_updated_at
  before update on public.income
  for each row execute function public.set_updated_at();

-- ---------- Loans ----------
create table if not exists public.loans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  initial_amount numeric(12,2) not null,
  current_balance numeric(12,2) not null,
  interest_rate numeric(6,3) not null default 0,
  monthly_payment numeric(12,2) not null default 0,
  start_date date,
  end_date date,
  status text not null default 'active', -- active | paid_off | defaulted
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.loans add column if not exists status text not null default 'active';
create index if not exists idx_loans_user on public.loans (user_id);

alter table public.loans enable row level security;
drop policy if exists "Loans: owner all" on public.loans;
create policy "Loans: owner all" on public.loans
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop trigger if exists trg_loans_updated_at on public.loans;
create trigger trg_loans_updated_at
  before update on public.loans
  for each row execute function public.set_updated_at();

-- ---------- Savings goals ----------
create table if not exists public.savings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  target_amount numeric(12,2) not null,
  current_amount numeric(12,2) not null default 0,
  deadline date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_savings_user on public.savings (user_id);

alter table public.savings enable row level security;
drop policy if exists "Savings: owner all" on public.savings;
create policy "Savings: owner all" on public.savings
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop trigger if exists trg_savings_updated_at on public.savings;
create trigger trg_savings_updated_at
  before update on public.savings
  for each row execute function public.set_updated_at();

-- ---------- Subscriptions ----------
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  amount numeric(12,2) not null,
  billing_cycle text not null default 'Monthly', -- Weekly | Monthly | Quarterly | Yearly
  category text,
  next_billing_date date,
  notes text,
  status text not null default 'active', -- active | cancelled
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_subscriptions_user on public.subscriptions (user_id);

-- Migration helper if you previously had is_active
alter table public.subscriptions add column if not exists status text not null default 'active';
alter table public.subscriptions alter column category drop not null;

alter table public.subscriptions enable row level security;
drop policy if exists "Subscriptions: owner all" on public.subscriptions;
create policy "Subscriptions: owner all" on public.subscriptions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop trigger if exists trg_subscriptions_updated_at on public.subscriptions;
create trigger trg_subscriptions_updated_at
  before update on public.subscriptions
  for each row execute function public.set_updated_at();

-- ---------- Category budgets ----------
create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null,
  monthly_limit numeric(12,2) not null,
  month int not null check (month between 1 and 12),
  year int not null check (year >= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, category, month, year)
);
create index if not exists idx_budgets_user_period on public.budgets (user_id, year, month);

alter table public.budgets enable row level security;
drop policy if exists "Budgets: owner all" on public.budgets;
create policy "Budgets: owner all" on public.budgets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop trigger if exists trg_budgets_updated_at on public.budgets;
create trigger trg_budgets_updated_at
  before update on public.budgets
  for each row execute function public.set_updated_at();

-- ---------- Total monthly budget ----------
create table if not exists public.monthly_budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total_limit numeric(12,2) not null,
  month int not null check (month between 1 and 12),
  year int not null check (year >= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, month, year)
);
create index if not exists idx_monthly_budgets_user_period on public.monthly_budgets (user_id, year, month);

alter table public.monthly_budgets enable row level security;
drop policy if exists "Monthly budgets: owner all" on public.monthly_budgets;
create policy "Monthly budgets: owner all" on public.monthly_budgets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop trigger if exists trg_monthly_budgets_updated_at on public.monthly_budgets;
create trigger trg_monthly_budgets_updated_at
  before update on public.monthly_budgets
  for each row execute function public.set_updated_at();

-- ---------- Receipts (smart import) ----------
create table if not exists public.receipts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  image_url text,
  raw_text text,
  parsed_data jsonb,
  total_amount numeric(12,2),
  merchant text,
  receipt_date date,
  status text not null default 'pending', -- pending | processed | imported | failed
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists idx_receipts_user on public.receipts (user_id, created_at desc);

alter table public.receipts enable row level security;
drop policy if exists "Receipts: owner all" on public.receipts;
create policy "Receipts: owner all" on public.receipts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop trigger if exists trg_receipts_updated_at on public.receipts;
create trigger trg_receipts_updated_at
  before update on public.receipts
  for each row execute function public.set_updated_at();

-- =====================================================================
-- DONE
-- After running, go to:
--   Authentication → Providers → Email → DISABLE "Confirm email"
--   Authentication → URL Configuration → add your preview + localhost URLs
-- Then copy your Project URL + anon key from Project Settings → API
-- and paste them back to Lovable.
-- =====================================================================
