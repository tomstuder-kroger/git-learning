# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

The app requires a local web server (browser security blocks CSV loading from `file://` URLs).

```bash
./start-server.sh        # starts server and opens browser at http://localhost:8000
# or manually:
ruby -run -ehttpd . -p8000
```

No build step, no dependencies to install. All JS libraries (Chart.js, PapaParse) are loaded from CDN.

After editing files, a hard refresh (**Cmd+Shift+R**) is sufficient — no server restart needed for static file changes.

## Architecture

Two independent pages, each with its own controller:

- **`index.html`** — Dashboard view. Loads `dashboard.js` + `charts.js`.
- **`table.html`** — Data table view with sorting, filtering, and pagination. Loads `table.js`.

Both pages share a single CSS file (`css/styles.css`) and the `csvParser.js` module.

### Data flow

`csvParser.js` exposes a single global instance `dataParser` (a `WorkDataParser` class). Both pages call `dataParser.loadCSV()` on init, which fetches and parses `ts_work_data.csv` via PapaParse. The parsed data is stored in `dataParser.parsedData` as structured objects with fields like `date`, `dateObj`, `weekStart`, `timeInMinutes`, `category`, `portfolio`, `impact`, etc.

Key parsing logic in `csvParser.js`:
- `isValidDataRow()` — filters out week separator rows and empty rows from the CSV
- `parseTime()` — handles time strings like `"2 hr"`, `"30 min"`, `"1.5 hr"`
- `normalizePortfolio()` — maps variations (e.g. `"SIA"` → `"S/I/A"`)
- Aggregation helpers (`aggregateByCategory`, `getPortfolioByWeek`, `getImpactByPortfolio`) are used by `charts.js`

### Table pagination

`DataTable` in `table.js` maintains `currentPage` and `rowsPerPage` (default 20). `renderTable()` slices `filteredData` to the current page. `renderPagination()` builds a 5-page window around the current page and updates the DOM. All filter/sort operations reset `currentPage` to 1.

## Design System

UI is aligned to the **MX Component Library (Legacy)** Figma file (`amwx9qndUaKDBP3IKW8fbR`). Key tokens applied in `styles.css`:

| Token | Value |
|---|---|
| Font | Roboto (Google Fonts), Regular 400 |
| Text primary | `#1D1E1F` |
| Border | `#BBBCBE` |
| Active/accent blue | `#3273D1` |
| Table cell height | 32px (small), header 50px |
| Cell padding | `2px 8px` |

Category badges use a **light tinted bg + colored border** pattern (matching the Figma Status Tag component) — not solid fills.

## CSV Data Format

Expected columns (case-sensitive headers):
`Date`, `Tasks`, `Category`, `Time`, `Task Code`, `Portfolio`, `Impact`, `Role Expectations`, `Notes`, `Sr. Director Comments`

- **Category** values: `Doer`, `Collaborator`, `Facilitator`, `Enabler`
- **Impact** values: `High`, `Medium`, `Low`
- **Time** format: `"2 hr"`, `"30 min"`, `"1.5 hr"` (parsed to minutes internally)
