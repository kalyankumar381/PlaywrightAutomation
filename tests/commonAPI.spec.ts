import { expect } from 'playwright/test';
import {test} from '../src/test-base'; 
import {APIUtils} from '../utils/APIUtis'
import {ReportingApi} from '@reportportal/agent-js-playwright';
const dataset = JSON.parse(JSON.stringify(require('../data/commonAPI.json')));
import dotenv from 'dotenv';
dotenv.config({
    path:`.env.test`,
    override:true
});
const baseUrl=process.env.baseUrl;

test('Get APIs Added to the Organization', async ({ request,global }) => {
    const requestBody= dataset['GetAPIsAddedtotheOrganization']
    console.log(requestBody); 
    const url=`${baseUrl}${requestBody[0].endPoint}` 
    const requestInput = dataset['GetAPIsAddedtotheOrganization'][0]['requestbody']; 
    console.log(requestInput); 
    const _response=await global.apiUtil.POST(request,`${url}`,requestInput);
    console.log(_response.status());
    await global.apiUtil.verifyStatusCode(_response,requestBody[0].statusCode);
    console.log(await _response.json());   
    const responseJson=await _response.json();    
    console.log(await global.apiUtil.getStringValueFromResponseUsingJsonPath(responseJson,'status'));               
});