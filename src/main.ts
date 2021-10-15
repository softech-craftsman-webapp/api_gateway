import express, {Request, Response} from 'express'
import { options, proxy } from './proxy';
import { join } from 'path';
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import timeout from "connect-timeout";
import compression from "compression";

/*
|---------------------------
| Application initialization
|---------------------------
*/
const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1)
app.set('json spaces', 40);
app.use(timeout('60s'));
app.use(cors({
  'allowedHeaders': [
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Origin',
    'X-Request-ID',
    'X-Requested-With',
    'Content-Type',
    'Authorization',
    'Accept',
    'Origin',
    'Access-Control-Max-Age'
  ],
  'exposedHeaders': ['X-Request-ID'],
  'origin': '*',
  'methods': 'GET,HEAD,PUT,POST,DELETE',
  'preflightContinue': false
}));
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());;
app.use(helmet.xssFilter());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(compression());

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
const MAIN_API_SERVICE_URL = process.env.MAIN_API_SERVICE_URL;

/*
|---------------------------
| File Service
|---------------------------
*/

// endpoint: /files
app.all('/files/*', (req: Request, res: Response) => {
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
app.all('/auth/*', (req: Request, res: Response) => {
  proxy.web(req, res, {
    ...options,
    target: `${AUTH_SERVICE_URL}`
  });
});

// endpoint :/users
app.all('/users/*', (req: Request, res: Response) => {
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
app.all('/categories/*', (req: Request, res: Response) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/jobs
app.all('/jobs/*', (req: Request, res: Response) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/locations
app.all('/locations/*', (req: Request, res: Response) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/locations
app.all('/ratings/*', (req: Request, res: Response) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/transactions
app.all('/transactions/*', (req: Request, res: Response) => {
  proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/user-details
app.all('/user-details/*', (req: Request, res: Response) => {
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
const server = app.listen(parseInt(process.env.PORT, 10), process.env.IP, () => {
  console.log(`API Gateway has been started on port ${process.env.PORT}...`);
});

/*
|---------------------------
| Graceful shutdown
|---------------------------
*/
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('API Gateway service has been closed...');
    proxy.close();
  })
});
