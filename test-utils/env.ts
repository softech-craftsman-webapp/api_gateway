import * as dotenv from "dotenv";
import { join } from 'path';

// Environment
dotenv.config({ path: join(__dirname, "./../.env")});;

export default process.env;
