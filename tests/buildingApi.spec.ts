import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/buildingApi.json')));
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;

test('Make API', async ({ request,global }) => {
    const requestBody= dataset['makeAPI']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});

test('API Environment', async ({ request,global }) => {
    const requestBody= dataset['apiEnvironment']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});

test('Update API Environment ', async ({ request,global }) => {
    const requestBody= dataset['updateAPIEnvironment']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});

test('Get API Remote End Points', async ({ request,global }) => {
    const requestBody= dataset['getAPIRemoteEndPoints']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get API Custom Logic', async ({ request,global }) => {
    const requestBody= dataset['getAPICustomLogic']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Deploy Functions', async ({ request,global }) => {
    const requestBody= dataset['deployFunctions']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    // console.log(await _response.json());   
    // const responseJson=await _response.json();    
    // console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Update API Custom Logic', async ({ request,global }) => {
    const requestBody= dataset['updateAPICustomLogic']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
});

test('Delete API Custom Logic', async ({ request,global }) => {
    const requestBody= dataset['deleteAPICustomLogic']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.DELETE(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
  
});


test('Insert Security Key Data', async ({ request,global }) => {
    const requestBody= dataset['insertSecurityKeyData']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    // console.log(await _response.json());   
    // const responseJson=await _response.json();    
    // console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Get Security Key Data', async ({ request,global }) => {
    const requestBody= dataset['getSecurityKeyData']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    
});


test('Delete Security Key Data', async ({ request,global }) => {
    const requestBody= dataset['deleteSecurityKeyData']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.DELETE(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
  
});

test('Remote EndPoints POST', async ({ request,global }) => {
    const requestBody= dataset['remoteEndPointsPOST']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Custom API Logic POST', async ({ request,global }) => {
    const requestBody= dataset['customAPILogicPOST']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get API Error info', async ({ request,global }) => {
    const requestBody= dataset['getAPIErrorInfo']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    
});


test('Update API Error Info', async ({ request,global }) => {
    const requestBody= dataset['updateAPIErrorInfo']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});

test('Remote EndPoints PUT', async ({ request,global }) => {
    const requestBody= dataset['remoteEndPointsPUT']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});
