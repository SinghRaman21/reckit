import { test, expect } from '@playwright/test';
import * as baseAPI from '../../../helper-api/commonAPI'; 

const INVALID_PASSWORDS = [
    // Less than 6 characters
    { email: "george.bluth@reqres.in", password: "Pwd1!" }, 
    { email: "janet.weaver@reqres.in", password: "1234" }, 
    { email: "emma.wong@reqres.in", password: "abc" }, 

    // No uppercase letter
    { email: "eve.holt@reqres.in", password: "password1!" },
    { email: "charles.morris@reqres.in", password: "123456!" },
  
    // No number
    { email: "tracey.ramos@reqres.in", password: "Password!" }, 
    { email: "george.bluth@reqres.in", password: "abcdef!" }, 
  
    // No special character
    { email: "janet.weaver@reqres.in", password: "Password1" }, 
    { email: "emma.wong@reqres.in", password: "ABCdef123" }, 
  
    // Less than 6 characters and missing multiple conditions
    { email: "eve.holt@reqres.in", password: "Abc" }, 
    { email: "charles.morris@reqres.in", password: "1234!" }, 
    { email: "tracey.ramos@reqres.in", password: "Pass" }, 
  ];


  

const path = '/api/register'; 



test('verify if done registration with mails other than predefined email it should give 400 ', async () => {
    const userData = {
        email:'invalid@reckit.com', 
        password: "Test1@RECKIT"
      };

     
      const response = await baseAPI.sendAndGetResponse(userData, path);

     const responseBody = await response.json(); 

     expect(response.status()).toBe(400);
     expect(responseBody.error).toBe('Note: Only defined users succeed registration');

    });
     
 

    test.describe('User Registration with various Invalid Passwords', () => {
        INVALID_PASSWORDS.forEach((userData) => {
          test(`Should fail registration with invalid password: ${userData.password}`, async () => {
            const response = await baseAPI.sendAndGetResponse(userData, path);
            expect(response.status()).toBe(400); 
        
          });
        });
      });


      test('verify registration should fail with already regsitered  email ', async () => {
        const userData = {
            email:'george.bluth@reqres.in', 
            password: "Test1@RECKIT"
          };
    
         
          const response = await baseAPI.sendAndGetResponse(userData, path);
    
         const responseBody = await response.json(); 
    
         expect(response.status()).toBe(400);
         expect(responseBody.error).toBe('Note: Only defined users succeed registration');
    
        });


        test('Verify user cannot register with empty password in body', async () => {
          const userData = {
              email:'emma.wong@reqres.in', 
              password: ""
            };
      
           
          const response = await baseAPI.sendAndGetResponse(userData, path);
      
           const responseBody = await response.json(); 
      
           expect(response.status()).toBe(400);
           expect(responseBody.error).toBe('Missing password');
      });

      test('Verify user cannot register with empty email in body', async () => {
        const userData = {
            email:'', 
            password: "Test1@RICKET"
          };
    
         
        const response = await baseAPI.sendAndGetResponse(userData, path);
    
         const responseBody = await response.json(); 
    
         expect(response.status()).toBe(400);
         expect(responseBody.error).toBe('Missing email or username');
    });


        









  


    


  



    
  