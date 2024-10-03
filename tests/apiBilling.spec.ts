import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/apiBilling.json')));
import dotenv from 'dotenv';
import { log } from 'console';
import ApiCommonPage from '../pages/apiCommon.page.';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;



test('Get eligible organization list for provider filter invoice search', async ({ request,global }) => {
    const requestBody= dataset['Geteligibleorganizationlistforproviderfilterinvoicesearch']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('Get Subscribed API List', async ({ request,global }) => {
    const requestBody= dataset['GetSubscribedAPIList']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


// test('Get eligible API list for provider filter invoice search', async ({ request,global }) => {
//     const requestBody= dataset['GeteligibleAPIlistforproviderfilterinvoicesearch']
//     console.log(requestBody); 
//     const url=`${baseUrl}${requestBody[0].endPoint}` 
//     const requestInput = dataset['GeteligibleAPIlistforproviderfilterinvoicesearch'][0]['requestbody']; 
//     console.log(requestInput); 
//     const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
//     console.log(_response.status());
//     await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
//     console.log(await _response.json());   
//     const responseJson=await _response.json();    
//     console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
//     console.log("Aplication ID is :: " + responseJson.data.applicationId);
//     global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
// });


// test('Get invoices of subscribed APIs from filters', async ({ request,global }) => {
//     const requestBody= dataset['GetinvoicesofsubscribedAPIsfromfilters']
//     console.log(requestBody); 
//     const url=`${baseUrl}${requestBody[0].endPoint}` 
//     const requestInput = dataset['GetinvoicesofsubscribedAPIsfromfilters'][0]['requestbody']; 
//     console.log(requestInput); 
//     const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
//     console.log(_response.status());
//     await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
//     console.log(await _response.json());   
//     const responseJson=await _response.json();    
//     console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
//     console.log("Aplication ID is :: " + responseJson.data.applicationId);
//     global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
// });


test('API Invoice Search', async ({ request,global }) => {
    const requestBody= dataset['APIInvoiceSearch']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['APIInvoiceSearch'][0]['requestbody']; 
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


test('API Invoice Email notification', async ({ request,global }) => {
    const apiCommonPage =new ApiCommonPage(request);

    const createInvRes=await apiCommonPage.createInvoice();
    const requestBody= dataset['APIInvoiceEmailnotification']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['APIInvoiceEmailnotification'][0]['requestbody']; 
    console.log(requestInput); 
    requestInput.invoiceId=createInvRes;
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    console.log("Message ID is :: " + responseJson.data.message);
    expect(responseJson.data.message).toBe('Successfully sent the invoice to the user');
              
});


test('API Invoice Preview', async ({ request,global }) => {
    const requestBody= dataset['APIInvoicePreview']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['APIInvoicePreview'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
              
});


test('Create API Invoice', async ({ request,global }) => {
    const apiCommonPage =new ApiCommonPage(request);
    // Get the organization id
    const orgId=await apiCommonPage.createOrganization();
    // create Invoic
    const requestBody= dataset['CreateAPIInvoice']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['CreateAPIInvoice'][0]['requestbody']; 
    requestInput.consumerOrganization =orgId;
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
    console.log("mesaage  ID is :: " + responseJson.data.message);
    global.webAction.writeEnvVariable("application_ID",responseJson.data.message);
    // deleteing organization
    await apiCommonPage.deleteOrganization(orgId);
            
});


test('Provider Eligible Invoice List', async ({ request,global }) => {
    const requestBody= dataset['ProviderEligibleInvoiceList']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['ProviderEligibleInvoiceList'][0]['requestbody']; 
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


// test('Consumer Invoice', async ({ request,global }) => {
//     const requestBody= dataset['ConsumerInvoice']
//     console.log(requestBody); 
//     const url=`${baseUrl}${requestBody[0].endPoint}` 
//     const requestInput = dataset['ConsumerInvoice'][0]['requestbody']; 
//     console.log(requestInput); 
//     const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
//     console.log(_response.status());
//     await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
//     console.log(await _response.json());   
//     const responseJson=await _response.json();    
//     console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
//     console.log("Aplication ID is :: " + responseJson.data.applicationId);
//     global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
// });


// test('Update User Invoice', async ({ request,global }) => {
//     const requestBody= dataset['UpdateUserInvoice']
//     console.log(requestBody);  
//     const url=`${baseUrl}${requestBody[0].endPoint}`  
//     const _response=await global.apiUtil.PUT(request,`${url}`,requestBody[0].requestbody);
//     console.log(_response.status());
//     await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
//     console.log(await _response.json());   
//     const responseJson=await _response.json();    
//     console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
// });


test('Get Invoice Details', async ({ request,global }) => {
    const requestBody= dataset['GetInvoiceDetails']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


test('GET user billing details', async ({ request,global }) => {
    const requestBody= dataset['GETuserbillingdetails']
    console.log(requestBody);    
    const url=`${baseUrl}${requestBody.endPoint}` 
    const _response=await global.apiUtil.GET(request,`${url}`);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
});


// test('CreateUserInvoice', async ({ request,global }) => {
//     const requestBody= dataset['CreateUserInvoice']
//     console.log(requestBody); 
//     const url=`${baseUrl}${requestBody[0].endPoint}` 
//     const requestInput = dataset['CreateUserInvoice'][0]['requestbody']; 
//     console.log(requestInput); 
//     const _response=await global.apiUtil.POST(request,`${url}`,requestInput);    
//     console.log(_response.status());
//     await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
//     console.log(await _response.json());   
//     const responseJson=await _response.json();    
//     console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
//     console.log("Aplication ID is :: " + responseJson.data.applicationId);
//     global.webAction.writeEnvVariable("application_ID",responseJson.data.applicationId);
              
// });


test('User Invoice Preview Details', async ({ request,global }) => {
    const requestBody= dataset['UserInvoicePreviewDetails']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['UserInvoicePreviewDetails'][0]['requestbody']; 
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


test('batch job schedule event', async ({ request,global }) => {
    const requestBody= dataset['batchjobscheduleevent']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['batchjobscheduleevent'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status')); 
});