import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/publicAPis.json')));
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;

test('Public API View', async ({ request,global }) => {
    const requestBody= dataset['PublicAPIView']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['PublicAPIView'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));               
});


test('Get API by Name', async ({ request,global }) => {
    const requestBody= dataset['GetAPIbyName']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['GetAPIbyName'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));               
});


test('Public Tags GET', async ({ request,global }) => {
    const requestBody= dataset['PublicTagsGET']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['PublicTagsGET'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));               
});


test('Public API GET', async ({ request,global }) => {
    const requestBody= dataset['PublicAPIGET']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['PublicAPIGET'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));               
});


test('POST Fetch Api list according to Api Name', async ({ request,global }) => {
    const requestBody= dataset['POSTFetchApilistaccordingtoApiName']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['POSTFetchApilistaccordingtoApiName'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));               
});


test('POST categories preview', async ({ request,global }) => {
    const requestBody= dataset['POSTcategoriespreview']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['POSTcategoriespreview'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));               
});


test('POST apiView preview', async ({ request,global }) => {
    const requestBody= dataset['POSTapiViewpreview']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['POSTapiViewpreview'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));               
});


test('POST apiList Preview', async ({ request,global }) => {
    const requestBody= dataset['POSTapiListPreview']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['POSTapiListPreview'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));               
});