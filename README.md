# Ecommerce React App (Vite)

A feature-rich ecommerce frontend built with React + Vite, using client-side routing and contextual state for auth, cart, toast, and chatbot.

## ✅ Features

- React 19 + Vite 6
- Tailwind CSS (with `@tailwindcss/vite`)
- Routing with `react-router` (login-protected pages)
- Authentication context via API (`/auth/login`, `/auth/logout`, `/auth/me`)
- Cart context + persistent checkout flow
- Orders history + product details pages
- Chatbot component under `/chatbot`
- Global toast notifications
- API integration with Axios to backend endpoints
- 404 Not Found page

## 📦 Tech stack

- `react`, `react-dom`
- `react-router` v7
- `axios`
- `tailwindcss`, `@tailwindcss/vite`
- `lucide-react` (icons)
- `eslint` tooling

## 📁 Project structure

- `src/index.css` / `src/App.css` — global/app styling
- `src/main.jsx` — providers for `Cart`, `Auth`, `Toast`, router
- `src/App.jsx` — app routes and protected route logic
- `src/pages/` — `Homepage`, `CheckoutPage`, `OrdersPage`, `OrderDetailsPage`, `ProductDetailsPage`, `LoginPage`, `NotFoundPage`
- `src/components/` — `Navbar`, `ProtectedRoute`, `Chatbot`, etc.
- `src/contexts/` — `AuthContext`, `CartContext`, `ToastContext`
- `src/api/` — API utility modules

## 🚀 Setup

```bash
cd SuperSimpleReact/ecommerce
npm install
```

## ▶️ Development

```bash
npm run dev
```

Then open `http://localhost:5173`.

## 🧩 Production build

```bash
npm run build
npm run preview
```

## 🧹 Lint

```bash
npm run lint
```

## 🔒 Auth flow

- Root route `/` = `LoginPage` (public)
- Protected routes: `/homepage`, `/checkout`, `/orders`, `/orders/:id`, `/product/:id`, `/chatbot`
- `AuthProvider` calls `/auth/me` on mount to hydrate user state

## 🛒 Cart & checkout

- `CartProvider` stores cart items
- `CheckoutPage` consumes cart state
- `OrdersPage` shows user orders

## 💬 Chatbot

- `Chatbot` component is mounted from `App` routes
- Can be used for quick interactive SNS-style chatbot interactions

## ⚙️ Backend setup (optional)

This frontend expects a backend with these endpoints:

- `GET /api/products` (product catalog)
- `GET /api/auth/me` (validate session)
- `POST /api/auth/login` (login)
- `POST /api/auth/logout` (logout)
- `POST /api/orders` / `GET /api/orders` etc. (orders APIs)

If you have `ecommercebackend` in same workspace, run it separately and set CORS + proxy in Vite.

## 📝 Notes

- Use the `src/contexts/AuthContext` hook in components via `useAuth()`
- App hides `Navbar` on public routes and when no authenticated user exists
- You can drop in your own design updates inside `src/App.css` and `src/index.css`


