/* eslint-disable jest/expect-expect */
import request from "supertest";

import server from "./../src/main";
import randomString from './../test-utils/random';

/**
 * Endpoints test
 */
jest.setTimeout(30000);

// test /auth/:*
describe('Endpoints', () => {
  it('auth', async () => {
    await request(server)
      .get(`/auth/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('files', async () => {
    await request(server)
      .get(`/files/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('users', async () => {
    await request(server)
      .get(`/users/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('categories', async () => {
    await request(server)
      .get(`/categories/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('jobs', async () => {
    await request(server)
      .get(`/jobs/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('locations', async () => {
    await request(server)
      .get(`/locations/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('ratings', async () => {
    await request(server)
      .get(`/ratings/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('transactions', async () => {
    await request(server)
      .get(`/transactions/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('user-details', async () => {
    await request(server)
      .get(`/user-details/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('contracts', async () => {
    await request(server)
      .get(`/contracts/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });

  it('statistics', async () => {
    await request(server)
      .get(`/statistics/${randomString(8)}`)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400);
  });
});
