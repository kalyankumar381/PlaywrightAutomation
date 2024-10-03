import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/applications.json')));
import dotenv from 'dotenv';
import ApiCommonPage from '../pages/apiCommon.page.';
import { log } from 'console';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;


test('Get all application', async ({ request,global }) => {
    const requestBody= dataset['getallapplication']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Create Application Keys', async ({ request,global }) => {
    const requestBody= dataset['createApplicationKeys']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});


test('Create Application', async ({ request,global }) => {
    const requestBody= dataset['createApplication']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['createApplication'][0]['requestbody']; 
    requestInput.applicationName = `test App3_${await global.wrapper.generateRandomValue()}`;
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

test('Get all application After Post', async ({ request,global }) => {   
    const requestBody= dataset['getallApplication']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}${process.env.application_ID}`;
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Delete Application', async ({ request,global }) => {
    const apiCommonPage =new ApiCommonPage(request);  
    const appId=await apiCommonPage.createApplication();
    const requestBody= dataset['deleteApplication']
    console.log(requestBody); 
    const originalUrl=`${baseUrl}${requestBody.endPoint}`     
    const url = originalUrl.replace(/APP-[0-9A-F]+/i, `${appId}`);
    // Deleting the application
    const _response=await global.apiUtil.DELETE(request,`${url}`);
    console.log(_response.status());
    const delRes=await _response.json();
    console.log(delRes);  
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);  
    expect(delRes.data.message).toBe("Application deleted successfully.") 
    expect(delRes.code).toBe(200)
    // get the deleteion application id details    
    const _responseForGet=await global.apiUtil.GET(request,`${baseUrl}/api/content/application/${appId}`);
    console.log(_responseForGet.status()); 
    const getRes=await _responseForGet.json();
    console.log(getRes);
    expect(getRes.message).toBe("Invalid Resource Access.") 
    expect(getRes.code).toBe(401)   
});

test('Update Application', async ({ request,global }) => {
    const apiCommonPage =new ApiCommonPage(request);   
    // const responseJson=await _responseForPOST.json();   
    const appId=await apiCommonPage.createApplication();   
    const requestBody= dataset['updateApplication']
    console.log(requestBody); 
    const originalUrl=`${baseUrl}${requestBody[0].endPoint}`     
    const url = originalUrl.replace(/APP-[0-9A-F]+/i, `${appId}`);
    // const requestInput = dataset['createApplication'][0]['requestbody']; 
    requestBody[0].requestbody.applicationName = `test App3_${await global.wrapper.generateRandomValue()}`;
    requestBody[0].requestbody.applicationId = appId;
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
});

test('Get Application details', async ({ request,global }) => {
    const requestBody= dataset['getApplicationDetails']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Get API Followers', async ({ request,global }) => {
    const requestBody= dataset['getAPIFollowers']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Follow API', async ({ request,global }) => {
    const requestBody= dataset['followAPI']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});

test('UnFollow API', async ({ request,global }) => {
    const requestBody= dataset['unFollowAPI']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
});

test('Get API Votes', async ({ request,global }) => {
    const requestBody= dataset['getAPIVotes']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('UpVote An API', async ({ request,global }) => {
    const requestBody= dataset['upVoteAnAPI']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));           
});

test('Down Vote An API', async ({ request,global }) => {
    const requestBody= dataset['downVoteAnAPI']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
});

test('Delete API From Application', async ({ request,global }) => {
    const requestBody= dataset['deleteAPIFromApplication']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody.endPoint}`     
    const _response=await global.apiUtil.DELETE(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
  
});

test('Get Application Keys', async ({ request,global }) => {
    const requestBody= dataset['getApplicationKeys']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Regenerate Application Keys', async ({ request,global }) => {
    const requestBody= dataset['regenerateApplicationKeys']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
});


test('Get Api For Consumers', async ({ request,global }) => {
    const requestBody= dataset['getApiForConsumers']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    
});


test('**Get Resource Details Consumers', async ({ request,global }) => {
    const requestBody= dataset['getResourceDetailsConsumers']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    
});


test('Get Avg Rating', async ({ request,global }) => {
    const requestBody= dataset['getAvgRating']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    
});


test('Get Application APIs', async ({ request,global }) => {
    const requestBody= dataset['getApplicationAPIs']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    
});


test('**Get About APIs Consumer', async ({ request,global }) => {
    const requestBody= dataset['getAboutAPIsConsumer']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    
});


test('Get Version List', async ({ request,global }) => {
    const requestBody= dataset['getVersionList']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    
});


test('**Get License Terms Condition Consumer', async ({ request,global }) => {
    const requestBody= dataset['getLicenseTermsConditionConsumer']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    
});


test('List Analytics APIs Consumers', async ({ request,global }) => {
    const requestBody= dataset['listAnalyticsAPIsConsumers']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    // console.log(await _response.json());   
    // const responseJson=await _response.json();    
    // console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

test('Save Report', async ({ request,global }) => {
    const requestBody= dataset['saveReport']
    console.log(requestBody);  
    const url=`${baseUrl}${requestBody[0].endPoint}`  
    const _response=await global.apiUtil.POST(request,`${url}`,requestBody[0].requestbody);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    // console.log(await _response.json());   
    // const responseJson=await _response.json();    
    // console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});

