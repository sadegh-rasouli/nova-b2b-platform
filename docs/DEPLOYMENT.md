# NOVA B2B Platform — Deployment & Operations Guide

This guide details the prerequisites, environment setup, database seeding, build execution, and production runtime steps for deploying the NOVA platform.

---

## 1. Prerequisites

* **Node.js**: v18.x or v20.x+ LTS
* **NPM**: v9.x+ (Supports npm workspaces)
* **MongoDB**: v6.0+ (Local instance or MongoDB Atlas cluster)

---

## 2. Environment Variables Configuration

Create a `.env` file in the project root by copying `.env.example`:

```bash
cp .env.example .env
```

Configure the following parameters:

```ini
# Backend Configuration
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-domain.com

# Database Connection
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nova_b2b?retryWrites=true&w=majority

# Security (Generate a 64-character random string)
JWT_SECRET=your_super_secret_production_jwt_key_here
JWT_EXPIRES_IN=7d

# Initial Admin Seeding Configuration
ADMIN_NAME=System Administrator
ADMIN_EMAIL=admin@nova-materials.com
ADMIN_PASSWORD=YourSecureAdminPassword123!

# Frontend Client Base URL
VITE_API_BASE_URL=https://your-domain.com/api
```

---

## 3. Installation & Database Seeding

1. **Install all workspace dependencies**:
   ```bash
   npm install
   ```

2. **Seed realistic industrial dataset** (Products, Articles, Case Studies, Admin Account):
   ```bash
   npm run seed
   ```

---

## 4. Production Build & Execution

1. **Build the optimized frontend bundle**:
   ```bash
   npm run build:client
   ```
   *Output is generated in `client/dist/` with code-split chunks and gzip-compressed assets.*

2. **Start the Express API Server**:
   ```bash
   npm run start:server
   ```

---

## 5. Reverse Proxy Configuration (Nginx Example)

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # Serve Vite SPA static build
    root /var/www/nova-b2b-platform/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy REST API requests
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
