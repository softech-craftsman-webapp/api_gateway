import axios from './../axios'
import env from './../env'

// Base path
const BASE_PATH = env.AUTH_SERVICE_URL;

/**
 * Main API Service
 * path : /openapi/index.html
 * method : GET
 * description : Get the OpenAPI specification
 */
async function MainApiDocs(): Promise<any> {
  const response = await axios.get(`${BASE_PATH}/openapi/index.html`);
  return response
}

/**
 * Main API Service
 * path : /auth/public-key
 * method : GET
 * description : Get the public key
 */
 async function PublicKey(): Promise<any> {
  const response = await axios.get(`${BASE_PATH}/auth/public-key`);
  return response
}

export { MainApiDocs, PublicKey };
