#!/bin/bash
set -e
cd /var/www/devtoolbox
git pull origin main
npm install --production=false
NODE_OPTIONS='--max-old-space-size=4096' npm run build
pm2 restart devtoolbox
echo 'Deploy complete!'
