# Security inspection of an AI-built app

A before-and-after case study of the five most common security problems in apps generated with AI app builders (Lovable, Bolt, Replit, v0) on Supabase, and how each one is fixed:

1. Row Level Security disabled on a table with private data
2. Service role key shipped to the browser
3. Users able to edit their own role
4. Payment webhook without signature verification
5. Prices taken from the browser

The page (`index.html`) has a switch to compare the code before and after the review, plus a 10-point checklist founders can run on their own app.

Ledgerly is a demo app made for this case study; no real customer data was involved.

**Author:** Lautaro Delgado, full-stack developer (Supabase) — [Upwork profile](https://www.upwork.com/freelancers/~0187eeb5cc23b91d3d)
