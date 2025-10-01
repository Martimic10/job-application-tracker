# Job Application Tracker

A full-stack web application for tracking job applications, built with Next.js, TypeScript, and Supabase.

## Features

- **User Authentication** - Secure signup/login with Supabase Auth
- **Add Applications** - Track company name, job title, application date, and notes
- **Status Management** - Update application status (Applied, Interview, Offer, Rejected)
- **Private Data** - Row-level security ensures users only see their own applications
- **Responsive Design** - Clean, modern UI built with Tailwind CSS

## Tech Stack

- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend:** Next.js API Routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Martimic10/job-application-tracker.git
cd job-application-tracker

Install Dependencies:
npm install

Setup environment variables: Create a .env.local file in the root directory:
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

Run the Dev Server:
npm run dev
Open http://localhost:3000 in your browser

Database setup - Run this SQL in your supabase SQL Editor to create the jobs table:
-- Create the jobs table
CREATE TABLE jobs (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  job_title TEXT NOT NULL,
  date_applied DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'Applied',
  url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own jobs"
ON jobs FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own jobs"
ON jobs FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs"
ON jobs FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs"
ON jobs FOR DELETE USING (auth.uid() = user_id);

-- Create index
CREATE INDEX jobs_user_id_idx ON jobs(user_id);

Project Structure:
├── src/
│   ├── app/
│   │   ├── dashboard/      # Main dashboard page
│   │   ├── login/          # Login page
│   │   └── signup/         # Signup page
│   ├── components/
│   │   ├── AddJobForm.tsx  # Form for adding job applications
│   │   └── JobList.tsx     # Table displaying job applications
│   └── lib/
│       └── supabase.ts     # Supabase client configuration
└── README.md

Future Enhancements

Filter applications by status
Search functionality
Application statistics dashboard
Export data to CSV
Email notifications for follow-ups

License
MIT

Author Michael Martinez - GitHub
