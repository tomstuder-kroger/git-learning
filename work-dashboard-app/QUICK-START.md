# Work Dashboard - Quick Start Guide

## 🚀 How to Start the Dashboard

### The Simple Way:
1. Open Terminal
2. Type (or copy/paste):
   ```bash
   cd /Users/ts73344/Desktop/claudeTest/work-dashboard-app
   ./start-server.sh
   ```
3. Dashboard opens automatically!
4. **Keep the terminal window open**
5. Use your browser normally to view the dashboard
6. When done, press `Ctrl+C` in terminal to stop

---

## 📍 Access the Dashboard

**Dashboard URL:** `http://localhost:8000/index.html`
**Table URL:** `http://localhost:8000/table.html`

💡 **Bookmark these URLs for quick access!**

---

## ⚠️ Important Notes

### Why do I need to run a server?
Modern browsers block loading CSV files from `file://` URLs for security. The local server (running on your computer only) allows the dashboard to work properly.

### Can't I just double-click index.html?
No - you'll get "Error loading data" because of browser security. **Always use the server.**

### Is this safe?
Yes! The server only runs on your computer (localhost). Nobody else can access it. It's just a way to view local files.

### Server keeps stopping?
Don't close the terminal window while using the dashboard. The server runs there.

---

## 🎯 Common Tasks

### View different weeks:
- Click the week dropdown in the Dashboard view
- Select a specific week or "All Time"

### Sort the table:
- Go to Table view
- Click any column header to sort

### Filter data:
- Type in the column filter boxes
- Or use the global search at the top

### Clear filters:
- Click "Clear All Filters" button

---

## 🛑 Stopping the Server

When you're done with the dashboard:
1. Go to the terminal window
2. Press `Ctrl+C`
3. Server stops, terminal is free to use again

---

## 🆘 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Error loading data" | Start the server! Don't open HTML directly |
| Charts not appearing | Refresh page (Cmd+R), check server is running |
| Port already in use | Use different port: `ruby -run -ehttpd . -p8080` |
| Server stopped | Run `./start-server.sh` again |

---

## 📂 File Location

The dashboard is located at:
```
/Users/ts73344/Desktop/claudeTest/work-dashboard-app/
```

To update data:
- Replace `ts_work_data.csv` with new data
- Refresh browser (no need to restart server)

---

## 💡 Pro Tips

1. **Bookmark the URL:** `http://localhost:8000/index.html`
2. **Keep terminal minimized** while using dashboard
3. **Use Chrome/Edge** for best performance
4. **Filter by week** for faster loading with large datasets
5. **Export data** by copying filtered table rows

---

**Need more help?** Check the full README.md file!
