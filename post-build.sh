!/usr/bin/env bash

set -e
set -x

export PATH="/home/user/.nvm/versions/node/v22.22.0/bin/:$PATH"
(cd backend && npm install && npm run build)

export NODE_OPTIONS=--openssl-legacy-provider
(cd frontend && npm install && npm run build)

#pm2 reload backend --env production ecosystem.config.js
NODE_ENV=production pm2 reload all --update-env