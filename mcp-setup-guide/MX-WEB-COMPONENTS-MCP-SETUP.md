# MX Web Components MCP Server Setup Guide

A step-by-step guide for integrating Kroger's MX Web Components design system with Claude Code using the Model Context Protocol (MCP).

## What This Does

This setup enables Claude Code (the AI coding assistant) to understand and use MX Web Components and the Kroger Design System (KDS) when helping you build web applications. Claude will have direct access to:

- Component documentation (buttons, modals, forms, etc.)
- Component properties and events
- KDS styling guidelines
- CSS utility classes
- React component APIs
- Best practices and examples

## Prerequisites

Before you begin, you need:

1. **Claude Code CLI** installed on your machine
   - Download from: https://claude.ai/code
   - Verify installation: `claude --version`

2. **Node.js and npm** installed
   - Check: `node --version` (should be 14+)
   - Check: `npm --version`

3. **A React project** (or any web project where you want to use MX components)

## Step 1: Install MX Web Components

Navigate to your project directory and install the package:

```bash
cd your-project-directory
npm install mx-web-components@^5.1.0
```

**For React projects**, also install the React wrapper:

```bash
npm install react-mx-web-components@^5.1.0
```

**Verify installation:**
```bash
npm list mx-web-components
```

You should see version 5.1.0 or higher (MCP support was added in v5.1.0).

## Step 2: Run the MCP Setup Tool

The mx-web-components package includes a setup tool that configures Claude Code automatically:

```bash
npx mx-web-components-mcp-setup install
```

**What this does:**
- Creates a `.mcp.json` file in your project root
- Configures Claude Code to run the MCP server when working in this directory
- No global configuration changes - works per-project

**Expected output:**
```
✓ Created .mcp.json configuration
✓ MCP server configured successfully
```

## Step 3: Verify the Configuration

**Check that the `.mcp.json` file was created:**

```bash
cat .mcp.json
```

**You should see:**
```json
{
  "mcpServers": {
    "mx-web-components": {
      "command": "node",
      "args": [
        "node_modules/mx-web-components/mcp-server/dist/index.js"
      ]
    }
  }
}
```

**Check that the MCP server files exist:**
```bash
ls node_modules/mx-web-components/mcp-server/
```

You should see:
- `dist/` - The MCP server code
- `data/` - Component documentation and metadata

## Step 4: Start Claude Code in Your Project

Open Claude Code from your project directory:

```bash
cd your-project-directory
claude
```

**Or** if you're already using Claude Code, just make sure you're working in a directory that contains the `.mcp.json` file.

## Step 5: Test the Integration

Ask Claude to use an MX component. Try questions like:

- "What MX components are available for buttons?"
- "Show me how to use the mx-modal component"
- "What props does KdsButton accept?"
- "What KDS CSS utility classes are available for spacing?"

Claude should be able to answer with specific, accurate information from the MX Web Components documentation.

## How It Works

```
Your Project Directory
├── .mcp.json                          ← Tells Claude to start MCP server
├── node_modules/
│   └── mx-web-components/
│       └── mcp-server/
│           ├── dist/index.js          ← MCP server code
│           └── data/                  ← Component documentation
│               ├── components.json
│               ├── css-utilities.json
│               └── documentation.json
└── your-code/
```

When Claude Code starts in this directory:
1. Reads `.mcp.json`
2. Launches the MCP server (`node_modules/mx-web-components/mcp-server/dist/index.js`)
3. The server exposes component data as queryable tools
4. Claude can search and retrieve information about MX components

## Common Questions

### Q: Does this work with other AI tools besides Claude Code?

The MCP server follows the Model Context Protocol standard, so it should work with any MCP-compatible AI tool. However, the setup tool is optimized for Claude Code.

### Q: Do I need to run this setup for every project?

Yes - the `.mcp.json` file is project-specific. Each project that uses MX components should have its own configuration. This keeps your projects isolated and ensures Claude has the right context for each project.

### Q: What if I'm using an older version of mx-web-components?

MCP support was added in version 5.1.0. If you're on an older version:

```bash
npm install mx-web-components@^5.1.0 --save
npm install react-mx-web-components@^5.1.0 --save  # if using React
```

### Q: Can I customize the MCP server configuration?

The `.mcp.json` file is a standard JSON file you can edit manually, but the default configuration should work for most use cases.

### Q: Does this send my code to external servers?

No - the MCP server runs locally on your machine. It only accesses the documentation files included in the `node_modules/mx-web-components/mcp-server/data/` directory.

## Troubleshooting

### Claude doesn't seem to know about MX components

**Check:**
1. Verify `.mcp.json` exists in your project root: `ls -la .mcp.json`
2. Verify you started Claude Code from the correct directory
3. Restart Claude Code to reload the configuration

### "Cannot find module" error when starting Claude

**Fix:**
```bash
# Reinstall dependencies
npm install

# Verify MCP server files exist
ls node_modules/mx-web-components/mcp-server/dist/
```

### Setup tool command not found

**Fix:**
```bash
# Make sure mx-web-components is installed first
npm install mx-web-components@^5.1.0

# Try running with full path
npx mx-web-components-mcp-setup install
```

### MCP server crashes or doesn't start

**Debug:**
```bash
# Test running the MCP server manually
node node_modules/mx-web-components/mcp-server/dist/index.js

# Check Node.js version (needs 14+)
node --version
```

## What's Available

Once configured, Claude has access to:

### Components
- Buttons, forms, inputs
- Modals, accordions, tabs
- Navigation menus
- Date pickers
- Multi-select dropdowns
- And 30+ more components

### Documentation
- Component props and events
- Usage examples
- Accessibility guidelines
- Best practices

### Styling
- KDS design tokens
- CSS utility classes
- Color system
- Typography scale

### Files You Can Query
The MCP server includes:
- `components.json` - Full component API docs (561KB)
- `css-utilities.json` - All KDS utility classes (134KB)
- `documentation.json` - Guides and patterns (127KB)
- `component-names.json` - List of all components

## Example Usage

Once set up, you can interact with Claude like this:

**You:** "Create a modal component using MX Web Components"

**Claude:** *(queries MCP server for mx-modal documentation)* "I'll create a modal using the MX modal component. The `mx-modal` component accepts these props: `open`, `heading`, `size`, etc..."

**You:** "Style this button with KDS utilities"

**Claude:** *(queries CSS utilities data)* "I'll use KDS utility classes like `kds-padding-sm`, `kds-bg-primary`, etc..."

## Additional Resources

- **MX Web Components Storybook:** https://mxweb.kroger.com/
- **Getting Started Guide:** https://mxweb.kroger.com/?path=/docs/getting-started--docs
- **MCP Server Integration Docs:** https://mxweb.kroger.com/?path=/docs/mcp-server-integration--docs
- **Claude Code Documentation:** https://claude.ai/code

## Need Help?

If you run into issues:
1. Check the troubleshooting section above
2. Verify all prerequisites are met
3. Review the MCP Server Integration docs in Storybook
4. Contact the MX Web Components team for support

---

**Version Information:**
- Guide created: 2026-05-29
- MX Web Components: 5.1.0+
- MCP Support: Added in v5.1.0
- Tested with: Claude Code CLI
