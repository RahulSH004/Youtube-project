# 📺 YT Project — Full-Stack Video Platform

A production-quality, YouTube-style video platform built as a learning and portfolio project. Covers the full stack from auth to media delivery, with real-time collaboration via a **Watch Party** system.

---

## 🧱 Tech Stack

### Backend
| Layer | Technology |
|---|---|
| Runtime | Node.js / Bun |
| Framework | Express 5 |
| ORM | Prisma |
| Database | PostgreSQL |
| Validation | Zod |
| Auth | JWT (HS256) + httpOnly Cookies |
| Password Hashing | bcrypt |
| Media | Cloudinary (signed URL upload) |
| Language | TypeScript |

### Frontend
| Layer | Technology |
|---|---|
| Framework | React + Vite |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Routing | React Router v6 |
| HTTP Client | Axios |

---

## 📁 Project Structure

```
yt-project/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma         # DB schema: User, Upload, Like, Subscription
│   ├── src/
│   │   ├── controllers/          # Route handlers (thin layer)
│   │   ├── services/             # Business logic
│   │   ├── middleware/           # Zod validation, auth guard, error handler
│   │   ├── routes/               # Express routers
│   │   └── index.ts              # App entry point
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── api/                  # Axios instance + endpoint functions
    │   ├── components/           # Reusable UI components
    │   ├── pages/                # Route-level page components
    │   ├── routes/               # createBrowserRouter config
    │   ├── store/                # Global state
    │   └── types/                # Shared TypeScript types
    └── vite.config.ts
```


## 🎬 Video Upload Flow

Uploads use a **signed URL architecture** — the server never acts as a file-transfer middleman.
I can't use Cloudflare bcz i don't have credit card lol :)


## 🎥 Watch Party System *(Planned Feature)*

Watch Party lets multiple authenticated users watch the same video in real-time with synchronized playback and live chat.


## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL running locally or Use cloud DB (Supabase or neon db)
- Cloudinary account

### Backend Setup

```bash
cd backend
cp .env.example .env
# Fill in: DATABASE_URL, JWT_SECRET, CLOUDINARY_* vars

bun install
bunx prisma migrate dev
bun run dev
```

### Frontend Setup

```bash
cd frontend
bun install
bun run dev
```

---

## 🔑 Environment Variables

```env
# Backend .env
DATABASE_URL=postgresql://user:password@localhost:5432/ytproject
JWT_SECRET=your_secret_here

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## Love you all <3