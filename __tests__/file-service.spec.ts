import { MainApiDocs } from './../test-utils/mocks/file-service';

describe(`FileService/OpenApiTest`, () => {
    it('should return 200', async () => {
        const response = await MainApiDocs();
        expect(response.status).toBe(200);
    });
});
