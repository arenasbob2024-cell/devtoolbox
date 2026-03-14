#!/bin/bash
set -e
cd /var/www/devtoolbox

echo "$(date): Starting deployment..."

# Pull latest code
git pull origin main

# Install dependencies
npm install --production=false

# Build with increased memory
NODE_OPTIONS='--max-old-space-size=4096' npm run build

# Stop existing process gracefully
pm2 delete devtoolbox 2>/dev/null || true
sleep 2

# Start using ecosystem config (ensures PORT=3001)
pm2 start ecosystem.config.js
pm2 save

echo "$(date): Deploy complete!"

# Verify the app is responding
sleep 5
HTTP_CODE=$(curl -sI -o /dev/null -w '%{http_code}' --max-time 10 http://localhost:3001 2>/dev/null)
if [ "$HTTP_CODE" = "200" ] || [ "$HTTP_CODE" = "307" ] || [ "$HTTP_CODE" = "301" ] || [ "$HTTP_CODE" = "302" ]; then
  echo "$(date): Health check PASSED (HTTP $HTTP_CODE)"
else
  echo "$(date): WARNING - Health check returned HTTP $HTTP_CODE"
fi
