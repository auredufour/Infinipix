# Infinipix

A photo gallery application built with React and TypeScript, implementing
infinite scroll and masonry grid layout.

## Features

### Core Functionality

- Infinite scroll using Intersection Observer API
- Masonry grid layout that preserves image aspect ratios
- Full-screen image preview modal
- Lazy loading with skeleton placeholders
- Image download functionality (Bonus)

### Technical Implementation

- Responsive column layout (1-3 columns based on viewport)
- Hover interactions for author info and download button
- Keyboard navigation with focus management
- Bundle optimization with code splitting

### Accessibility

- Keyboard navigation support
- `prefers-reduced-motion` media query support

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd infinipix
   ```

2. Install dependencies

   ```bash
   yarn install
   # or
   npm install
   ```

3. Start the development server

   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

### Build for Production

```bash
yarn build && yarn preview
# or
npm run build && npm run preview
```

### Testing

```bash
yarn test
# or
npm test
```

## Technology Stack

### Core Technologies

- React 18 with TypeScript
- Vite for build tooling and development server
- Styled Components for styling
- React Router for client-side routing

### APIs and Libraries

- Intersection Observer API for infinite scroll
- Picsum Photos API for image data
- ESLint and Jest for code quality and testing

## Project Structure

```
src/
├── app/                    # App-level providers and configuration
├── components/             # Reusable UI components
│   ├── shared/            # Generic components (Button, Image, Grid, etc.)
│   └── layout/            # Layout-specific components
├── features/              # Feature-based modules
│   └── photos/           # Photo gallery feature
│       ├── components/   # Photo-specific components
│       ├── hooks/        # Custom hooks for photos
│       ├── pages/        # Photo gallery pages
│       └── services/     # API and data services
├── styles/               # Global styles and theme system
└── shared/               # Shared utilities and types
```
