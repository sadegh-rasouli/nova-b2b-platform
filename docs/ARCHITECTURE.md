# NOVA B2B Platform — Architecture & Engineering Specification

This document details the system design, frontend and backend topology, data flow protocols, and modular component hierarchy of the **NOVA** enterprise industrial materials commerce platform.

---

## 1. System Topology Overview

```
+-------------------------------------------------------------------------------+
|                             CLIENT APPLICATION                                |
|              React 18 (Vite SPA) + Tailwind CSS + Lucide Icons                |
|                                                                               |
|   +-------------------+  +-------------------+  +--------------------------+  |
|   |   Public Router   |  |   Protected Auth  |  |      Admin Portal        |  |
|   |   - Catalog / TDS |  |   - AuthContext   |  |      - Dashboard Stats   |  |
|   |   - RFQ Engine    |  |   - JWT Storage   |  |      - Material CRUD     |  |
|   |   - Knowledge Hub |  |   - Route Guard   |  |      - RFQ Pipeline      |  |
|   |   - Case Studies  |  |   - Auto Refresh  |  |      - Inquiries / RBAC  |  |
|   +-------------------+  +-------------------+  +--------------------------+  |
|                                     |                                         |
|                   Axios Service Layer (api.js Interceptor)                    |
|                        - Bearer Token Auto-Injection                          |
|                        - 401 Session Interception                             |
+-------------------------------------+-----------------------------------------+
                                      | HTTP REST / JSON (CORS + Helmet)
+-------------------------------------v-----------------------------------------+
|                               EXPRESS REST API                                |
|                                                                               |
|   +--------------------+  +--------------------+  +-----------------------+   |
|   |  Public Routes     |  |  Admin Protection  |  |  Security Middleware  |   |
|   |  - /api/products   |  |  - protect (JWT)   |  |  - Helmet Headers     |   |
|   |  - /api/quotes     |  |  - adminOnly (RBAC)|  |  - Sliding Rate Limit |   |
|   |  - /api/contact    |  |  - /api/admin/*    |  |  - Mongoose Validator |   |
|   |  - /api/insights   |  |                    |  |  - Global Error Catch |   |
|   +--------------------+  +--------------------+  +-----------------------+   |
+-------------------------------------+-----------------------------------------+
                                      | Mongoose ODM (BSON)
+-------------------------------------v-----------------------------------------+
|                               MONGODB DATABASE                                |
|                                                                               |
|   - Users (Admins, RBAC, Bcrypt Passwords)                                    |
|   - Products (TDS Specs, Polymer Grades, ISO Certifications)                  |
|   - QuoteRequests (RFQs, Unique Serial Numbers, Status Pipeline)              |
|   - ContactMessages (Technical Inquiries, Read/Unread State)                  |
|   - BlogPosts (Whitepapers, Markdown Content, Author Data)                    |
|   - Projects (Industrial Case Studies, Benchmark Metrics)                     |
+-------------------------------------------------------------------------------+
```

---

## 2. Frontend Architecture (`/client`)

* **Framework**: React 18.3.1 with Vite build engine.
* **Styling**: Tailwind CSS with custom industrial color tokens (`industrial-*`, `brand-*`) and accessible `:focus-visible` / `prefers-reduced-motion` compliance.
* **Code Splitting**: Dynamic route chunking using `React.lazy()` and `Suspense` fallback; manual Rollup chunking separating React runtime, icons, and network utilities.
* **Service Layer**: Dedicated services (`productService`, `quoteService`, `contactService`, `blogService`, `projectService`, `authService`, `adminService`) abstracting all HTTP calls away from React JSX components.
* **State Management**:
  - `AuthContext`: Manages admin user identity, token validation, and session restoration.
  - `ToastContext`: Universal notification dispatch queue for non-blocking UI feedback.
  - `useSEO`: Dynamic `<title>`, OpenGraph, canonical links, robots meta, and JSON-LD structured schemas.

---

## 3. Backend REST Architecture (`/server`)

* **Runtime**: Node.js + Express.js (ES Module syntax).
* **Database & ODM**: MongoDB with Mongoose Schema validation, indexes, and automated slug generation.
* **Security Middleware**:
  - `helmet`: Security HTTP headers.
  - `cors`: Strict origin validation against `CLIENT_URL`.
  - `rateLimitMiddleware`: In-memory sliding-window request throttling preventing brute force and spam.
  - `authMiddleware`: JWT token decoding and server-side RBAC validation (`protect`, `adminOnly`).
  - `errorMiddleware`: Centralized error shaping preventing stack trace leakage in production.

---

## 4. Primary Data Workflows

### A. RFQ Material Procurement Flow
1. Industrial buyer selects grade (or lands via `/quote?product=...&code=...`).
2. Structured form validates required procurement parameters (Quantity, Incoterms, Packaging, Processing method).
3. `POST /api/quotes` receives payload, applies rate limit throttling, validates fields, and generates a unique tracking serial (e.g. `RFQ-2026-XXXX`) in a `pre('save')` hook.
4. Response returns tracking number; UI renders confirmation modal.
5. Record enters the Admin RFQ Pipeline under status `new` for engineering review.

### B. Admin Control Center & Authentication Flow
1. Admin authenticates via `POST /api/auth/login` with email and password.
2. Server verifies password hash using `bcrypt.compare()`.
3. Server generates signed JWT token with user ID and 7-day expiration.
4. Client stores token and initializes `AuthContext`.
5. Axios interceptor attaches `Authorization: Bearer <token>` on all requests.
6. Server enforces dual authorization (`protect` + `adminOnly`) on every `/api/admin/*` mutation.
