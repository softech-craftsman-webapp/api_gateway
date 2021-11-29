import express, { Request, Response } from 'express'
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
  'methods': 'GET,HEAD,PUT,POST,DELETE,OPTIONS',
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
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: join(__dirname, "./../.env") });
} else {
  dotenv.config({ path: join(__dirname, "./../../.env") });
}

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
app.all('/files/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
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
app.all('/auth/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
    ...options,
    target: `${AUTH_SERVICE_URL}`
  });
});

// endpoint :/users
app.all('/users/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
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
app.all('/categories/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/jobs
app.all('/jobs/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/locations
app.all('/locations/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/locations
app.all('/ratings/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/transactions
app.all('/transactions/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/user-details
app.all('/user-details/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/contracts
app.all('/contracts/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});

// endpoint :/statistics
app.all('/statistics/*', async (req: Request, res: Response) => {
  return await proxy.web(req, res, {
    ...options,
    target: `${MAIN_API_SERVICE_URL}`
  });
});


export default app;
