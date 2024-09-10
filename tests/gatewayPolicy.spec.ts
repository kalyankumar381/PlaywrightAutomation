import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/gatewayPolicy.json')));
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;

test('Get  Group Attached monitor policy', async ({ request,global }) => {
    const requestBody= dataset['getGroupAttachedMonitorPolicy']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
});

test('Group  monitor policy attach', async ({ request,global }) => {
    const requestBody= dataset['groupMonitorPolicyAttach']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'data.message');
    console.log('>>>>>>>>>>>>> ::' + msg[0]);
    
});
test('Remove Group attached monitor  policy.', async ({ request,global }) => {
    const requestBody= dataset['removeGroupAttachedMonitorPolicy']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.DELETE(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'data.message');
    console.log('>>>>>>>>>>>>> ::' + msg[0]);        
});

test('GET all policy list', async ({ request,global }) => {
    const requestBody= dataset['getAllPolicyList']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}`  
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('DELETE policy', async ({ request,global }) => {
    const requestBody= dataset['deletePolicy']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.DELETE(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'data.message');
    console.log("Response data message is <><> :: " + msg);
    
    // expect(msg[0]).toBe('Invalid Resource Access.');        
});

test('ADD policy', async ({ request,global }) => {
    const requestBody= dataset['addPolicy']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('UPDATE policy', async ({ request,global }) => {
    const requestBody= dataset['updatePolicy']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`     
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'data.message');
    console.log("Response message >>>> :::: " + msg);
    
    // expect(msg[0]).toBe('Invalid Resource Access.');        
});

test('Attach gateway policy at api-group', async ({ request,global }) => {
    const requestBody= dataset['attachGatewayPolicyAtApiGroup']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    // console.log(await _response.json());   
    // const responseJson=await _response.json();    
    // console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('GET allattachedentity', async ({ request,global }) => {
    const requestBody= dataset['getAllattachedentity']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}`  
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

