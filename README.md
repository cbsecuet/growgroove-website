# Web App Template (Static Frontend)

Pure React + Tailwind template with shadcn/ui baked in. **Use this README as the checklist for shipping static experiences.**

> **Note:** This template includes a minimal `shared/` and `server/` directory with placeholder types to support imported templates. These are just compatibility placeholders - web-static remains a true static-only template without API functionality.

---

## 🤖 AI Development Guide

### Stack Overview
- Client-only routing powered by React + Wouter.
- Design tokens are provided through `client/src/index.css` and `tailwind.config.ts`—keep them intact.

### Component Patterns

```tsx
// Compose pages from shadcn/ui primitives
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="rounded-3xl bg-white p-10 shadow-xl">
      <h1 className="text-4xl font-bold text-slate-900">Launch Quickly</h1>
      <Button size="lg" className="mt-6">Get Started</Button>
    </section>
  );
}
```

### File Structure

```
client/
  public/         ← Static assets copied verbatim to '/'
  src/
    pages/        ← Page-level components
    components/   ← Reusable UI & shadcn/ui
    contexts/     ← React contexts
    hooks/        ← Custom React hooks
    lib/          ← Utility helpers
    App.tsx       ← Routes & top-level layout
    main.tsx      ← React entry point
    index.css     ← global style
server/         ← Placeholder for imported template compatibility
shared/         ← Placeholder for imported template compatibility
  const.ts      ← Shared constants
```

Assets placed under `client/public` are served with aggressive caching, so add a content hash to filenames (for example, `logo.3fa9b2e4.svg`) whenever you replace a file and update its references to avoid stale assets.

Files in `client/public` are available at the root of your site—reference them with absolute paths (`/logo.3fa9b2e4.svg`, `/robots.txt`, etc.) from HTML templates, JSX, or meta tags.

---

## 🎯 Development Workflow

1. **Compose pages** in `client/src/pages/`. Keep sections modular so they can be reused across routes.
2. **Share primitives** via `client/src/components/`—extend shadcn/ui when needed instead of duplicating markup.
3. **Keep styling consistent** by relying on existing Tailwind tokens (spacing, colors, typography).
4. **Fetch external data** with `useEffect` if the site needs dynamic content from public APIs.

---

## 🧱 Tailwind Safeguards

- Preserve the `@layer base` block in `client/src/index.css`; removing it breaks utilities like `border-border`.
- Do not strip values from `theme.extend` in `tailwind.config.ts`—they power the design tokens used in the UI kit.
- Stick to utility classes for responsiveness (mobile-first by default).
## ✅ Launch Checklist
- [ ] UI layout and navigation structure correct, all image src valid.
- [ ] Success + error paths verified in the browser

---

## 🎨 Frontend Best Practices (shadcn-first)

- Prefer shadcn/ui components for interactions to keep a modern, consistent look; import from `@/components/ui/*` (e.g., `button`, `card`, `dialog`).
- Compose Tailwind utilities with component variants for layout and states; avoid excessive custom CSS. Use built-in `variant`, `size`, etc. where available.
- Preserve design tokens: keep the `@layer base` rules in `client/src/index.css`. Utilities like `border-border` and `font-sans` depend on them.
- Consistent design language: use spacing, radius, shadows, and typography via tokens. Extract shared UI into `components/` for reuse instead of copy‑paste.
- Accessibility and responsiveness: keep visible focus rings and ensure keyboard reachability; design mobile‑first with thoughtful breakpoints.
- Theming: Choose dark/light theme to start with for ThemeProvider according to your design style (dark or light bg), then manage colors pallette with CSS variables in `client/src/index.css` instead of hard‑coding to keep global consistency;
- Micro‑interactions and empty states: add motion, empty states, and icons tastefully to improve quality without distracting from content.
- Navigation: Design clear and intuitive navigation structure appropriate for the app type (e.g., top/side nav for multi-page apps, breadcrumbs or contextual navigation for SPAs)'. When building dashboard-like experience, use sidebar-nav to keep all page entry easy to access.

**React component rules:**
- Never call setState/navigation in render phase → wrap in `useEffect`

---

## Common Pitfalls

