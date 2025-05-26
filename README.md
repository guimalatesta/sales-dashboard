# Sales & Revenue Dashboard

Full-stack analytics dashboard for e-commerce insights with GraphQL API and React frontend.

## Features

✅ **Backend**

- GraphQL API with Node.js/Express/Apollo Server
- MongoDB Aggregation Pipelines
- Redis caching for analytics
- Paginated customer orders
- Order placement system

✅ **Frontend**

- Customer spending analytics
- Top products ranking
- Sales trends visualization
- Responsive UI with Chakra UI
- Error handling & loading states

## Tech Stack

🛠️ **Backend**  
![Node.js](https://img.shields.io/badge/Node.js-18-green)
![Apollo Server](https://img.shields.io/badge/Apollo_Server-3-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-7-orange)
![Redis](https://img.shields.io/badge/Redis-7-red)

🖥️ **Frontend**  
![React](https://img.shields.io/badge/React-18-blue)
![Next.js](https://img.shields.io/badge/Next.js-15-lightgrey)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-3-teal)
![Recharts](https://img.shields.io/badge/Recharts-3-lightblue)

## Setup

### Reqs

- Node.js 18+
- MongoDB 7+
- Redis 7+ (optional)
- Git

### Install

```bash
git clone https://github.com/seu-usuario/sales-dashboard.git
cd sales-dashboard

# Backend
cd backend
npm install
cp .env.example .env
npm run seed
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```
