import { MainApiDocs, PublicKey } from './../test-utils/mocks/auth-service';

/**
 * Check if the auth service is reachable
 */
describe(`AuthService/OpenApiTest`, () => {
  it('should return 200', async () => {
    const response = await MainApiDocs();
    expect(response.status).toBe(200);
  });

  it('title should be Swagger UI', async () => {
    const response = await MainApiDocs();
    expect(response.data).toContain('<title>Swagger UI</title>');
  });
});

/**
 * Public Key Test
 */
describe(`auth_endpoint/auth/public-key`, () => {
  it('PublicKey', async () => {
    const response = await PublicKey();
    expect(response.status).toBe(200);
  });

  it('should not be empty', async () => {
    const response = await PublicKey();
    expect(response.data).toContain("-----BEGIN PUBLIC KEY-----");
    expect(response.data).toContain("-----END PUBLIC KEY-----");
  });
});
