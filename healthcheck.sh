#!/bin/bash
# Health check for viadreams.cc - auto-restart on failure
HTTP_CODE=$(curl -sI -o /dev/null -w '%{http_code}' --max-time 10 http://localhost:3001 2>/dev/null)
if [ "$HTTP_CODE" != "200" ] && [ "$HTTP_CODE" != "307" ] && [ "$HTTP_CODE" != "301" ] && [ "$HTTP_CODE" != "302" ]; then
  echo "$(date): viadreams.cc DOWN (HTTP $HTTP_CODE), restarting..." >> /var/log/devtoolbox-health.log
  cd /var/www/devtoolbox
  fuser -k 3001/tcp 2>/dev/null
  sleep 2
  pm2 delete devtoolbox 2>/dev/null
  PORT=3001 pm2 start ecosystem.config.js
  pm2 save
  echo "$(date): Restart completed" >> /var/log/devtoolbox-health.log
fi
