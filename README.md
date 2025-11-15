# 🚀 TalentMesh — Modern Freelance Marketplace Backend

TalentMesh is a fully featured **freelance marketplace backend** built using **TypeScript**, **Express**, **MVC architecture**, **Drizzle ORM**, **PostgreSQL**, **Razorpay Payments**, and **Jest testing**. It provides a scalable foundation for building platforms similar to Upwork, Freelancer, and Fiverr.

---

## 🌟 Key Features

### 🔐 Authentication & User System

- JWT-based authentication (login, register, session)
- User roles: **Client**, **Freelancer**, **Admin**
- Free users receive **10 free bids** on signup
- Paid bid credits system

### 🧱 MVC Architecture (Clean & Scalable)

- Controllers, Services, Routes, Models, Middlewares
- Separation of concerns
- Easy to extend for large production apps

### 💼 Job System

- Create & manage jobs (Client)
- List/filter/search jobs
- Freelancers can place bids
- Automatic deduction of free bids or paid credits
- Client can close jobs and accept bids

### 💳 Razorpay Payment Integration

- Create Razorpay orders
- Secure signature verification
- Add credits to user wallet after payment success

### 🗄 Database (Drizzle ORM + PostgreSQL)

- Modern Typesafe ORM
- Schema-first approach
- Transaction support (safe bid-credit management)

### 🧪 Testing Suite (Jest + Supertest)

- Auth tests
- Job tests
- Payment tests
- Environment-isolated test setup

### 🐳 Docker Support

- Dockerfile + Docker Compose
- Local development environment with PostgreSQL

---

## 📁 Project Structure

```
TalentMesh/
├─ src/
│  ├─ controllers/
│  ├─ routes/
│  ├─ services/
│  ├─ models/
│  ├─ middlewares/
│  ├─ utils/
│  ├─ app.ts
│  └─ server.ts
├─ tests/
│  ├─ auth.test.ts
│  ├─ jobs.test.ts
│  ├─ payments.test.ts
│  └─ setup.ts
├─ drizzle/
├─ docker-compose.yml
├─ Dockerfile
├─ tsconfig.json
├─ package.json
└─ README.md
```

---

## 🛠️ Installation & Setup

### **1. Clone the Repository**

```bash
git clone https://github.com/ankurghosh7/TalentMesh.git
cd TalentMesh
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Configure Environment Variables**

Copy and edit:

```bash
cp .env.example .env
```

Required:

```
DATABASE_URL=
JWT_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
PORT=4000
```

### **4. Start PostgreSQL + App using Docker Compose**

```bash
docker-compose up --build
```

### **5. Run Development Server**

```bash
npm run dev
```

---

## 🧪 Testing

Run tests using Jest:

```bash
npm test
```

All API tests run using Supertest without needing external services.

---

## 💳 Payment Integration (Razorpay)

TalentMesh uses Razorpay to sell **bid credits** to freelancers.

Flow:

1. Create an order → `/payments/create-order`
2. Complete payment on client side
3. Verify signature → `/payments/verify`
4. On success, credits are added to user wallet

---

## 🛣 API Overview

### **Auth**

```
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me
```

### **Jobs**

```
GET  /api/jobs
POST /api/jobs
GET  /api/jobs/:id
POST /api/jobs/:id/bid
POST /api/jobs/:id/close
```

### **Payments**

```
POST /api/payments/create-order
POST /api/payments/verify
```

## 📄 License

Choose a license that fits your goals:

- **MIT** (recommended: permissive & widely used)
- Apache 2.0
- GPLv3

**TalentMesh — Powering the next-generation freelance marketplace platforms.**