### Infinite loading loops from unstable references
**Anti-pattern:** Creating new objects/arrays in render that are used as query inputs
```tsx
// ❌ Bad: New Date() creates new reference every render → infinite queries
const { data } = trpc.items.getByDate.useQuery({
  date: new Date(), // ← New object every render!
});

// ❌ Bad: Array/object literals in query input
const { data } = trpc.items.getByIds.useQuery({
  ids: [1, 2, 3], // ← New array reference every render!
});
```

**Correct approach:** Stabilize references with useState/useMemo
```tsx
// ✅ Good: Initialize once with useState
const [date] = useState(() => new Date());
const { data } = trpc.items.getByDate.useQuery({ date });

// ✅ Good: Memoize complex inputs
const ids = useMemo(() => [1, 2, 3], []);
const { data } = trpc.items.getByIds.useQuery({ ids });
```

**Why this happens:** TRPC queries trigger when input references change. Objects/arrays created in render have new references each time, causing infinite re-fetches.

### Navigation dead-ends in subpages
**Problem:** Creating nested routes without escape routes—no header nav, no sidebar, no back button.

**Solution:** Choose navigation based on app structure:
```tsx
// For dashboard/multi-section apps: Use persistent sidebar (from shadcn/ui)
import { SidebarProvider, Sidebar, SidebarContent, SidebarInset } from "@/components/ui/sidebar";

<SidebarProvider>
  <Sidebar>
    <SidebarContent>
      {/* Navigation menu items - always visible */}
    </SidebarContent>
  </Sidebar>
  <SidebarInset>
    {children}  {/* Page content */}
  </SidebarInset>
</SidebarProvider>

// For linear flows (detail pages, wizards): Use back button
import { useRouter } from "wouter";

const router = useRouter();
<div>
  <Button variant="ghost" onClick={() => router.back()}>
    ← Back
  </Button>
  <ItemDetailPage />
</div>
```

### Dark mode styling without theme configuration
**Problem:** Using dark foreground colors without setting the theme, making text invisible on default light backgrounds.

**Solution:** Set `defaultTheme="dark"` in App.tsx, then update CSS variables in `index.css`:
```tsx
// App.tsx: Set the default theme first
<ThemeProvider defaultTheme="dark">  {/* Applies .dark class to root */}
  <div className="text-foreground bg-background">
    Content  {/* Now uses dark theme CSS variables */}
  </div>
</ThemeProvider>
```

```css
/* index.css: Adjust color palette for dark theme */
.dark {
  --background: oklch(0.145 0 0);  /* Dark background */
  --foreground: oklch(0.985 0 0);  /* Light text */
  /* ... other variables ... */
}
```

---

## Core File References

