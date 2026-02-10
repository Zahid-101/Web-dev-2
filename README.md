# Urban Harvest Hub

Urban Harvest Hub is a modern, responsive Single Page Application (SPA) designed to connect urban communities with eco-friendly initiatives, gardening workshops, and sustainable living resources.

## 🚀 Key Features

*   **Responsive Design**: Built with a "mobile-first" approach using Tailwind CSS.
*   **Centralized Data**: Powered by React Context API with dynamic integrations (public holidays).
*   **Performance**: Lazy loading for routes and optimized assets.
*   **Accessibility**: WCAG 2.1 compliant with semantic HTML, focus management, and ARIA attributes.
*   **Robust Forms**: Formik + Yup validation for secure and user-friendly data entry.
*   **Dark Mode**: System-aware theming with a toggle switch.

## 🛠️ Tech Stack

*   **Core**: React 19, Vite
*   **Routing**: React Router DOM 7
*   **Styling**: Tailwind CSS v4
*   **Validation**: Formik, Yup
*   **Icons/Fonts**: Google Fonts (Outfit, Inter)

## 🏗️ Architecture

### Directory Structure
```
src/
├── components/     # Reusable UI components (Button, Cards, Layout)
├── context/        # Global state (Data, Theme)
├── data/           # Mock data and static content
├── pages/          # Route views (Home, Categories, Booking)
└── main.jsx        # Application entry point
```

### State Management
We use **React Context** (`DataContext`) to manage:
1.  **Domain Data**: Items, categories, and highlights.
2.  **UI State**: Loading statuses, error messages, and theming.
3.  **Integrations**: Merging local data with external API data (Public Holidays) at the context level ensures a single source of truth for the entire app.

## 📦 Setup & Running

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🎨 Design System

The application uses a custom Tailwind theme:
*   **Primary Color**: `harvest-green` (50-950)
*   **Secondary Color**: `eco-charcoal` (50-950)
*   **Typography**: `Outfit` (Headings), `Inter` (Body)
*   **Components**: Custom `.btn`, `.glass-card` utilities for consistency.

## ✅ Accessibility

*   All forms include explicit labels and error messaging strings.
*   Interactive elements have visible `:focus-visible` rings.
*   Loading states use `aria-busy` patterns implicitly via separate Skeleton components.
*   `aria-live` regions notify screen readers of filter results.
