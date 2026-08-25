-- HUB Gestão Condominial — schema inicial PostgreSQL
create extension if not exists pgcrypto;

create table condominiums (id uuid primary key default gen_random_uuid(), legal_name text not null, display_name text not null, cnpj varchar(14), address text, neighborhood text, city text, built_year smallint, total_units integer not null default 0, created_at timestamptz not null default now());
create table blocks (id uuid primary key default gen_random_uuid(), condominium_id uuid not null references condominiums(id) on delete cascade, name text not null, floors smallint not null, units_per_floor smallint not null);
create table units (id uuid primary key default gen_random_uuid(), block_id uuid not null references blocks(id) on delete cascade, number varchar(10) not null, area_m2 numeric(8,2), occupied boolean not null default false, unique(block_id, number));
create table people (id uuid primary key default gen_random_uuid(), full_name text not null, email text, phone text, document_last4 varchar(4));
create table unit_occupancies (id uuid primary key default gen_random_uuid(), unit_id uuid not null references units(id) on delete cascade, person_id uuid not null references people(id) on delete cascade, role text not null default 'resident', starts_on date not null, ends_on date);
create table tariffs (id uuid primary key default gen_random_uuid(), condominium_id uuid not null references condominiums(id) on delete cascade, utility text not null, price numeric(12,4) not null, valid_from date not null, valid_until date);
create table meters (id uuid primary key default gen_random_uuid(), unit_id uuid references units(id) on delete cascade, condominium_id uuid not null references condominiums(id) on delete cascade, utility text not null, identifier text, unique(unit_id, utility));
create table meter_readings (id uuid primary key default gen_random_uuid(), meter_id uuid not null references meters(id) on delete cascade, reading_date date not null, current_reading numeric(12,3) not null, previous_reading numeric(12,3), consumption numeric(12,3), tariff_id uuid references tariffs(id));
create table closings (id uuid primary key default gen_random_uuid(), condominium_id uuid not null references condominiums(id) on delete cascade, reference_month date not null, status text not null default 'open', closed_at timestamptz, unique(condominium_id, reference_month));
create table common_expenses (id uuid primary key default gen_random_uuid(), closing_id uuid not null references closings(id) on delete cascade, category text not null, description text not null, amount numeric(12,2) not null check (amount >= 0), due_date date, paid_at date);
create table unit_charges (id uuid primary key default gen_random_uuid(), closing_id uuid not null references closings(id) on delete cascade, unit_id uuid not null references units(id), description text not null, amount numeric(12,2) not null check (amount >= 0), paid_at date);

create table occurrences (id uuid primary key default gen_random_uuid(), condominium_id uuid not null references condominiums(id) on delete cascade, unit_id uuid references units(id), title text not null, description text, status text not null default 'open', created_at timestamptz not null default now());
create table notices (id uuid primary key default gen_random_uuid(), condominium_id uuid not null references condominiums(id) on delete cascade, title text not null, body text not null, published_at timestamptz, expires_at timestamptz);
create table documents (id uuid primary key default gen_random_uuid(), condominium_id uuid not null references condominiums(id) on delete cascade, title text not null, file_url text not null, document_type text, created_at timestamptz not null default now());
create table preventive_maintenance (id uuid primary key default gen_random_uuid(), condominium_id uuid not null references condominiums(id) on delete cascade, title text not null, asset text, next_due_on date, status text not null default 'scheduled');

create index idx_units_block on units(block_id);
create index idx_readings_meter_date on meter_readings(meter_id, reading_date desc);
create index idx_expenses_closing on common_expenses(closing_id);
create index idx_charges_closing_unit on unit_charges(closing_id, unit_id);
