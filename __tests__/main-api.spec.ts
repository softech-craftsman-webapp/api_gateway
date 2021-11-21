import { MainApiDocs } from './../test-utils/mocks/main-api';

describe(`MainApi/OpenApiTest`, () => {
  it('should return 200', async () => {
    const response = await MainApiDocs();
    expect(response.status).toBe(200);
  });

  it('title should be Swagger UI', async () => {
    const response = await MainApiDocs();
    expect(response.data).toContain('<title>Swagger UI</title>');
  });
});
