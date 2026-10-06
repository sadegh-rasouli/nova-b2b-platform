# NOVA B2B Platform — Security & Threat Modeling Audit

This document outlines the security controls, authentication mechanisms, input sanitization protocols, and defense-in-depth measures implemented across the NOVA platform.

---

## 1. Authentication & Session Security

| Security Control | Implementation | Verification Status |
| :--- | :--- | :--- |
| **Password Hashing** | One-way salt hashing using `bcryptjs` (Cost factor 10) | Verified in User `pre('save')` |
| **Password Redaction** | `select: false` on Mongoose `password` field | Verified (password never leaked in queries) |
| **JWT Token Generation** | Cryptographically signed using `jsonwebtoken` | Verified (`JWT_SECRET` strictly from env) |
| **Token Expiration** | Enforced 7-day expiration lifespan | Verified |
| **Client Session Clearing** | Automatic removal of invalid/expired tokens on HTTP 401 | Verified in Axios response interceptor |

---

## 2. Server-Side Authorization & RBAC

* **Authoritative Protection**: All administrative endpoints (`/api/admin/*`) strictly require valid Bearer token credentials and administrator roles (`admin` or `superadmin`).
* **Route Guards Are UX Only**: Frontend `ProtectedRoute` merely optimizes user navigation; server-side `protect` and `adminOnly` middlewares reject any unauthorized or non-admin API requests with `401 Unauthorized` or `403 Forbidden`.
* **Self-Deletion Prevention**: Admin user deletion endpoint forbids administrators from deleting their own active session account.

---

## 3. Rate Limiting & Anti-Spam Throttling

A sliding-window in-memory rate limiter is enforced on all public and authentication submission endpoints:
* **Login Endpoint** (`POST /api/auth/login`): Maximum 10 attempts per 15 minutes per IP to prevent brute-force attacks.
* **RFQ Endpoint** (`POST /api/quotes`): Maximum 10 submissions per 15 minutes per IP to mitigate quote spam.
* **Contact Endpoint** (`POST /api/contact`): Maximum 10 inquiries per 15 minutes per IP.

---

## 4. Input Validation & Injection Mitigation

* **NoSQL Injection Defense**: Strict Mongoose schema casting, field whitelisting in controllers, and parameterized queries. User-supplied query parameters are strictly matched against regex objects or enumerated strings.
* **XSS Defense**: No raw `dangerouslySetInnerHTML` on user input; markdown rendering in technical articles parses structured AST blocks (headings, paragraphs, blockquotes, lists) into safe React elements.
* **Data Normalization**: Automatic string trimming (`trim: true`) and email lowercasing (`lowercase: true`) across all schemas.

---

## 5. HTTP Security Headers

Express leverages `helmet` to automatically enforce standard HTTP security headers:
* `X-Content-Type-Options: nosniff`
* `X-Frame-Options: SAMEORIGIN`
* `Referrer-Policy: no-referrer`
* `Strict-Transport-Security` (Production HTTPS)

---

## 6. Environment & Secret Hygiene

* No secret tokens, credentials, or private keys are stored in Git version control.
* `.gitignore` explicitly excludes `.env`, `.env.*`, `dist/`, and local caches.
* `.env.example` provides template keys with empty placeholder values.
