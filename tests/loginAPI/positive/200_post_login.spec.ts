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
const path = '/api/login'; 

test.describe('Verify that all registered emails are able to login', () => {
  VALID_EMAILS.forEach((email) => {
    test(`Login with registered email: ${email}`, async ({ }) => {
      const userData = {
        email, 
        password: "Test1@RECKIT"
      };

     
      const response = await baseAPI.sendAndGetResponse(userData, path);

      const responseBody = await response.json();
     //verifying the response 
     expect(response.status()).toBe(200);
      expect(responseBody).toHaveProperty('token'); 
    });
  });
});