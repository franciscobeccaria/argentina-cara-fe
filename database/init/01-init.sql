-- Initial database setup
-- This script runs automatically when the PostgreSQL container starts

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create schemas
CREATE SCHEMA IF NOT EXISTS public;

-- Set timezone
SET timezone = 'UTC';