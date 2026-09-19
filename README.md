# Prisma CRUD — Next.js + MongoDB

A learning project demonstrating CRUD operations, and 1-to-1 / 1-to-many relationships, using **Prisma ORM** with **MongoDB**, exposed through **Next.js App Router** serverless API routes.

## Tech Stack

- **Next.js** (App Router) — serverless API routes
- **Prisma ORM** — database toolkit and query builder
- **MongoDB** (Atlas) — database
- **TypeScript**
- **pnpm** — package manager

## Data Model

- **User** — base entity, has one `Kyc` record and many `Post` records
- **Kyc** — 1-to-1 with `User` (enforced via a `@unique` foreign key), holds identity/verification data (BVN, status)
- **Post** — 1-to-many with `User` (one user can author many posts)

## Getting Started

### 1. Clone and install

```bash
git clone (https://github.com/VeekAustin/prismaCrud)
cd prisma-crud
pnpm install
```

### 2. Approve build scripts (pnpm-specific)

pnpm blocks postinstall scripts by default. Run:

```bash
pnpm approve-builds
```

Select all packages (press `a`, then Enter) to allow Prisma's engine binaries to build correctly.

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority"
```

- Use your MongoDB Atlas **Database User** credentials (Database Access tab), not your Atlas login
- Make sure the database name is included in the path (between `.mongodb.net/` and `?`)
- URL-encode any special characters in your password (`@` → `%40`, etc.)

### 4. Push the schema and generate the client

```bash
pnpm prisma db push
pnpm prisma generate
```

### 5. Run the dev server

```bash
pnpm dev
```

App runs at `http://localhost:3000`.

## API Endpoints

All routes accept/return JSON. Update and delete operations take `id` in the **request body**, not the URL.

### Users — `/api/users`
| Method | Description | Body |
|---|---|---|
| `GET` | List all users (with related posts) | — |
| `POST` | Create a user | `{ name, email, ... }` |
| `PUT` | Update a user | `{ id, ...fieldsToUpdate }` |
| `DELETE` | Delete a user | `{ id }` |

### Posts — `/api/posts`
| Method | Description | Body |
|---|---|---|
| `GET` | List all posts (with author) | — |
| `POST` | Create a post | `{ title, content, authorId }` |
| `PUT` | Update a post | `{ id, ...fieldsToUpdate }` |
| `DELETE` | Delete a post | `{ id }` |

### Kyc — `/api/kyc`
| Method | Description | Body |
|---|---|---|
| `GET` | List all Kyc records (with user) | — |
| `POST` | Create a Kyc record | `{ bvn, status, userId }` |
| `PUT` | Update a Kyc record | `{ id, ...fieldsToUpdate }` |
| `DELETE` | Delete a Kyc record | `{ id }` |

## Notes on MongoDB + Prisma

- Every model requires exactly one `@id` field, mapped to `_id`, typed `@db.ObjectId`
- `BigInt` is not supported on MongoDB — use `Int`, `Float`, or `String` instead
- No `migrate dev` on MongoDB (schemaless) — use `db push` to sync schema changes
- 1-to-1 vs 1-to-many is controlled by whether the foreign key field has `@unique`

## What This Project Demonstrates

- Setting up Prisma with MongoDB from scratch
- Modeling 1-to-1 and 1-to-many relationships in a schema
- Building CRUD serverless functions with Next.js Route Handlers
- Handling Prisma-specific errors (e.g. unique constraint violations, `P2002`)