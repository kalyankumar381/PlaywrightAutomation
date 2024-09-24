import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/userProfileAuthentication.json')));
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;



test('Authentication', async ({ request,global }) => {
    const requestBody= dataset['Authentication']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['Authentication'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
              
});



test('Registration', async ({ request,global }) => {
    const requestBody= dataset['Registration']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['Registration'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
              
});



test('Reset Password Link', async ({ request,global }) => {
    const requestBody= dataset['ResetPasswordLink']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['ResetPasswordLink'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
              
});



test('Password Reset', async ({ request,global }) => {
    const requestBody= dataset['PasswordReset']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['PasswordReset'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
              
});



test('Profile View', async ({ request,global }) => {
    const requestBody= dataset['ProfileView']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Password Change', async ({ request,global }) => {
    const requestBody= dataset['PasswordChange']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});


test('Profile Update', async ({ request,global }) => {
    const requestBody= dataset['ProfileUpdate']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});


test('Internal Token Validity', async ({ request,global }) => {
    const requestBody= dataset['InternalTokenValidity']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['InternalTokenValidity'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
              
});



test('Account Activation Mail', async ({ request,global }) => {
    const requestBody= dataset['AccountActivationMail']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['AccountActivationMail'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
              
});



test('PUT update Preferences', async ({ request,global }) => {
    const requestBody= dataset['PUTupdatePreferences']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});


test('Update Profile Pic', async ({ request,global }) => {
    const requestBody= dataset['UpdateProfilePic']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});


test('GET Preferences', async ({ request,global }) => {
    const requestBody= dataset['GETPreferences']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('DELETE Profile Pic', async ({ request,global }) => {
    const requestBody= dataset['DELETEProfilePic']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.DELETE(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});