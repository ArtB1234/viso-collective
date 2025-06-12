# VISO Collective

A full-stack web application for photographers to connect, share, and grow — with data managed in Airtable.

This is a [Next.js](https://nextjs.org) project using TailwindCSS and Shadcn UI components.

## Getting Started

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# OAuth Providers (add as needed)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Airtable
AIRTABLE_API_KEY=your_airtable_api_key
AIRTABLE_BASE_ID=your_airtable_base_id
```

### Development Server

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Features

### Milestone 1 (Community Interface + Auth)

- **Authentication**: Email/OAuth login via NextAuth.js
- **Members Directory**: Profile cards with social handles, skills, and interests
- **Post Wall**: Kanban-style view of posts by category
- **Events Calendar**: Monthly calendar view of upcoming events
- **Event Detail Pages**: Individual event views with RSVP link
- **About Page**: Static content introducing the collective
- **User Context**: Show member name when logged in

### Airtable Integration

- Read from Airtable: Members, Posts, Events tables
- Secure API key storage
- SSR/ISR for performance

## Project Structure

```
/viso-collective
  /app
    /api
      /auth
      /airtable
    /auth
      /signin
    /members
    /posts
    /events
    /about
  /components
    /auth
    /layout
    /members
    /posts
    /events
    /ui
  /lib
    /auth
    /airtable
    /utils
```

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Shadcn UI Components](https://ui.shadcn.com/)
- [Airtable API Documentation](https://airtable.com/developers/web/api/introduction)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
