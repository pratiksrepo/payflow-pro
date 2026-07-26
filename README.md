# 🚀 PayFlow Pro

> A production-inspired **FinTech Payment Platform** built using **ASP.NET Core Microservices**, **React**, **RabbitMQ**, **PostgreSQL**, **Docker**, and **YARP API Gateway**.

![ASP.NET Core](https://img.shields.io/badge/ASP.NET%20Core-9.0-512BD4?logo=.net)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)
![RabbitMQ](https://img.shields.io/badge/RabbitMQ-Event--Driven-FF6600?logo=rabbitmq)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?logo=docker)
![YARP](https://img.shields.io/badge/API%20Gateway-YARP-512BD4)

---

# 📖 Overview

PayFlow Pro is a modern payment platform designed using a **Microservices Architecture**. The project demonstrates how enterprise-grade payment systems can be built using scalable backend services, asynchronous messaging, secure authentication, and a responsive React frontend.

The project was built as a portfolio application to gain hands-on experience with distributed systems, API Gateway patterns, event-driven architecture, Docker, and modern frontend development.

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- Refresh Token Support
- Role-Based Authorization
- Secure Login
- User Registration

---

## 💳 Payment Management

- Create Payments
- Payment History
- Payment Status Updates
- Transaction Tracking

---

## 💰 Wallet Management

- Wallet Creation
- Credit Wallet
- Debit Wallet
- Balance Tracking

---

## 🛡 Fraud Detection

- Risk Score Calculation
- Fraud Flagging
- High Risk Detection
- AI Ready Architecture

---

## 🔔 Notification Service

- Payment Notifications
- User Notifications
- Event Driven Processing

---

## 📊 Dashboard

- Payment Statistics
- Wallet Statistics
- Fraud Statistics
- Recent Transactions
- Admin Dashboard

---

## 📋 Audit Logs

- User Activity Tracking
- Request Logging
- Audit History

---

## ⚙ Infrastructure

- API Gateway (YARP)
- RabbitMQ Messaging
- Docker Support
- PostgreSQL
- Correlation IDs
- Structured Logging
- Global Exception Handling
- Health Checks

---

# 🏗 Architecture

```
                     React Frontend
                           │
                           ▼
                  API Gateway (YARP)
                           │
     ┌────────────┬─────────┼───────────┬────────────┐
     ▼            ▼         ▼           ▼            ▼
 Auth Service  Payment   Wallet      Fraud    Notification
                Service   Service    Service      Service
                    │
                    ▼
               RabbitMQ Events
                    │
                    ▼
                PostgreSQL
```

---

# 🛠 Technology Stack

## Backend

- ASP.NET Core 9
- Entity Framework Core
- PostgreSQL
- RabbitMQ
- JWT Authentication
- YARP Reverse Proxy
- Docker
- REST APIs

---

## Frontend

- React 19
- TypeScript
- Material UI
- Axios
- React Router

---

## DevOps

- Docker
- Docker Compose
- Git
- GitHub

---

# 📂 Project Structure

```
PayFlow-Pro
│
├── backend
│   ├── PayFlow.ApiGateway
│   ├── PayFlow.AuthService
│   ├── PayFlow.PaymentService
│   ├── PayFlow.WalletService
│   ├── PayFlow.FraudService
│   ├── PayFlow.NotificationService
│   ├── PayFlow.SharedKernel
│   └── PayFlow.MessageBus
│
├── frontend
│   └── payflow-ui
│
├── docker-compose.yml
│
└── README.md
```

---

# 🔄 Microservice Communication

```
React
   │
   ▼
API Gateway
   │
   ▼
Payment Service
   │
   ├──────────────► Fraud Service
   │
   ├──────────────► Wallet Service
   │
   ▼
RabbitMQ
   │
   ▼
Notification Service
```

---

# 🚀 Running the Project

## Clone Repository

```bash
git clone https://github.com/pratiksrepo/payflow-pro.git
```

---

## Backend

```bash
docker compose up -d
```

Run all backend services.

---

## Frontend

```bash
cd frontend/payflow-ui

npm install

npm run dev
```

---

# 📡 API Gateway

All client requests pass through the API Gateway.

Example:

```
https://localhost:7056/api/auth/login

https://localhost:7056/api/payment

https://localhost:7056/api/wallet
```

---

# ❤️ Production Features

✔ JWT Authentication

✔ API Gateway

✔ RabbitMQ

✔ PostgreSQL

✔ Docker

✔ Health Checks

✔ Structured Logging

✔ Correlation IDs

✔ Global Exception Middleware

✔ REST Communication

✔ Microservices

---

# 📈 Future Improvements

- AI Fraud Detection
- Redis Caching
- Kubernetes Deployment
- CI/CD Pipeline
- Email Notifications
- Payment Analytics
- OpenTelemetry
- Distributed Tracing

---

# 📷 Screenshots

Screenshots will be added after deployment.

- Login
- Dashboard
- Payments
- Wallet
- Notifications
- Audit Logs

---

# 🌐 Live Demo

Frontend

```
Coming Soon
```

Backend

```
Coming Soon
```

---

# 👨‍💻 Developer

**Pratik**

Product Developer

ASP.NET Core | React | Microservices | RabbitMQ | PostgreSQL | Docker

GitHub:

https://github.com/pratiksrepo

---

# ⭐ If you found this project useful, please consider giving it a Star!
