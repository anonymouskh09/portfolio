# Mazhar Rehman — Portfolio

Premium, animated personal portfolio built with **Next.js**, **Tailwind CSS**, **Framer Motion**, **GSAP ScrollTrigger**, **Lenis**, and **React Three Fiber**.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Framer Motion
- GSAP + ScrollTrigger
- Lenis smooth scroll
- Three.js / React Three Fiber

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Contact form (Hostinger Titan email)

Create `.env.local` in the project root:

```env
SMTP_HOST=smtp.titan.email
SMTP_PORT=465
SMTP_USER=mazhar@lancerstech.com
SMTP_PASSWORD=your_titan_email_password
SMTP_FROM=mazhar@lancerstech.com
CONTACT_TO=mazhar@lancerstech.com
```

**Password kahan se milega:** Hostinger → **Emails** → `mazhar@lancerstech.com` → **Connect apps** / **Configure** → SMTP password (apna email login password).

Restart dev server after saving: `npm run dev`

**Production (Vercel/Hostinger):** same variables in hosting dashboard Environment Variables.

## Customization

- **Content**: Edit `src/lib/data.ts`
- **CV download**: `public/Mazhar_Rehman_CV.pdf` (linked from Hero)
- **Colors & theme**: `src/app/globals.css`

## Features

- Full-screen scroll-snap sections with cinematic left/right transitions
- Animated loading screen
- 3D hero scene (desktop) with lazy loading
- Glassmorphism UI, particle background, cyber grid
- Filterable project showcase
- GSAP timeline & scroll animations
- SEO metadata in `src/app/layout.tsx`
- Mobile-optimized (reduced 3D on small screens)
