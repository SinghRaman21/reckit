import { test, expect } from '@playwright/test';
import * as baseAPI from '../../../helper-api/commonAPI'; 

const loginpath = '/api/login'; 
const registerpath = '/api/register'

test('Should fail login with invalid email', async () => {
    const userData = {
        email:'invalid@reckit.com', 
        password: "Test1@RECKIT"
      };

     
    const response = await baseAPI.sendAndGetResponse(userData, loginpath);

     const responseBody = await response.json(); 

     expect(response.status()).toBe(400);
     expect(responseBody.error).toBe('user not found');
});


test.describe('Password Validation Tests', () => {
    test('Should fail login if password does not match registration password', async () => {
        const userData = {
            email: "emma.wong@reqres.in",
            password: "ValidPassword1!"
        };
        // Step 1: Register the user with a valid password
        const registrationResponse = await baseAPI.sendAndGetResponse(userData, registerpath);
        const registerationResponseBody = await registrationResponse.json(); 
        expect(registerationResponseBody).toHaveProperty('id'); 
        expect(registerationResponseBody).toHaveProperty('token'); 
        
        // Step 2: Attempt login with the same email but a different password
        const invalidLoginData = {
            email: userData.email,
            password: "WrongPassword1!" // Invalid password
        };
        
        const loginResponse = await baseAPI.sendAndGetResponse(invalidLoginData, loginpath);
        expect(loginResponse.status()).toBe(400); 

        const responseBody = await loginResponse.json();
        expect(responseBody.error).toBeDefined(); 
    });
});

test('Verify user cannot login with empty password in body', async () => {
    const userData = {
        email:'emma.wong@reqres.in', 
        password: ""
      };

     
    const response = await baseAPI.sendAndGetResponse(userData, loginpath);

     const responseBody = await response.json(); 

     expect(response.status()).toBe(400);
     expect(responseBody.error).toBe('Missing password');
});

test('Verify user cannot login with empty email in body', async () => {
    const userData = {
        email:'', 
        password: "Test1@RICKET"
      };

     
    const response = await baseAPI.sendAndGetResponse(userData, loginpath);

     const responseBody = await response.json(); 

     expect(response.status()).toBe(400);
     expect(responseBody.error).toBe('Missing email or username');
});

