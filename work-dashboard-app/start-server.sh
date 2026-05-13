#!/bin/bash
# Start local web server for Work Dashboard

echo "🚀 Starting Work Dashboard server..."
echo "📊 Dashboard will be available at: http://localhost:8000"
echo "🌐 Opening dashboard in your browser..."
echo ""
echo "⚠️  Keep this terminal window open while using the dashboard"
echo "⌨️  Press Ctrl+C to stop the server"
echo ""

# Navigate to dashboard directory
cd "$(dirname "$0")"

# Open browser
open http://localhost:8000/index.html

# Start server
ruby -run -ehttpd . -p8000
