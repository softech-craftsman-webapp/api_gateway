import axios from './../axios'
import env from './../env'

// Base path
const BASE_PATH = env.MAIN_API_SERVICE_URL;

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

export { MainApiDocs };
