import { proxy } from "./proxy";
import app from "./app";

/*
|---------------------------
| Starting
|---------------------------
*/
const server = app.listen(Number(process.env.PORT), process.env.IP, () => {
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

export default server;
