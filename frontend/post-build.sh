#!/usr/bin/env bash

set -e
set -x
export PATH="/home/user/.nvm/versions/node/v22.22.0/bin/:$PATH"
export NODE_OPTIONS=--openssl-legacy-provider
(cd frontend && npm install && npm run build)