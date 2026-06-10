# Hotel Booking Analytics Dashboard

A modern, responsive analytics dashboard for hotel administrators to track bookings, revenue, occupancy and business trends.

# Tech Stack
* **React 18:** Core UI library.
* **Vite:** Lightning-fast build tool and development server.
* **Tailwind CSS v4:** Utility-first CSS framework for rapid, mobile-first responsive design.
* **Recharts:** Declarative, React-native data visualization library.

---

# Getting Started

# Prerequisites
We need to install [Node.js](https://nodejs.org/) on your machine ,if installed skip it.

# Installation
1. Clone the repository and navigate to the project folder:
   ```bash
   cd My_Travaly_Project
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port provided in your terminal).

---

# Architectural Decisions

This project was built with a focus on maintainability, scalability and exceptional user experience. Below are the key architectural decisions made during development:

## 1. Feature-Grouped Folder Structure
Instead of a purely "type-grouped" architecture (e.g: placing all components globally in `/components`),I imlemented "feature-grouped" architecture for this project (e.g: `src/features/dashboard`). This keeps related files close together, making the codebase easier to navigate and scale as new features are added.

## 2. Centralized API Service Layer
All network communication is isolated in `src/services/api.js`. This creates a single source of truth for base URLs and error handling. We explicitly check `!response.ok` to catch HTTP errors (like 404s) that the native `fetch` API ignores, preventing the application from attempting to parse HTML error pages as JSON.

## 3. Custom Hooks for State Management
The complex logic required to fetch data, handle loading spinners and catch errors was abstracted into a custom hook (`useDashboardData.js`). This keeps the visual `Dashboard.jsx` component clean and purely focused on rendering UI. 
* Parallel Fetching: We use `Promise.all` to fetch the bookings, metrics and trends simultaneously, significantly reducing initial load times.

## 4. Client-Side Filtering via Derived State
The backend API returns randomized data on every request to simulate live updates. If we triggered a new network request every time the user typed a letter in the search box, the results would constantly shuffle, ruining the user experience.
Solution: We fetch the data exactly once on mount. We use "Controlled Inputs" and "Derived State" to filter the master array of bookings purely in browser memory during the render cycle. This avoids confusing `useEffect` synchronization bugs and results in incredibly fast, live while you type search functionality.

## 5. Declarative Data Visualization
Recharts was chosen over libraries like D3.js because it integrates natively with React's Virtual DOM. By using React components to define SVGs (e.g., `<LineChart>`), we avoid the bugs and UI desync that occur when external libraries attempt to manually mutate the real DOM behind React's back. Recharts also automatically scales its axes based on dynamic API payloads.

## 6. Perceived Performance & UX
To prevent the "White Screen of Death" during slow network connections, we implemented "Skeleton Loaders" instead of basic spinners. These pulsating layout structures give the illusion of instant rendering, greatly improving perceived performance. Additionally, network failures are caught by a graceful Error Boundary UI rather than crashing the application.
