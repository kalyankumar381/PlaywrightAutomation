import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/analytics.json')));
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});

test.beforeAll(async ({ }) => {
    const baseURL = process.env.BASEURL;
    console.log('Base URL <><><><><><><><><> ::', baseURL);  
});


const baseUrl:string="https://api.testing.yappes-enterprise.com";

// test.describe('Analystics API test cases', () => {
        
    for (let i = 0; i <= dataset['APIAnalyticsPOST'].length - 1; i++) {
        test('POST from re-usable method - '  + ' - iteration - ' + (i + 1) , async ({ request,global }) => {
            const requestBody= dataset['APIAnalyticsPOST'][i];
            console.log(requestBody.requestbody);
            const endPoint=process.env.baseUrl+requestBody.endPoint;
            const _response=await global.apiUtil.POST(request,`${endPoint}`,requestBody.requestbody);
            console.log(_response.status());
            await global.apiUtil.verifyStatusCode(_response,requestBody.statusCode);
            console.log(await _response.json());   
            const responseJson=await _response.json();    
            console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
        });
    }

    test('get cumulative metrics for error code', async ({ request,global }) => {
        const requestBody= dataset['getcumulativemetricsforerrorcode']
        console.log(requestBody);    
        const _response=await global.apiUtil.POST(request,`${baseUrl}/api/content/provider/metrics/cumulative?metric=error-code`,requestBody);
        console.log(_response.status());
        await global.apiUtil.verifyStatusCode(_response,'200');
        console.log(await _response.json());   
        const responseJson=await _response.json();    
        console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    });

    test('Get Traffic-Metric', async ({ request,global }) => {
        const requestBody= dataset['GetTraffic-Metric']
        console.log(requestBody);    
        const _response=await global.apiUtil.POST(request,`${baseUrl}/api/content/provider/dashboards/analytics`,requestBody);
        console.log(_response.status());
        await global.apiUtil.verifyStatusCode(_response,'200');
        console.log(await _response.json());   
        const responseJson=await _response.json();    
        console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    });

    test('GetTraffic-Status-Metric', async ({ request,global }) => {
        const requestBody= dataset['GetTraffic-Status-Metric'];
        console.log(requestBody);    
        const _response=await global.apiUtil.POST(request,`${baseUrl}/api/content/provider/dashboards/analytics`,requestBody);
        console.log(_response.status());
        await global.apiUtil.verifyStatusCode(_response,'200');
        console.log(await _response.json());   
        const responseJson=await _response.json();    
        console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));    
    });
    test('Get Existing Apis for Metrices', async ({ request,global }) => {
        const requestBody= dataset['GetExistingApisforMetrices'];
        console.log(requestBody);    
        const _response=await global.apiUtil.POST(request,`${baseUrl}/api/content/apiusage/list/`,requestBody);
        console.log(_response.status());
        await global.apiUtil.verifyStatusCode(_response,'200');
        console.log(await _response.json());   
        const responseJson=await _response.json();    
        console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));  
        const msg=await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'data.message');
        expect(msg[0]).toBe('No API created.');   
    });

// });
