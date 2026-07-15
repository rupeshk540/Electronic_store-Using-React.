Zeptra — Frontend 

The React frontend for Zeptra, a full-stack e-commerce platform with an AI-powered shopping assistant.

Live Demo: https://zeptra-app.netlify.app/
Backend Repo: https://github.com/rupeshk540/Electronic-Store-Backend-with-SpringBoot-




Overview:-
This repository contains the client-side application for Zeptra — a responsive React storefront where users can browse products, chat with an AI shopping assistant, manage their wishlist and cart, and check out securely. It communicates with the Zeptra backend, a Spring Boot REST API.

Features :-

Product Browsing — Search, filter by category/collection, infinite-scroll pagination
AI Shopping Assistant — Conversational product recommendations via a floating chat widget, backed by Google's Gemini API
Authentication — Email/password login, JWT-based sessions
Wishlist & Cart — Persisted server-side, synced across devices
Checkout — Razorpay payment integration
Admin Dashboard — Manage products, categories, collections, orders, and users
Responsive — Optimized layouts for desktop, tablet, and mobile


Tech Stack:-


React, React Router
Context API for global state (auth, cart, wishlist)
Bootstrap + custom CSS
Lucide Icons
Deployed on Netlify with automatic deploys on every push to master


Project Structure

src/
├── components/       # Reusable UI components (Navbar, product cards, chatbot, etc.)
├── context/           # Global state providers (User, Cart, Wishlist)
├── hooks/              # Custom hooks
├── pages/              # Route-level page components
│   ├── admin/          # Admin dashboard pages
│   └── users/           # User-facing pages (cart, checkout, orders, etc.)
├── services/          # API call wrappers (Axios/fetch to backend endpoints)
└── App.js               # Route definitions

Getting Started:

Prerequisites


Node.js 18+
A running instance of the Zeptra backend (local or deployed)


Installation

bashgit clone https://github.com/rupeshk540/your-frontend-repo-name.git
cd your-frontend-repo-name
npm install

Environment Setup

Create a .env file in the project root with your backend API URL:

REACT_APP_API_BASE_URL=http://localhost:9090

For production, point this at your deployed backend (e.g. your Render URL).

Run Locally

bash npm start

The app runs at http://localhost:3000 by default.

Build for Production

bash npm run build

Deployment

This app is deployed on Netlify, connected directly to this repository — every push to master triggers an automatic build and deploy.

Note: Since this is a single-page application using React Router, a public/_redirects file is included to ensure client-side routes resolve correctly on Netlify (redirects all paths to index.html, letting React Router handle routing).

Key Implementation Notes


Debounced search — search input waits 400ms after the user stops typing before firing an API request, reducing unnecessary backend calls
Optimistic-safe wishlist/cart — actions are persisted to the backend first, then local state is refreshed from the server response, avoiding stale or out-of-sync UI state
Isolated re-renders — components with frequently-updating local state (like the countdown timer) are isolated into their own components to avoid unnecessary re-renders of the rest of the page


Contact

Rupesh Kumar
GitHub : https://github.com/rupeshk540/• 
LinkedIn : https://www.linkedin.com/in/rupesh-kumarr/

Open to Full-Stack / Backend Developer roles 