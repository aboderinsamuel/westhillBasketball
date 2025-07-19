# West Hill Basketball Club Website

A modern, responsive website for West Hill Basketball Club - the home of year-round basketball excellence in Scarborough.

## Features

- **Modern Hero Section** with captivating basketball background image
- **About Us** section highlighting Coach John Emore and club mission
- **Programs** showcase including competitive teams, camps, and leagues
- **Upcoming Games** schedule with venue details
- **Registration** call-to-action section
- **Why Choose West Hill** benefits overview
- **Contact Information** section
- **Fully Responsive** design for all screen sizes
- **Basketball-themed** orange and dark color scheme

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS 3
- **Backend**: Express server integrated with Vite dev server
- **UI Components**: Radix UI + shadcn/ui component library
- **Icons**: Lucide React
- **Styling**: TailwindCSS with custom animations

## Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone or download** this repository
2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Open browser** to `http://localhost:8080`

### Available Scripts

```bash
# Development
npm run dev          # Start dev server (client + server)
npm run typecheck    # TypeScript validation

# Production Build
npm run build        # Build both client and server
npm run build:client # Build client only
npm run build:server # Build server only
npm run start        # Start production server

# Testing
npm test            # Run tests
```

## Project Structure

```
├── client/                 # React frontend
│   ├── components/ui/      # UI component library (47 components)
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Homepage (main content)
│   │   └── NotFound.tsx   # 404 page
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utilities (cn helper function)
│   ├── App.tsx            # Main app component & routing
│   └── global.css         # Global styles & Tailwind
├── server/                # Express backend
│   ├── index.ts           # Server configuration
│   └── node-build.ts      # Production server
└── public/                # Static assets
```

## Key Features Implementation

### Hero Section

- Dynamic basketball background image from Pexels
- Animated elements with CSS animations
- Responsive typography and layout
- Call-to-action buttons with hover effects

### Responsive Design

- Mobile-first approach
- Breakpoints: mobile (default), tablet (md), desktop (lg+)
- Flexible grid layouts that adapt to screen size
- Touch-friendly button sizes on mobile

### Basketball Theme

- Orange primary color (#FF6B35)
- Basketball emoji and icons throughout
- Professional photography backgrounds
- Sports-inspired typography and spacing

### Performance

- Optimized images and assets
- Tree-shaken JavaScript bundles
- Modern CSS with TailwindCSS
- Fast Vite development server

## Customization

### Colors

Update theme colors in `client/global.css`:

```css
:root {
  --orange: 25 95% 53%; /* Primary orange */
  --orange-foreground: 0 0% 100%; /* White text on orange */
  /* ... other color variables */
}
```

### Content

- Update club information in `client/pages/Index.tsx`
- Replace placeholder contact information
- Add real team photos and gallery images
- Customize programs and schedules

### Styling

- Modify `tailwind.config.ts` for design tokens
- Update `client/global.css` for custom styles
- Components in `client/components/ui/` for UI elements

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Docker (optional)

```bash
docker build -t west-hill-basketball .
docker run -p 3000:3000 west-hill-basketball
```

### Static Hosting

The built files in `dist/spa/` can be deployed to any static hosting service like Netlify, Vercel, or GitHub Pages.

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## License

MIT License - feel free to use this template for other sports clubs or organizations.

---

Built with ❤️ for West Hill Basketball Club