`client/src/App.tsx`
```tsx
import { useState } from 'react';
import './index.css';
import AboutContent from './pages/AboutPage';
import AgendaContent from './pages/AgendaPage';
import TicketsContent from './pages/TicketsPage';
import { tabs } from './config/tabs';
import { getThemeClasses } from './utils/theme';
import { useIsMobile } from './hooks/use-mobile';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

function AppContent() {
  const [activeTab, setActiveTab] = useState('about');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const currentTheme = getThemeClasses(tabs.find(tab => tab.id === activeTab)?.theme || 'orange');

  const handleMobileTabSelect = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Space_Grotesk'] overflow-hidden">
      {/* Mobile Hamburger Menu */}
      {isMobile && (
        <>
          {/* Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="fixed top-4 right-4 z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
          >
            <div className="flex flex-col space-y-1">
              <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 hamburger-line ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 hamburger-line ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 hamburger-line ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
            </div>
          </button>

          {/* Mobile Dropdown Menu */}
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40 backdrop-enter"
                onClick={() => setIsMobileMenuOpen(false)}
              ></div>

              {/* Dropdown Menu */}
              <div className="fixed top-20 right-4 z-50 bg-white rounded-lg shadow-2xl overflow-hidden w-64 mobile-menu-enter">
                {tabs.map((tab) => {
                  const tabTheme = getThemeClasses(tab.theme);
                  const isActive = activeTab === tab.id;

                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleMobileTabSelect(tab.id)}
                      className={`w-full px-6 py-5 text-left hover:bg-gray-50 active:bg-gray-100 transition-colors duration-200 border-l-4 touch-manipulation ${isActive ? 'border-orange-500 bg-gray-50' : 'border-transparent'
                        } ${isActive && tab.theme === 'purple' ? 'border-purple-500' : ''} ${isActive && tab.theme === 'blue' ? 'border-blue-500' : ''}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-['Ranchers'] font-bold text-lg text-gray-800">
                            {tab.label}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {tab.id === 'about' && 'Learn about the festival'}
                            {tab.id === 'agenda' && 'View event schedule'}
                            {tab.id === 'tickets' && 'Get your tickets'}
                          </div>
                        </div>
                        <div className={`text-2xl font-['Ranchers'] font-bold ${tab.theme === 'orange' ? 'text-orange-500' :
                            tab.theme === 'purple' ? 'text-purple-500' :
                              tab.theme === 'blue' ? 'text-blue-500' : 'text-gray-400'
                          }`}>
                          {tab.number}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}

      <div className="flex h-screen">
        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className={`absolute top-10 left-10 text-9xl font-['Ranchers'] text-gray-400 rotate-12 ${isMobile ? 'bg-pattern-mobile' : ''}`}>🎠</div>
            <div className={`absolute top-40 right-20 text-6xl font-['Ranchers'] text-gray-400 -rotate-12 ${isMobile ? 'bg-pattern-mobile' : ''}`}>🎡</div>
            <div className={`absolute bottom-20 left-40 text-7xl font-['Ranchers'] text-gray-400 rotate-45 ${isMobile ? 'bg-pattern-mobile' : ''}`}>🎪</div>
          </div>

          <div className={`h-full overflow-y-auto py-8 relative z-10 ${isMobile ? 'px-4' : ''}`}>
            {activeTab === 'about' && <AboutContent theme={currentTheme} />}
            {activeTab === 'agenda' && <AgendaContent theme={currentTheme} />}
            {activeTab === 'tickets' && <TicketsContent theme={currentTheme} />}
          </div>
        </div>

        {/* New Sidebar Design - Hidden on Mobile */}
        {!isMobile && (
          <div className="relative flex flex-col h-full">
            {/* Navigation Tabs */}
            <div className="flex h-full">
              {tabs.map((tab) => {
                const tabTheme = getThemeClasses(tab.theme);
                const isActive = activeTab === tab.id;

                return (
                  <div
                    key={tab.id}
                    className={`sidebar-tab w-24 ${tabTheme.bg} cursor-pointer relative overflow-hidden`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div className="h-full flex flex-col text-white relative">
                      {/* Tab Label - Vertical text */}
                      <div className="flex-1 flex items-center justify-center min-h-0">
                        <div className="text-6xl font-['Ranchers'] font-bold tracking-wider transform -rotate-90 whitespace-nowrap origin-center translate-y-[-50px]">
                          {tab.label}
                        </div>
                      </div>
                      
                      {/* Bottom Number with Animation */}
                      <div className="relative flex items-end justify-center pb-8">
                        {/* Animated Vertical Line */}
                        <div className="line-slide absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1.5px] h-0 bg-white/30 transition-all duration-300 ease-out"></div>
                        
                        {/* Number */}
                        <div className="number-push text-6xl font-['Ranchers'] font-bold text-white/30">
                          {tab.number}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <AppContent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;


```

`client/src/pages/Home.tsx`
```tsx
import { Button } from "@/components/ui/button";
import { APP_LOGO, APP_TITLE } from "@/const";

/**
 * Build polished static experiences. Visit the README for the full playbook.
 * All content in this page are only for example, delete if unneeded
 */
export default function Home() {
  // If theme is switchable in App.tsx, we can implement theme toggling like this:
  // const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b px-4 flex items-center h-16">
        <div className="flex items-center gap-2">
          <img
            src={APP_LOGO}
            className="h-8 w-8 rounded-lg border-border bg-background object-cover"
          />
          <span className="text-xl font-bold">{APP_TITLE}</span>
        </div>
      </header>
      <main>
        Example Page
        <Button variant="default">Example Button</Button>
      </main>
    </div>
  );
}

```

`client/src/main.tsx`
```tsx
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

```

`client/src/index.css`
```css
@import "tailwindcss";

/* Custom Fonts */
@font-face {
  font-family: 'Ranchers';
  src: url('/Ranchers-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/SpaceGrotesk-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/SpaceGrotesk-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

/* Custom animations and effects */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

@keyframes glow {
  0%, 100% { text-shadow: 0 0 5px currentColor; }
  50% { text-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
}

@keyframes rainbow {
  0% { filter: hue-rotate(0deg); }
  100% { filter: hue-rotate(360deg); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-glow {
  animation: glow 2s ease-in-out infinite;
}

.animate-rainbow {
  animation: rainbow 3s linear infinite;
}

/* Enhanced hover effects */
.group:hover .group-hover\:animate-bounce {
  animation: bounce 1s infinite;
}

/* Custom gradient text */
.gradient-text {
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow 3s ease infinite;
}

/* Pulsing shadow effect */
.pulse-shadow {
  animation: pulse-shadow 2s infinite;
}

@keyframes pulse-shadow {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
  }
  50% {
    box-shadow: 0 0 0 20px rgba(59, 130, 246, 0);
  }
}

/* Enhanced button effects */
.btn-festival {
  position: relative;
  overflow: hidden;
}

.btn-festival::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.btn-festival:hover::before {
  left: 100%;
}

/* Scrollbar styling - Hidden */
::-webkit-scrollbar {
  width: 0px;
  background: transparent;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: transparent;
}

::-webkit-scrollbar-thumb:hover {
  background: transparent;
}

/* Hollow text effect for navigation numbers */
.hollow-text {
  -webkit-text-stroke: 2px white;
  text-stroke: 2px white;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  font-weight: 900;
}

/* Enhanced hollow effect with better browser support */
.hollow-text {
  color: transparent;
  -webkit-text-stroke: 3px white;
  text-shadow: 
    0 0 0 white,
    0 0 10px rgba(255,255,255,0.5);
}

/* Ensure proper spacing and alignment for navigation */
.nav-tab {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 2rem 1rem;
}

/* Additional sparkle positioning */
.sparkle-container {
  position: relative;
  overflow: visible;
}

.sparkle-container::before,
.sparkle-container::after {
  content: '✨';
  position: absolute;
  font-size: 1.5rem;
  opacity: 0.6;
  animation: sparkle 2s infinite;
}

.sparkle-container::before {
  top: -10px;
  right: -10px;
  animation-delay: 0s;
}

.sparkle-container::after {
  bottom: -10px;
  left: -10px;
  animation-delay: 1s;
}

@keyframes sparkle {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(0.8) rotate(0deg);
  }
  50% { 
    opacity: 1; 
    transform: scale(1.2) rotate(180deg);
  }
}

/* New sidebar animations */
.sidebar-tab {
  position: relative;
  overflow: visible;
  min-height: 100vh;
}

.sidebar-tab .line-slide {
  height: 0;
  transition: height 0.4s ease-out;
}

.sidebar-tab:hover .line-slide {
  height: 85vh;
}

.sidebar-tab .number-push {
  transform: translateY(0) rotate(-90deg);
  transition: transform 0.4s ease-out;
}

.sidebar-tab:hover .number-push {
  transform: translateY(-85vh) rotate(-90deg);
}

/* Polaroid hover effects */
.polaroid {
  transition: all 0.3s ease;
  cursor: pointer;
}

.polaroid:hover {
  transform: scale(1.05) !important;
  z-index: 20;
}

/* Enhanced buy tickets button */
.buy-tickets-btn {
  position: relative;
  overflow: hidden;
}

.buy-tickets-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: left 0.5s;
}

.buy-tickets-btn:hover::before {
  left: 100%;
}

/* Fade in animation for agenda events */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.6s ease-out forwards;
  opacity: 0;
}

/* Mobile hamburger menu animations */
.mobile-menu-enter {
  animation: slideInFromTop 0.3s ease-out forwards;
}

.mobile-menu-exit {
  animation: slideOutToTop 0.3s ease-in forwards;
}

@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideOutToTop {
  from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  to {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
}

/* Hamburger button animation */
.hamburger-line {
  transform-origin: center;
}

/* Mobile menu backdrop animation */
.backdrop-enter {
  animation: fadeInBackdrop 0.3s ease-out forwards;
}

@keyframes fadeInBackdrop {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Mobile responsive adjustments */
@media (max-width: 767px) {
  .main-content {
    padding-right: 1rem;
    padding-left: 1rem;
  }
  
  /* Adjust background pattern for mobile */
  .bg-pattern-mobile {
    font-size: 4rem !important;
  }
  
  .bg-pattern-mobile.text-6xl {
    font-size: 3rem !important;
  }
  
  .bg-pattern-mobile.text-7xl {
    font-size: 3.5rem !important;
  }
}


```

