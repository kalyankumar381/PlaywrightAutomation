// import { expect } from 'playwright/test';
// import {test} from '../src/test-base'; 
// import {APIUtils} from '../utils/APIUtis'
// import {ReportingApi} from '@reportportal/agent-js-playwright';
// const dataset = JSON.parse(JSON.stringify(require('../data/analytics.json')));

// const baseUrl:string="https://api.testing.yappes-enterprise.com";
// const header:any={
//         "Authorization":`Bearer a99c3c49487df00690951dfa563e2601e7c7210d749d7e7524ac4c5d8283fdda`,
//         "Accept":"application/json"
//     }

// test('GET- API Get example', async ({request,global}) => {
//     ReportingApi.addAttributes([{
//         key:'API name',
//         value:"GET API"
//     },{
//         value:"demo"
//     }])
//     const resToken=await global.apiUtil.getToken()
//     const _response=await request.get(`${baseUrl}/api/content/monitor/policies/ORG-9C2D5B74`,{       
//         headers:global.apiUtil.createHeaders(resToken)
//     });
//     console.log(_response.status());
//     expect(_response.status()).toBe(200);
//     expect(_response.ok()).toBeTruthy();
//     console.log(await _response.json()); 
//     const responseJson=await _response.json();
//     console.log("Json patha value is ::"+responseJson.data[0].policyName);
// });

// test('GET from Get Reusable method', async ({request,global}) => { 
//     const _response =await global.apiUtil.GET(request,`${baseUrl}/api/content/monitor/policies/ORG-9C2D5B74`);
//     console.log(_response.status());
//     global.apiUtil.verifyStatusCode(_response,"200");  
//     console.log(await _response.json()); 
//     const responseJson=await _response.json();
//     console.log("Json patha value is ::"+responseJson.data[0].policyName);
// });



// test('POST- API Post example', async ({ request,global }) => {
//     const resToken=await global.apiUtil.getToken()
//     const _response=await request.post(`${baseUrl}/api/content/monitor/policies/attach/trackers`,{
//         headers:global.apiUtil.createHeaders(resToken),
//         data:{            
//                 "policyId": "66a784e3d83a32b81a68896b",
//                 "policyLevel": "endpointLevel",
//                 "apiLevel": {
//                     "apiId": [
//                         "API-0FF0241B"    
//                     ]
//                 },
//                 "organizationLevel": {
//                     "organizationId": ""
//                 },
//                 "endpointLevel": [{
//                     "apiId": "API-0FF0241B",
//                     "resourceIdList":["RES-2400722C","RES-6374503C"]
//                 }
//                 ]            
//             }
//     });
//     console.log(_response.status());
//     console.log(await _response.json());
//     expect(_response.status()).toBe(200);
//     expect(_response.ok()).toBeTruthy(); 
//     const responseJson=await _response.json();
//     console.log(responseJson.data.message);
//     console.log('<>><><><><><><><>');
    
       
// });

// test('POST from re-usable method', async ({ request,global }) => {
//     const requestBody= {            
//         "policyId": ["66a784e3d83a32b81a68896b"],
//         "policyLevel": "endpointLevel",
//         "apiLevel": {
//             "apiId": [
//                 "API-0FF0241B"    
//             ]
//         },
//         "organizationLevel": {
//             "organizationId": ""
//         },
//         "endpointLevel": [{
//             "apiId": "API-0FF0241B",
//             "resourceIdList":["RES-2400722C","RES-6374503C"]
//         }
//         ]       
//     }
//     const _response=await global.apiUtil.POST(request,`${baseUrl}/api/content/monitor/policies/attach/trackers`,requestBody);
//     console.log(_response.status());
//     await global.apiUtil.verifyStatusCode(_response,'200');
//     console.log(await _response.json());   
//     const responseJson=await _response.json();
//     console.log(responseJson.data.message);
//     expect(responseJson.data.message).toBe("Policies attached successfully");   
//     const apiValues=global.apiUtil.getValuesByKey(responseJson,'message');
//     console.log(apiValues[0]);
//     console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));
    
// });

// test('PUT- API Put example', async ({ request,global }) => {
//     const resToken=await global.apiUtil.getToken()
//     const _response=await request.put(`${baseUrl}/api/content/provider/billing/address`,{
//         headers:global.apiUtil.createHeaders(resToken),
//         data: {
//             "billerName": "CHAKARWARTY MAHESHWAR ",
//             "companyName": "Yappes ",
//             "contactNumber":"+91-7667442089",
//             "emailAddress":"chakarwarty.m@yappes.com",
//             "addressStreet1": "Opp. of Tine Cafe",
//             "addressStreet2": "Gokulam Main Road, V.V. MollahGokulam",
//             "city": "Mysore",
//             "state": "Karnataka",
//             "country": "India",
//             "pincode": "570002"
//         }
//     })
//     console.log("API status is :: "+ _response.status());
//     console.log(await _response.text()); 
//     console.log(await _response.json());
//     expect(_response.status()).toBe(200);
//     expect(_response.ok()).toBeTruthy();    
// });

// test('PUT- from re-usable method', async ({ request,global }) => {
//     const requestBody= {            
//             "billerName": "CHAKARWARTY MAHESHWAR ",
//             "companyName": "Yappes ",
//             "contactNumber":"+91-7667442089",
//             "emailAddress":"chakarwarty.m@yappes.com",
//             "addressStreet1": "Opp. of Tine Cafe",
//             "addressStreet2": "Gokulam Main Road, V.V. MollahGokulam",
//             "city": "Mysore",
//             "state": "Karnataka",
//             "country": "India",
//             "pincode": "570002"  
//     }
//     const _response=await global.apiUtil.PUT(request,`${baseUrl}/api/content/provider/billing/address`,requestBody);  
//     await global.apiUtil.verifyStatusCode(_response,"200");
//     console.log(await _response.text()); 
//     console.log(await _response.json());
//     const _responseJson=await _response.json();
//     expect(_response.status()).toBe(200);
//     expect(_response.ok()).toBeTruthy();    
//     expect(_responseJson.data).toBe("Internal Organization address updated successfully.");
// });

