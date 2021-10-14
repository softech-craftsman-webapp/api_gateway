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
| Cors Origin Resource Sharing
|---------------------------
*/
server.use((_req:any, res:any, next:any) => {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Request-ID,X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/*
|---------------------------
| Routing (server)
|---------------------------
*/
const FILE_SERVICE_URL = process.env.FILE_SERVICE_URL;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const MAIN_API_SERVICE_URL = process.env.MAIN_API_SERVICE_URL;

/*
|---------------------------
| File Service
|---------------------------
*/

// endpoint: /files
router.all('/files/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${FILE_SERVICE_URL}`
  });
});

/*
|---------------------------
| Auth Service
|---------------------------
*/

// endpoint: /auth
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
| Main API
|---------------------------
*/

// endpoint: /categories
router.all('/categories/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/jobs
router.all('/jobs/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/locations
router.all('/locations/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/locations
router.all('/ratings/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/transactions
router.all('/transactions/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/user-details
router.all('/user-details/*', (req: any, res: any) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
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
