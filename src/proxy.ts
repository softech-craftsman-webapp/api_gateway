/**
 * Documentation
 * @url https://github.com/http-party/node-http-proxy
 */
/* eslint-disable @typescript-eslint/no-var-requires */
// tslint:disable-next-line: no-var-requires
const httpProxy = require('http-proxy');

/*
|---------------------------
| Options
|---------------------------
*/
const options = {
  ws: false,
  toProxy: false,
  xfwd: false,
  secure: true,
  changeOrigin: false,
  preserveHeaderKeyCase: true,
  proxyTimeout: 13000,
  timeout: 13000,
  followRedirects: true,
};

/*
|---------------------------
| proxy init
|---------------------------
*/
const proxy = httpProxy.createProxyServer(options);

/*
|---------------------------
| Error with plugin
|---------------------------
*/
proxy.on('error', (_err, _req, res) => {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });

  res.end();
});

/*
|---------------------------
| The main controller
|---------------------------
*/
// eslint-disable-next-line @typescript-eslint/no-unused-vars
proxy.on('proxyReq', (_proxyReq, req, res, _options)  => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Access-Control-Allow-Origin,X-Request-ID,X-Requested-With,Content-Type,Authorization,Accept,Origin,Access-Control-Max-Age');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
  }

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
proxy.on('proxyRes', (_proxyReq, req, res, _options)  => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, HEAD, GET, PUT, POST, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Access-Control-Allow-Origin,X-Request-ID,X-Requested-With,Content-Type,Authorization,Accept,Origin,Access-Control-Max-Age');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
  }

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
});

export { options, proxy };
