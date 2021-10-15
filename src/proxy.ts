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
  secure: false,
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
proxy.on('proxyReq', (_proxyReq, _req, _res, _options)  => {
  // TODO: Add your own logic here
});

export { options, proxy };
