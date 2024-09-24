import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/appiGroups.json')));
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;



test('Update API groups', async ({ request,global }) => {
    const requestBody= dataset['UpdateAPIgroups']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});


test('Get API group details', async ({ request,global }) => {
    const requestBody= dataset['GetAPIgroupdetails']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Get All API groups', async ({ request,global }) => {
    const requestBody= dataset['GetAllAPIGroups']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('create API groups', async ({ request,global }) => {
    const requestBody= dataset['createAPIgroups']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['createAPIgroups'][0]['requestbody'];
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    console.log("Aplication ID is :: " + responseJson.data.applicationId);
    global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
});


test('Get Apis Already Added to the Group', async ({ request,global }) => {
    const requestBody= dataset['GetApisAlreadyAddedtotheGroup']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['GetApisAlreadyAddedtotheGroup'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    console.log("Aplication ID is :: " + responseJson.data.applicationId);
    global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
});


test('List API to add to the Group', async ({ request,global }) => {
    const requestBody= dataset['ListAPItoaddtotheGroup']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Add API to the Group', async ({ request,global }) => {
    const requestBody= dataset['AddAPItotheGroup']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['AddAPItotheGroup'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    console.log("Aplication ID is :: " + responseJson.data.applicationId);
    global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
});


test('Remove API from the Group', async ({ request,global }) => {
    const requestBody= dataset['RemoveAPIfromtheGroup']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['RemoveAPIfromtheGroup'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    console.log("Aplication ID is :: " + responseJson.data.applicationId);
    global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
});


test('Update Group Logo url', async ({ request,global }) => {
    const requestBody= dataset['UpdateGroupLogourl']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});


test('Get Internal Organization List', async ({ request,global }) => {
    const requestBody= dataset['GetInternalOrganizationList']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('GET Organization Basic Details', async ({ request,global }) => {
    const requestBody= dataset['GETOrganizationBasicDetails']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('GET All Monitor Var', async ({ request,global }) => {
    const requestBody= dataset['GETAllMonitorVar']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('GET External Organisation', async ({ request,global }) => {
    const requestBody= dataset['GETExternalOrganisation']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Delete API group', async ({ request,global }) => {
    const requestBody= dataset['DeleteAPIgroup']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.DELETE(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('apigroup API list', async ({ request,global }) => {
    const requestBody= dataset['apigroupAPIlist']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['apigroupAPIlist'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    console.log("Aplication ID is :: " + responseJson.data.applicationId);
    global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
});
