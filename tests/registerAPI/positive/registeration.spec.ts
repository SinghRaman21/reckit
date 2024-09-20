import { test, expect } from '@playwright/test';
import * as baseAPI from '../../../helper-api/commonAPI'; 

const VALID_EMAILS = [
  "george.bluth@reqres.in",
  "janet.weaver@reqres.in",
  "emma.wong@reqres.in",
  "eve.holt@reqres.in",
  "charles.morris@reqres.in",
  "tracey.ramos@reqres.in"
];

test.describe('Verify that all predefined emails gives success response', () => {
  VALID_EMAILS.forEach((email) => {
    test(`Registration with valid email: ${email}`, async ({ }) => {
      const userData = {
        email, 
        password: "123456"
      };

      const path = '/api/register'; 
      const response = await baseAPI.sendAndGetResponse(userData, path);


     //validation check
      expect(response).toHaveProperty('id');
      expect(response).toHaveProperty('token'); 
    });
  });
});