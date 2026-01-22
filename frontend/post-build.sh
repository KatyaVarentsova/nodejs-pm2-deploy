!/usr/bin/env bash

set -e
set -x

export NODE_OPTIONS=--openssl-legacy-provider
(cd frontend && npm install && npm run build)