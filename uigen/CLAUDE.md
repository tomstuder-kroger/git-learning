# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UIGen is an AI-powered React component generator with live preview. Users describe components they want via chat, and the AI generates React/JSX code using tool calls that interact with a virtual file system. The generated code is rendered in a live preview frame using Babel's standalone transformer.

## Development Commands

### Setup
```bash
npm run setup                # Install deps, generate Prisma client, run migrations
```

### Development
```bash
npm run dev                  # Start Next.js dev server with Turbopack
npm run dev:daemon          # Start dev server in background, logs to logs.txt
```

### Testing
```bash
npm test                     # Run Vitest tests
npm run lint                 # Run ESLint
```

### Database
```bash
npx prisma generate          # Generate Prisma client
npx prisma migrate dev       # Run database migrations
npm run db:reset            # Reset database (warning: destructive)
```

### Build & Production
```bash
npm run build               # Build for production
npm start                   # Start production server
```

## Architecture

### Virtual File System

The core abstraction is `VirtualFileSystem` (src/lib/file-system.ts), an in-memory file tree that mimics a Unix-like filesystem. Files are never written to disk - everything exists in memory and is serialized to the database.

- **FileNode**: Represents files and directories with paths like `/App.jsx` or `/components/Counter.jsx`
- **Operations**: create, read, update, delete, rename files and directories
- **Serialization**: Converts to/from plain objects for database storage and network transmission
- **Text editor methods**: `viewFile()`, `createFileWithParents()`, `replaceInFile()`, `insertInFile()` - used by AI tools

### AI Integration & Tool Calling

The chat endpoint (`src/app/api/chat/route.ts`) uses Vercel AI SDK's `streamText()` with two custom tools:

1. **str_replace_editor** (src/lib/tools/str-replace.ts): Text editor for viewing and editing files
   - Commands: `view`, `create`, `str_replace`, `insert`
   - Operates on the VirtualFileSystem instance

2. **file_manager** (src/lib/tools/file-manager.ts): File operations
   - Commands: `rename`, `delete`
   - Can move files by renaming paths

The AI model receives the generation prompt (src/lib/prompts/generation.tsx) which instructs it to:
- Create React components using `/App.jsx` as the entrypoint
- Use Tailwind CSS for styling
- Import local files with `@/` alias (e.g., `import Counter from '@/components/Counter'`)

### Mock Provider

When `ANTHROPIC_API_KEY` is not set, the system uses a `MockLanguageModel` (src/lib/provider.ts) that generates static demo components (Counter, ContactForm, Card) without calling the Anthropic API. This allows development and testing without API costs.

### Context Providers

Two React contexts manage application state:

1. **FileSystemContext** (src/lib/contexts/file-system-context.tsx)
   - Wraps VirtualFileSystem instance
   - Tracks selected file for editor
   - Handles tool call execution from AI responses
   - Triggers UI refreshes when files change

2. **ChatContext** (src/lib/contexts/chat-context.tsx)
   - Uses Vercel AI SDK's `useChat()` hook
   - Sends serialized filesystem state with each request
   - Invokes `handleToolCall()` when AI uses tools
   - Tracks anonymous work for unauthenticated users

### Preview System

Generated code is rendered using Babel standalone transformer (src/lib/transform/jsx-transformer.ts):
- Transforms JSX to executable JavaScript in the browser
- Resolves `@/` import aliases to the virtual file system
- Renders React components in an iframe (src/components/preview/PreviewFrame.tsx)
- Hot-reloads when files change

### Authentication & Persistence

- **Auth**: JWT-based sessions (src/lib/auth.ts) with bcrypt password hashing
- **Database**: SQLite with Prisma ORM
  - `User`: email/password authentication
  - `Project`: stores messages and serialized filesystem as JSON strings
- **Anonymous users**: Can create temporary projects tracked in localStorage (src/lib/anon-work-tracker.ts)
- **Middleware**: Protects `/[projectId]` routes to ensure users can only access their own projects

## Key File Locations

- Entry points: `src/app/page.tsx` (homepage), `src/app/[projectId]/page.tsx` (project editor)
- API routes: `src/app/api/chat/route.ts`
- Components: `src/components/chat/*` (chat UI), `src/components/editor/*` (code editor/file tree), `src/components/preview/*` (preview frame)
- Tests: Co-located with source files in `__tests__/` directories
- Prisma schema: `prisma/schema.prisma`
- UI components: `src/components/ui/*` (shadcn/ui components)

## Testing Patterns

- Test framework: Vitest with React Testing Library
- Tests are in `__tests__/` directories next to source files
- Example: `src/lib/__tests__/file-system.test.ts` tests VirtualFileSystem operations
- Mock DOM environment: jsdom via vitest.config.mts

## Important Constraints

- All React components generated by AI must be JSX (not TypeScript)
- Root file must always be `/App.jsx` with a default export
- No HTML files - App.jsx is the entrypoint
- Local imports must use `@/` alias (e.g., `@/components/Button`)
- Virtual filesystem root is `/` (no traditional Unix directories like /usr, /home)
- Prisma client is generated to `src/generated/prisma` (non-standard location)
- Use comments sparingly - only comment complex code where logic isn't self-evident

## Environment Variables

Required for production:
- `JWT_SECRET`: Secret for signing JWT tokens
- `DATABASE_URL`: SQLite database path (defaults to `file:./dev.db`)

Optional:
- `ANTHROPIC_API_KEY`: Claude API key (uses mock provider if not set)

## Running Tests

Single test file:
```bash
npm test src/lib/__tests__/file-system.test.ts
```

Watch mode:
```bash
npm test -- --watch
```
