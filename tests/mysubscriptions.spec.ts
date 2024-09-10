import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/mySubscription.json')));
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;

test('get cumulative metrics for error code', async ({ request,global }) => {
    const requestBody= dataset['getcumulativemetricsforerrorcode']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'data.message');
    expect(msg[0]).toBe('No data found.');        
});

test('Get Curl Data for Subscription', async ({ request,global }) => {
    const requestBody= dataset['GetCurlDataforSubscription']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});
for(let i=0;i<dataset['GetAllSubscription'].length;i++){
test(`Get All Subscription -- iteration - ${i+1} `, async ({ request,global }) => {
    const requestBody= dataset['GetAllSubscription']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[i].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[i].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});
}


test('Curl Preview Consumers', async ({ request,global }) => {
    const requestBody= dataset['curlPreviewConsumers']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'message');
    expect(msg[0]).toBe('Invalid Resource Access.');        
});

test('Add Review', async ({ request,global }) => {
    const requestBody= dataset['addReview']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'401');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get Reviews', async ({ request,global }) => {
    const requestBody= dataset['getReviews']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'data.message');
    console.log("Response data message is <><> :: " + msg);
    
    // expect(msg[0]).toBe('Invalid Resource Access.');        
});

test('Update Review', async ({ request,global }) => {
    const requestBody= dataset['updateReview']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get User Reviews', async ({ request,global }) => {
    const requestBody= dataset['getUserReviews']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'message');
    console.log("Response message >>>> :::: " + msg);
    
    // expect(msg[0]).toBe('Invalid Resource Access.');        
});

test('Get Specification For Download', async ({ request,global }) => {
    const requestBody= dataset['getSpecificationForDownload']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    // console.log(await _response.json());   
    // const responseJson=await _response.json();    
    // console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get All Attached Policy', async ({ request,global }) => {
    const requestBody= dataset['getAllAttachedPolicy']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get Application Keys', async ({ request,global }) => {
    const requestBody= dataset['getApplicationKeys']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'message');
    console.log("Response message >>>> :::: " + msg);
    
    // expect(msg[0]).toBe('Invalid Resource Access.');        
});

test('Fetch Subscription Details', async ({ request,global }) => {
    const requestBody= dataset['fetchSubscriptionDetails']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,'200');
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'message');
    console.log("Response message >>>> :::: " + msg);
    
    // expect(msg[0]).toBe('Invalid Resource Access.');        
});

test('Get AllSubscribed Organization Details', async ({ request,global }) => {
    const requestBody= dataset['getAllSubscribedOrganizationDetails']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get remaining Tryouts', async ({ request,global }) => {
    const requestBody= dataset['getremainingTryouts']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Added APIName', async ({ request,global }) => {
    const requestBody= dataset['addedAPIName']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


