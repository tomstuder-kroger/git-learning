# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React product page application built with Vite, implementing a Tillamook Strawberry ice cream product display page. The design was created from Figma specifications to achieve pixel-perfect visual parity.

## Development Commands

```bash
# Development server (runs on http://localhost:5173)
npm run dev

# Production build (outputs to dist/)
npm run build

# Preview production build
npm run preview
```

## Architecture

### Application Structure

- **Entry point**: `src/main.jsx` - React root mounting
- **App wrapper**: `src/App.jsx` - Minimal wrapper that renders ProductPage
- **Main component**: `src/ProductPage.jsx` - Complete product page implementation with state management for flavor, size, and quantity selection
- **Styling**: Component-level CSS files (e.g., `ProductPage.css`, `App.css`) with global styles in `index.css`

### State Management

ProductPage manages local state using React hooks:
- `selectedFlavor` - Current flavor selection (default: 'Strawberry')
- `selectedSize` - Current size selection (default: 'Pint')
- `quantity` - Product quantity (default: 1, minimum: 1)

### Design System

Typography uses two font families loaded from Google Fonts:
- **Inter**: UI elements, labels, descriptions (weights: 400, 500, 600, 700, 900)
- **Georgia**: Product title, price, headings (weight: 400)

Color palette:
- Primary text: `rgb(74, 85, 101)`
- Primary accent: `#ff8800` (orange, used for CTA buttons)
- Selected state: `#fff7ed` background with `#ffa500` border

Layout uses CSS Grid for responsive two-column layout (product image | product details).

### Product Data Structure

Hardcoded data in ProductPage component:
```javascript
flavors = ['Mudslide', 'Strawberry', 'Chocolate', 'Double Vanilla']
sizes = [
  { name: 'Pint', volume: '1 pt (473 mL)' },
  { name: 'Quart', volume: '1.5 qt (1.42 L)' },
  { name: 'Half Gallon', volume: '1.75 qt (1.66 L)' }
]
```

To make this dynamic, replace with props or fetch from an API.

## Figma Integration

This project was implemented from Figma design specifications. When implementing new designs:

1. Extract design tokens from Figma (colors, typography, spacing)
2. Download required assets to `src/assets/`
3. Maintain visual parity by matching exact pixel values
4. Use the established color system and typography rather than introducing new values
5. Follow the component structure: presentation component with CSS module/file

## Adding New Products

To extend beyond the single Strawberry product:

1. Extract product data structure from ProductPage into a data model
2. Create a products configuration file or fetch from API
3. Pass product data as props to ProductPage component
4. Update App.jsx to handle routing/product selection if needed
5. Store product images in `src/assets/` following naming convention `{product-name}-product.{ext}`
