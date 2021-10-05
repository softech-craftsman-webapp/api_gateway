/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
// tslint:disable-next-line: no-var-requires
const { router, server } = require('0http')();
import { options, proxy } from './proxy';
import { join } from 'path';
import * as dotenv from "dotenv";

/**
 * Load environment variables from .env file
 */
dotenv.config({ path: join(__dirname, "/../../.env")});

/*
|---------------------------
| Routing (server)
|---------------------------
*/
const FILE_SERVICE_URL = process.env.FILE_SERVICE_URL;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

/*
|---------------------------
| File Service
| endpoint: /files
|---------------------------
*/
router.all('/files/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${FILE_SERVICE_URL}`
  });
});

/*
|---------------------------
| Auth Service
| endpoint: /auth
|---------------------------
*/

// endpoint :/auth
router.all('/auth/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${AUTH_SERVICE_URL}`
  });
});

// endpoint :/users
router.all('/users/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${AUTH_SERVICE_URL}`
  });
});


/*
|---------------------------
| Starting
|---------------------------
*/
server.listen(process.env.PORT, process.env.IP, () => {
  console.log(`API Gateway has been started on port ${process.env.PORT}...`);
});

/*
|---------------------------
| Graceful shutdown
|---------------------------
*/
process.on('SIGTERM', () => {
  console.log('API Gateway service has been closed...');
  server.close(() => {
    proxy.close();
  });
});
