#!/usr/bin/bash

./node_modules/.bin/cross-env NODE_ENV=production ./node_modules/.bin/pm2 start process.yml && tail -f /dev/null
