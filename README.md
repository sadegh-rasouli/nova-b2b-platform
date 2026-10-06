# NOVA — Advanced B2B Industrial Materials & Polymer Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Express%20%7C%20MongoDB-emerald)](https://github.com)
[![Status](https://img.shields.io/badge/Production%20Ready-Verified-green.svg)](https://github.com)

> **NOVA** is an enterprise-grade digital platform engineered for high-performance polymer compounding, technical plastics distribution, and B2B industrial procurement. Built with modern full-stack web standards, reactive data flows, and secure role-based control systems.

---

## 1. Overview

NOVA bridges the gap between complex chemical/industrial engineering data and modern digital commerce. The platform provides industrial manufacturers, automotive tiers, electronics OEMs, and packaging converters with direct access to technical polymer specifications, automated Request for Quotation (RFQ) workflows, knowledge base articles, industrial case studies, and a comprehensive administrative management center.

> **Portfolio & Demonstration Transparency Notice**:  
> NOVA is engineered as a demonstration and portfolio showcase platform. All company operational metrics, client case studies, customer reviews, ISO/IATF compliance references, and chemical specifications are sample/illustrative demonstration data.

---

## 2. Key Features

### 🏢 Corporate & Industrial Showcase
* **Modern Industrial Design System**: High-contrast, dark-mode-first aesthetic with aerospace/materials-grade accents (`#0f172a`, `#1e293b`, `#38bdf8`).
* **Interactive Capabilities Matrix**: Visualized technical consultation, formulation engineering, laboratory testing, and global logistics workflows.

### 🧪 Technical Product Catalog & Spec Engine
* **Multifaceted Filtering**: Filter polymers by polymer family (PA66, PBT, POM, PC, PEEK, TPU), application industry (Automotive, E&E, Medical, Industrial), processing method (Injection, Extrusion), and UL94 flame ratings.
* **Technical Data Sheets (TDS)**: Interactive mechanical, thermal, electrical, and flammability property breakdowns with standard ASTM/ISO testing metrics.
* **Direct RFQ Integration**: Seamlessly pre-fill RFQ forms with selected polymer grades and quantity units.

### 📋 B2B RFQ & Ingestion Engine
* **Multi-Step Structured Quotation**: Captures industrial requirements including quantity (kg, tons, container loads), Incoterms (FOB, CIF, EXW, DDP), delivery timelines, and custom technical requirements.
* **Auto-Generated RFQ Tracking Codes**: Generates verifiable alphanumeric codes (`RFQ-YYYYMM-XXXX`) for order lifecycle tracking.
* **Inquiry Ingestion**: Dedicated endpoints for technical inquiries, sample requests, and regulatory compliance queries.

### 📚 Knowledge Hub & Case Studies
* **Technical Insights**: Technical polymer articles, processing troubleshooting guides, and market trends.
* **Engineering Case Studies**: Deep-dives into lightweighting, flame-retardant formulation, and metal-to-plastic conversions.

### 🛡️ Enterprise Admin Control Center
* **Role-Based Management**: Granular permissions (`admin`, `editor`, `viewer`) for managing products, RFQs, contact submissions, knowledge base articles, and platform users.
* **Status Workflow Automation**: Update quotation lifecycle stages (`pending`, `under_review`, `quoted`, `approved`, `rejected`, `archived`) with internal notes.
* **Security & Session Management**: Auto-logout on token expiration, authenticated routes with server-side validation, and instant delete confirmations.

---

## 3. Tech Stack

### Frontend
* **Core Framework**: [React 18](https://react.dev/) + [Vite 5](https://vitejs.dev/)
* **Routing**: [React Router 6](https://reactrouter.com/) (Data routes, lazy-loaded chunks)
* **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) + PostCSS + Custom Design Tokens
* **Icons & Visuals**: [Lucide React](https://lucide.dev/)
* **HTTP Client**: [Axios](https://axios-http.com/) (Centralized interceptors, auth headers, unified error handling)

### Backend & Database
* **Runtime**: [Node.js](https://nodejs.org/) (ES Modules)
* **API Framework**: [Express 4](https://expressjs.com/)
* **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose 8 ODM](https://mongoosejs.com/)
* **Security & Auth**: [JSON Web Tokens (JWT)](https://jwt.io/) + [bcryptjs](https://github.com/dcodeIO/bcrypt.js)
* **Hardening**: [Helmet](https://helmetjs.github.io/) + Sliding-window Memory Rate Limiters + Custom Sanitization

---

## 4. Architecture

```
nova-b2b-platform/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/                 # Static assets (robots.txt, sitemap.xml, favicon)
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── admin/          # Admin layout, sidebar, modal, protected routes
│       │   ├── common/         # ErrorBoundary, SEO, Navbar, Footer, Buttons, Cards
│       │   └── forms/          # Form inputs, selectors, validation feedback
│       ├── context/            # AuthContext (JWT state, session persistence)
│       ├── layouts/            # PublicLayout & AdminLayout wrappers
│       ├── pages/              # Public & Admin route components (Lazy-loaded)
│       ├── services/           # Axios API services (products, quotes, auth, etc.)
│       └── utils/              # Formatters, validation, constant helpers
│
├── server/                     # REST API Application (Node.js + Express)
│   ├── config/                 # MongoDB database connection (db.js)
│   ├── controllers/            # Request handlers (auth, product, quote, contact, etc.)
│   ├── middleware/             # authMiddleware, errorMiddleware, rateLimitMiddleware
│   ├── models/                 # Mongoose schemas (User, Product, QuoteRequest, etc.)
│   ├── routes/                 # API endpoint routers (/api/products, /api/auth, etc.)
│   ├── seeder/                 # Demo data seeders (products, articles, case studies)
│   └── server.js               # Express application entrypoint & middleware stack
│
└── docs/                       # Technical Engineering Documentation
    ├── ARCHITECTURE.md         # Full system topologies & data workflows
    ├── SECURITY.md             # Security architecture, RBAC, and threat mitigation
    └── DEPLOYMENT.md           # Production deployment, Nginx configs, and systemd setup
```

---

## 5. Security & Server Hardening

* **Password Hashing**: 12-round salted `bcryptjs` hashing. Password hashes use `select: false` at the schema level to guarantee zero leakage in queries.
* **Stateless JWT Authentication**: Signed tokens verified exclusively through server-side secret keys with strict expiration windows.
* **Server-Side Authorization**: Multi-layered middleware (`protect`, `adminOnly`, `authorizeRoles`) ensures non-admin users cannot trigger data mutations.
* **Rate Limiting Throttling**: Sliding-window rate limiters prevent brute-force attacks on `/api/auth/login` (5 req/15m) and spam submissions on `/api/quotes` and `/api/contact` (10 req/hour).
* **HTTP Security Headers**: Express server hardened with `Helmet` (CSP, X-Content-Type-Options, Frameguard, Referrer-Policy).
* **Input Sanitization & Schema Validation**: Strict Mongoose schema boundaries, email format normalization, numeric bounds checking, and enum constraints.
* **Zero Stack Trace Leakage**: Centralized error handling returns structured RFC-compliant JSON responses while sanitizing internal database internals in production (`NODE_ENV === 'production'`).

---

## 6. SEO, Performance & Accessibility

* **Dynamic SEO Engine (`useSEO`)**: Automatic title generation, canonical link injection, OpenGraph image tags, Twitter Summary Cards, and robots directives (`noindex, nofollow` on `/admin/*`).
* **Structured Data (JSON-LD)**: Schema.org `Organization`, `WebSite`, `Product`, and `Article` semantic payloads.
* **Code Splitting & Bundle Optimization**: All routes lazy-loaded via `React.lazy()` and `Suspense`. Vendor chunks split cleanly in Vite configuration, resulting in an initial JS bundle of ~102 KB.
* **WCAG 2.2 AA Accessibility**: Full keyboard navigability, semantic heading trees (`<h1>` through `<h3>`), visible high-contrast focus rings, `aria-labelledby` modal bindings, and `@media (prefers-reduced-motion)` support.

---

## 7. Platform Routes

### Public Routes
| Route | Purpose | Access |
|---|---|---|
| `/` | Corporate Homepage & Capabilities Showcase | Public |
| `/products` | Industrial Polymer Catalog with Faceted Search | Public |
| `/products/:slug` | Interactive Technical Data Sheet (TDS) | Public |
| `/quote` | Multi-step B2B Request for Quotation (RFQ) | Public |
| `/contact` | Corporate Ingestion & Inquiries Portal | Public |
| `/about` | Technical Capabilities & Processing Overview | Public |
| `/knowledge` | Materials Knowledge Base & Processing Guides | Public |
| `/knowledge/:slug` | Technical Engineering Article | Public |
| `/case-studies` | Industrial OEM & Converter Case Studies | Public |
| `/case-studies/:slug` | Case Study Technical Deep-Dive | Public |
| `*` | Custom 404 Error Handler with Recovery Action | Public |

### Admin Control Center Routes
| Route | Purpose | Access |
|---|---|---|
| `/admin/login` | Secure JWT Authentication Portal | Public |
| `/admin` | Metrics Dashboard & Recent Activity | Protected (`Admin`, `Editor`, `Viewer`) |
| `/admin/products` | Polymer Catalog CRUD & TDS Specifications | Protected (`Admin`, `Editor`) |
| `/admin/rfqs` | RFQ Ingestion, Status Workflow & Notes | Protected (`Admin`, `Editor`) |
| `/admin/contacts` | Inquiry Inbox & Status Management | Protected (`Admin`, `Editor`) |
| `/admin/articles` | Knowledge Hub Content Management | Protected (`Admin`, `Editor`) |
| `/admin/case-studies` | Case Study Management | Protected (`Admin`, `Editor`) |
| `/admin/users` | User Administration & Role Assignments | Protected (`Admin` Only) |

---

## 8. API Overview

| Endpoint Group | Base Route | Key Operations |
|---|---|---|
| **Authentication** | `/api/auth` | `POST /login`, `GET /me`, `POST /logout` |
| **Products** | `/api/products` | `GET /` (Filtered search), `GET /:slug`, `POST /`, `PUT /:id`, `DELETE /:id` |
| **Quotations (RFQ)** | `/api/quotes` | `POST /` (Submit RFQ), `GET /` (List), `GET /:id`, `PATCH /:id/status` |
| **Contact Inquiries**| `/api/contact` | `POST /` (Submit Inquiry), `GET /` (List), `PATCH /:id/status` |
| **Articles** | `/api/articles` | `GET /` (Published), `GET /:slug`, `POST /`, `PUT /:id`, `DELETE /:id` |
| **Case Studies** | `/api/projects` | `GET /` (Published), `GET /:slug`, `POST /`, `PUT /:id`, `DELETE /:id` |
| **Users** | `/api/users` | `GET /`, `POST /`, `PUT /:id`, `DELETE /:id` |
| **Health Check** | `/api/health` | `GET /` (Server status, timestamp, uptime) |

---

## 9. Installation & Local Setup

### Prerequisites
* **Node.js**: v18.0.0 or higher
* **npm**: v9.0.0 or higher
* **MongoDB**: Local instance (`mongodb://localhost:27017/nova`) or MongoDB Atlas URI

### 1. Clone Repository & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/sadegh-rasouli/nova-b2b-platform.git
cd nova-b2b-platform

# Install root, client, and server dependencies
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` in the root directory to your local `.env`:
```bash
cp .env.example .env
```
Fill in the parameters with your local configuration:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/nova-b2b
JWT_SECRET=your_super_secret_key_minimum_32_characters
JWT_EXPIRES_IN=7d
ADMIN_NAME=Demo Administrator
ADMIN_EMAIL=admin@nova-materials.demo
ADMIN_PASSWORD=YourSecureLocalPassword123!
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Seed Database with Industrial Demonstration Data
Populate MongoDB with demonstration polymer grades, articles, case studies, and the initial administrator account:
```bash
# From the project root:
npm run seed

# To wipe and re-seed clean data:
npm run seed --workspace=server -- -d
npm run seed
```

> **Admin Credentials**: Use the credentials configured in your `.env` file during seeding to log into the Admin Control Center at `/admin/login`.

### 4. Start Development Servers
```bash
# Run both Backend API (port 5000) and Frontend Vite (port 5173) concurrently:
npm run dev:all

# Alternatively, run them in separate terminals:
npm run dev:server   # Starts backend with nodemon
npm run dev:client   # Starts Vite dev server
```

---

## 10. Production Build & Verification

```bash
# 1. Build optimized frontend bundle
npm run build:client

# 2. Start production backend server
npm run start:server
```

---

## 11. Engineering Documentation

For deep technical insights, review the documentation files in the [`docs/`](./docs) directory:
* 📄 [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — Comprehensive system architecture, module boundaries, data models, and sequence diagrams.
* 🛡️ [`docs/SECURITY.md`](./docs/SECURITY.md) — Complete security controls, RBAC matrices, authentication mechanisms, and server hardening specifications.
* 🚀 [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — Production deployment runbook, Nginx reverse proxy configuration, systemd service management, and TLS guidance.

---

## 12. Portfolio Attribution

**Designed & Developed by Mohammad Sadegh Rasouli**  
*Enterprise Full-Stack Web Development & Industrial Software Engineering*

---
*License: MIT — Free for educational, evaluation, and portfolio demonstration purposes.*
