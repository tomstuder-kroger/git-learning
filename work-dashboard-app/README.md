# Work Activity Dashboard MVP

A data visualization tool and dashboard for tracking work activities, time allocation, and portfolio performance.

## Features

### View 1: Dashboard (Visualizations)
- **Category Pie Chart**: Shows time allocation across work categories (Doer, Collaborator, Facilitator, Enabler)
- **Portfolio Bar Chart**: Displays portfolio performance over time with grouped bars for comparison
- **Impact Indicators**: Visual representation of High/Medium/Low impact work distribution per portfolio
- **Week Filter**: Filter all visualizations by week or view all time
- **Summary Statistics**: Quick view of total tasks and hours

### View 2: Data Table
- **Sortable Columns**: Click any column header to sort (ascending/descending)
- **Column Filters**: Filter individual columns with text search
- **Global Search**: Search across all columns simultaneously
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Quick Start

**Important:** Due to browser security restrictions, you need to run a local web server to use the dashboard.

**Option 1: Use the startup script (Easiest)**
1. Open Terminal
2. Navigate to the dashboard folder:
   ```bash
   cd /Users/ts73344/Desktop/claudeTest/work-dashboard-app
   ```
3. Run the startup script:
   ```bash
   ./start-server.sh
   ```
4. The dashboard will open automatically at `http://localhost:8000`
5. Keep the terminal window open while using the dashboard
6. Press `Ctrl+C` in the terminal to stop the server when done

**Option 2: Manual server start**
1. Open Terminal
2. Navigate to the dashboard folder:
   ```bash
   cd /Users/ts73344/Desktop/claudeTest/work-dashboard-app
   ```
3. Start the server:
   ```bash
   ruby -run -ehttpd . -p8000
   ```
4. Open your browser and go to: `http://localhost:8000/index.html`

**Navigating the Dashboard:**
- Click "Dashboard" tab for visualizations
- Click "Data Table" tab for detailed data table
- Bookmark `http://localhost:8000/index.html` for easy access

### File Structure

```
work-dashboard-app/
├── index.html              # Dashboard view (main page)
├── table.html              # Data table view
├── ts_work_data.csv        # Your work data (CSV)
├── css/
│   └── styles.css          # Professional styling
├── js/
│   ├── csvParser.js        # CSV data parsing logic
│   ├── charts.js           # Chart.js visualizations
│   ├── dashboard.js        # Dashboard view controller
│   └── table.js            # Table view controller
└── README.md               # This file
```

## Using the Dashboard

### Dashboard View

**Week Filter:**
- Select "All Time" to see data across all weeks
- Choose a specific week to filter all charts to that week only

**Category Pie Chart:**
- Hover over slices to see hours and percentages
- Legend shows all work categories with color coding

**Portfolio Bar Chart:**
- Compare portfolios side-by-side across weeks
- Hover over bars to see exact hours for each portfolio
- Grouped view makes it easy to spot trends

**Impact Indicators:**
- Shows distribution of High/Medium/Low impact tasks
- Horizontal bars with counts
- Sorted by total tasks (most active portfolios first)

### Table View

**Sorting:**
- Click any column header to sort
- Click again to reverse sort order
- Arrow indicator shows current sort

**Filtering:**
- Type in column filter boxes to search that specific column
- Use global search box to search across all columns
- Multiple filters work together (AND logic)
- Click "Clear All Filters" to reset

**Tips:**
- Filters are debounced (300ms delay) for better performance
- Case-insensitive search
- Partial matches work (e.g., "assort" finds "Assortment")

## Color Scheme

### Categories
- **Doer**: Blue (#3B82F6)
- **Collaborator**: Green (#10B981)
- **Facilitator**: Amber (#F59E0B)
- **Enabler**: Purple (#8B5CF6)

### Impact Levels
- **High**: Red (#DC2626)
- **Medium**: Orange (#F59E0B)
- **Low**: Green (#10B981)

### Portfolios
- **Assortment**: Blue (#3B82F6)
- **Item**: Green (#10B981)
- **S/I/A**: Amber (#F59E0B)
- **Supplier**: Purple (#8B5CF6)
- **MX/SC**: Pink (#EC4899)
- **KTD**: Teal (#14B8A6)
- **Other**: Gray (#6B7280)

## Technical Details

### Technologies Used
- **HTML5/CSS3**: Structure and styling
- **Vanilla JavaScript (ES6+)**: Application logic
- **Chart.js 4.4.1**: Data visualizations (CDN)
- **PapaParse 5.4.1**: CSV parsing (CDN)

### Browser Compatibility
- Chrome/Edge (recommended)
- Firefox
- Safari
- Any modern browser with ES6 support

### Performance
- Handles 300+ rows efficiently
- Debounced filtering (300ms) prevents lag
- Responsive charts resize smoothly
- Virtual scrolling not needed for current dataset size

## Data Format

The dashboard expects a CSV file with the following columns:

1. **Date**: Task date (e.g., "November 20, 2025")
2. **Tasks**: Description of work performed
3. **Category**: Doer | Collaborator | Facilitator | Enabler
4. **Time**: Duration (e.g., "2 hr", "30 min", "1.5 hr")
5. **Task Code**: Type of task
6. **Portfolio**: Portfolio/area (Assortment, Item, S/I/A, etc.)
7. **Impact**: High | Medium | Low
8. **Role Expectations**: Role expectation category
9. **Notes**: Additional details
10. **Sr. Director Comments**: Manager comments

### Updating Data

To use different data:
1. Replace `ts_work_data.csv` with your CSV file
2. Ensure column headers match exactly (case-sensitive)
3. Refresh the browser

## Accessibility Features

- ARIA labels on all charts and interactive elements
- Keyboard navigation support
- High contrast color scheme (WCAG AA compliant)
- Focus indicators on all interactive elements
- Screen reader friendly
- Reduced motion support for users with vestibular disorders

## Troubleshooting

### "Error loading data" message?
**This is the most common issue!**
- You MUST use a local web server - don't open index.html directly
- Run `./start-server.sh` or use the manual server start method above
- Access via `http://localhost:8000/index.html` (NOT `file://...`)
- Browser security blocks CSV loading from `file://` URLs

### Server won't start?
- Make sure port 8000 is not already in use
- Try a different port: `ruby -run -ehttpd . -p8080`
- Then access via `http://localhost:8080/index.html`

### Charts not showing?
- Check browser console for errors (F12)
- Verify `ts_work_data.csv` is in the same folder as index.html
- Refresh the page (Cmd+R on Mac, Ctrl+R on Windows)
- Make sure the server is still running in the terminal

### Data looks wrong?
- Verify CSV format matches expected structure
- Check for special characters or encoding issues
- Look for week separator rows or empty rows (should be auto-filtered)

### Performance issues?
- Try filtering to a specific week
- Check dataset size (optimized for ~300-500 rows)
- Close other browser tabs

## Future Enhancements

Potential features for future versions:
- Export filtered data to CSV/Excel
- Custom date range picker
- Additional chart types (timeline, treemap)
- Dark mode toggle
- Print-friendly layouts
- Data comparison tools
- Backend integration for real-time updates

## Support

For questions or issues:
1. Check the browser console for error messages
2. Verify CSV file format and location
3. Test with original sample data
4. Ensure modern browser with JavaScript enabled

---

**Version**: 1.0.0 (MVP)
**Created**: February 2026
**Built with**: Vanilla JavaScript, Chart.js, PapaParse
