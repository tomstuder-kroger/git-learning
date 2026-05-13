# Figma to Claude Code Workflow

A step-by-step guide for implementing Figma designs using Claude Code with the Figma MCP server.

## Prerequisites

- Figma Desktop app installed
- Claude Code CLI installed
- Figma MCP server configured in Claude Code settings

## Workflow Steps

### Step 1: Prepare Figma

1. **Open Figma Desktop app**
2. **Open your design file**
3. **Enable Dev Mode** (toggle in top-right corner)
4. **Start the Figma MCP server** (if not auto-started)
   - The MCP server should be running and connected to Claude Code
   - Check Claude Code settings to verify Figma MCP connection

### Step 2: Select Your Design Node

1. **Navigate to the frame/component** you want to implement
2. **Click to select the node** in Figma
   - Can be a frame, component, section, or individual element
   - The node will be highlighted with a blue border
3. **Note the node structure** (optional)
   - Check if it's a component, frame, or group
   - Review nested elements if needed

### Step 3: Start Claude Code

1. **Open terminal** and navigate to your project directory
2. **Start Claude Code**:
   ```bash
   claude
   ```
3. **Verify Figma MCP connection**
   - Claude should show available MCP servers on startup
   - Look for "figma-desktop" in the list

### Step 4: Request Implementation

**Option A: Using selected node (recommended)**
```
Implement this design from Figma.
```
Claude will automatically use the currently selected node from Figma Desktop.

**Option B: Using Figma URL**
```
Implement this design from Figma.
@https://www.figma.com/design/[fileKey]/[fileName]?node-id=X-Y
```
Provide the full Figma URL with node ID.

### Step 5: Claude Processes Design

Claude will automatically:
1. ✅ Load the `figma:figma-implement-design` skill
2. ✅ Fetch design context from Figma (layout, colors, typography, spacing)
3. ✅ Capture a screenshot for visual reference
4. ✅ Download any required assets (images, icons, SVGs)
5. ✅ Analyze your project structure and conventions

### Step 6: Review Implementation Plan

Claude will:
- Show you the design context it retrieved
- Display the screenshot for visual reference
- Explain what elements it identified
- Propose where to create the new files

**Important:** Review this carefully before proceeding. This is your chance to:
- Clarify where files should go
- Request a different framework/approach
- Ask for modifications to the design

### Step 7: Code Generation

Claude will:
- Translate Figma design to your project's tech stack
- Match your existing styling system (CSS variables, utility classes, etc.)
- Create new files or components as needed
- Maintain pixel-perfect accuracy to the Figma design

### Step 8: Validation

**Visual validation checklist:**
- [ ] Layout matches (spacing, alignment, sizing)
- [ ] Typography matches (font family, size, weight, line height)
- [ ] Colors match exactly (compare hex values)
- [ ] Border radius matches
- [ ] Interactive states work (hover, active, focus, disabled)
- [ ] Responsive behavior follows Figma constraints
- [ ] Assets render correctly
- [ ] Accessibility standards met (WCAG)

**Test the implementation:**
1. Start your local server
2. Open in browser
3. Compare side-by-side with Figma screenshot
4. Test responsive breakpoints
5. Test keyboard navigation and focus states

### Step 9: Iterate if Needed

If adjustments are needed:
```
The button border radius doesn't match - it should be rounded on top-right and bottom-left only.
```

Claude will make targeted fixes while maintaining the original design fidelity.

## Tips & Best Practices

### Selecting the Right Node

- **Select parent frames** for full page/section implementations
- **Select components** for reusable UI elements
- **Select individual elements** for specific styling reference
- **Use Dev Mode** to see exact measurements and export settings

### Communication with Claude

**Good prompts:**
- ✅ "Implement this design from Figma"
- ✅ "Create a component from this Figma node"
- ✅ "Build this page matching the Figma design"
- ✅ "Update the button to match the Figma specs"

**Provide context when needed:**
- ✅ "Implement this as a React component"
- ✅ "Create this in vanilla HTML/CSS"
- ✅ "Use our existing design system tokens"
- ✅ "This should be a reusable component"

### Handling Complex Designs

For large/complex designs with many nested elements:

1. **Start with the parent frame** to get overall structure
2. **If output is truncated**, ask Claude to:
   ```
   Get metadata for this node first to see the structure
   ```
3. **Implement section by section** for very large pages:
   ```
   Implement just the header section from this design
   ```

### Asset Management

- Assets from Figma are served via `localhost` URLs by the MCP server
- Claude will use these URLs directly - no manual downloads needed
- SVGs and images are automatically included in the code

### Design System Integration

Claude will:
- Detect your existing design tokens (CSS variables, Tailwind config, etc.)
- Map Figma colors/spacing to your system tokens
- Reuse existing components when possible
- Only create new components when necessary

If you want specific behavior:
```
Use our existing Button component and just adjust the variant
```

## Troubleshooting

### "No node selected" error
- **Solution:** Select a node in Figma Desktop before asking Claude to implement

### Output is truncated or incomplete
- **Solution:** Ask Claude to get metadata first, then fetch specific sections
  ```
  Get metadata for this design to see the structure first
  ```

### Design doesn't match after implementation
- **Solution:** Share the specific discrepancy
  ```
  The spacing between the heading and paragraph should be 35px, not 40px
  ```

### MCP server not connected
- **Solution:**
  1. Restart Figma Desktop app
  2. Restart Claude Code
  3. Check Claude Code settings for MCP configuration

### Colors/fonts don't match
- **Solution:** Claude may be using your project's design system tokens
  ```
  Use the exact colors from Figma, not our design system tokens
  ```

## Advanced Workflows

### Multi-Page Implementation
```
Implement all screens from this Figma file, starting with the landing page
```

### Component Library Building
```
Create a component library from this Figma design system
```

### Design System Sync
```
Update our design tokens to match the Figma variables
```

### Responsive Variations
```
Implement both mobile and desktop versions of this design
```

## Quick Reference

| Task | Prompt |
|------|--------|
| Implement selected node | `Implement this design from Figma` |
| Implement from URL | `Implement this design from Figma.` + `@[URL]` |
| Get design context | Claude does this automatically |
| See node structure | `Get metadata for this node` |
| Update existing component | `Update [component] to match this Figma design` |
| Create new page | `Create a new page for this Figma design` |

## Example Session

```
You: Implement this design from Figma.

Claude: I'll implement this design from Figma. Let me start by fetching
        the design context and visual reference.

        [Fetches design context and screenshot]

        Perfect! I can see the design consists of:
        - A heading "THIS IS TEXT" (12px, Inter Regular)
        - A paragraph of Lorem Ipsum text (12px, Inter Regular)
        - A button with rounded corners (12px, Inter Bold)

        I'll create this in a new directory...

You: Great! Can you make the button have a hover state?

Claude: [Updates button styles with hover state]
```

---

## Notes

- Always keep Figma Desktop app open with your design file
- Select the node in Figma before prompting Claude
- Review the design context and screenshot Claude shows you
- Validate the final implementation against the Figma design
- Iterate as needed for pixel-perfect results

---

**Last Updated:** 2026-04-07
**Claude Code Version:** Compatible with Figma MCP Server (figma-desktop)
