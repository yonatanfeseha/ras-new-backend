# Gym Management Backend

REST API for the gym admin dashboard handles members, coaches, schedules, payments, and auth. Node/Express + MySQL.

Pairs with the [admin frontend](https://github.com/dawit-808/admin) — that repo has the UI, this one has the data and business logic.

## What it handles

- Auth with access/refresh tokens (refresh token rotated and stored per user, httpOnly cookie)
- Members, coaches, addresses, emergency contacts
- Schedules and training types, with coach assignment
- Payment verification (CBE / Telebirr) checks for duplicate receipts and prevents double-billing a member in the same cycle
- A cron job that flips membership status when a subscription lapses
- Basic stats endpoints for the dashboard (revenue, gender split, coach workload)

## Stack

Express 5, MySQL (mysql2), JWT, bcrypt, node-cron.

## Getting started

You'll need Node 18+ and a MySQL server running.

```bash
git clone https://github.com/yonatanfeseha/ras-new-backend.git
cd ras-new-backend
npm install
```

Create a `.env` in the root:

```
PORT=port
DB_HOST=host
DB_USER=user
DB_PASSWORD=123..
DB_NAME=ur-db-name
ACCESS_TOKEN_SECRET=some_long_random_string
REFRESH_TOKEN_SECRET=another_long_random_string
```

Run it:

```bash
npm run dev
```

## API

Routes are grouped under `/api`:

| Prefix | Handles |
|---|---|
| `/api/auth` | register, login, refresh, logout |
| `/api/members` | member CRUD, search, pagination |
| `/api/coaches` | coach CRUD |
| `/api/schedules` | class/session scheduling |
| `/api/training-types` | training type CRUD |
| `/api/member-service`, `/api/coach-service` | linking members/coaches to services |
| `/api/address`, `/api/emergency` | member address and emergency contact info |
| `/api/payments` | payment verification and history |
| `/api/stats` | dashboard stats |

Protected routes expect an `Authorization: Bearer <token>` header. The refresh token lives in an httpOnly cookie and is rotated on every `/api/auth/refresh` call.

## Scripts

- `npm run dev` — dev server with nodemon
- `npm start` — production start
- `npm run cron:update-memberships` — manually run the membership status cron

## Status

Currently used in production by Ras Hailu Gym for daily member management, payment tracking, and administrative operations.
