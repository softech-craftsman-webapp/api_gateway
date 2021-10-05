/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
// tslint:disable-next-line: no-var-requires
const { router, server } = require('0http')();
import { options, proxy } from './proxy';

/*
|---------------------------
| Routing (server)
|---------------------------
*/
const FILE_SERVICE_URL = 'http://127.0.0.1:5000'
const AUTH_SERVICE_URL = 'http://127.0.0.1:8080'

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
server.listen(80, '0.0.0.0', () => {
  console.log('API Gateway has been started...');
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
