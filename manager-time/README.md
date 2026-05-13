# Manager Time Logger

A time tracking application for managers to log daily activities and analyze time distribution.

## Setup

### Prerequisites
- Node.js (v18+)
- NPM_TOKEN environment variable set for Kroger Artifactory access

### Installation

```bash
# Install dependencies
npm install

# Set up MCP server for mx-web-components
npm run setup-mcp

# Start development server
npm run dev
```

### Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run setup-mcp` - Set up mx-web-components MCP server

## Project Structure

```
manager-time/
├── src/
│   ├── main.jsx              # Entry point with CSS imports
│   ├── App.jsx               # Main app component
│   ├── components/           # React components
│   │   ├── Header.jsx
│   │   ├── Navigation.jsx
│   │   ├── TimeEntry.jsx
│   │   ├── TableView.jsx
│   │   ├── Dashboard.jsx
│   │   └── Settings.jsx
│   ├── config/
│   │   └── appConfig.js      # App configuration
│   └── styles/
│       └── index.css         # Custom styles
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
└── package.json
```

## Development Phases

### Phase 1 (MVP) - Current
- Fixed configuration (Product Design Manager preset)
- Quick entry mode with task types
- Table view with filtering/sorting
- Basic dashboard with charts
- Settings for dropdown value editing
- LocalStorage persistence

### Phase 2 (Future)
- Full task type editing
- Entry mode switching
- Import/export configurations
- Templates

## Technologies

- **React 18** - UI framework
- **mx-web-components** - Kroger Design System
- **Vite** - Build tool
- **Chart.js** - Data visualization
- **LocalStorage** - Data persistence (MVP)
