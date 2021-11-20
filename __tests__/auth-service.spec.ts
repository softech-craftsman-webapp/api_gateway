import { MainApiDocs } from './../test-utils/mocks/auth-service';

describe(`AuthService/OpenApiTest`, () => {
    it('should return 200', async () => {
        const response = await MainApiDocs();
        expect(response.status).toBe(200);
    });
});
