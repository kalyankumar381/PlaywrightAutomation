
import fs from 'fs';
import { APIResponse, expect} from '@playwright/test';
import { setServers } from 'dns';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import jp from 'jsonpath';
import jsonpath from 'jsonpath';
import dotenv from 'dotenv';
dotenv.config();

export  class ApiUtil {

    constructor(public request:any){
       
    }

    /**
         * 	Use this when you want to validate response status code from Response.
         * @param response - Response Object
         * @param expectedStatusCode - user give expected status code
         * method will validate response code and it's ok test case is passing other wise it will fail
    */


    async verifyStatusCode(response: APIResponse, expectedStatusCode:string): Promise<void> {
        const _actualStatusCode=response.status();
        expect(_actualStatusCode.toString(), ` Expected  '${ expectedStatusCode } '  status code diffrent from actual ${_actualStatusCode}  response code  `).toBe(expectedStatusCode.toString());
    }

    /** Validate the actual and expected response body.
	 * 	Use this when you want to fetch the string value for a single field from Response.
     * @param expectedResponseBody - Expected response Object
	 * @param actualResponseBody - user to send actual response body object
	 * Validate the expected and actual response body
	 */
    async verifyResponseBody(expectedResponseBody: object, actualResponseBody: JSON): Promise<void> {

        expect.soft(await actualResponseBody, 'The postLocation response does not match the expected results').toEqual(expectedResponseBody);
    }


    /** Verify the expected and actual response headers .
	 * 	Use this when you want to fetch the string value for a single field from Response.
     * @param expectedHeaderFromResponseHeader - Expected header response Object
	 * @param responseBody - Response header array object
	 * It will validate what ever mentioned in the expected headers in json objet against the actual response object
	 */
    verifyResponseHeader(expectedHeaderFromResponseHeader: any, responseBody: Array<{ name: string, value: string }>) {
        let _status = true;
        let _fieldNames = 'Parameter';
        for (const responseKey of responseBody) {
            const _expVale=expectedHeaderFromResponseHeader[responseKey.name.trim()];
            if(_expVale!==undefined) {
                if(!(expectedHeaderFromResponseHeader[responseKey.name.trim()] === responseKey.value.trim())) {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    _status = false;
                    _fieldNames = _fieldNames + ' ,' + responseKey.name + ' --- ' + expectedHeaderFromResponseHeader[responseKey.name.trim()];
                    break;
                }
            }
        }
        expect(_status, `${_fieldNames} was not present in response Headers`).toBe(true);
    }

    /** Get the header object value from response.
	 * 	Use this when you want to fetch the string value for a single field from Response.
	 * @param headerResponse - actual response Object array
	 * @param expectHeaderName - Expected header key
	 * @return - String value from Response based on expectHeaderName
	 */

    getHeaderValueFromResponse(headerResponse: Array<{ name: string, value: string }>, expectHeaderName: string) {
        let _fieldNames:string|undefined = '';
        for (const responseKey of headerResponse) {
            if((responseKey.name.trim()===expectHeaderName.trim())) {
                _fieldNames = responseKey.value.trim();
                break;
            }
        }
        return _fieldNames;
    }

    /** Verify the expected and actual key with value .
	 *
     * @param jsonResponse - Json Response object (convert the API response to json)
	 * @param jsonObjectKey - json object key
	 * @param expJsonObjectKeyValue - expected value fron mentioned 'jsonObjectKey'
	 * It will validate what ever mentioned in the expected jsonObjectKey in json objet against the actual response expJsonObjectKeyValue
	 */
    validationObjectValue(jsonResponse:JSON, jsonObjectKey:string, expJsonObjectKeyValue: unknown) {

        expect.soft(jsonResponse).toHaveProperty(jsonObjectKey, expJsonObjectKeyValue);
    }


    /** Get String Value from Response using JsonPath.
	 * 	Use this when you want to fetch the string value for a single field from Response.
	 * @param jsonResponse - json response Object
	 * @param jsonPathValue - json path Ex : "status" , "guid" etc..
	 * @return - String value from Response based on json path
	 */
    async getStringValueFromResponseUsingJsonPath(jsonResponse:any, jsonPathValue:any) {
        // const _jsonResVelue=await (jsonResponse[jsonPathValue]);
        const _jsonResValue= await jp.query(jsonResponse, '$.'+jsonPathValue);

        return await _jsonResValue;
    };   

    toeknBody={        
            "grant_type":"password",
            "client_id":"15baf8a50c0c653b47b4df9cee458e2d1a6ae226a27c4bf7e9871d387eb95106",
            "client_secret":"cc62bc8020cfa4c73661fcb92671962adc5ba3d9afcf60c9b44aa4a691246797",
            "username":process.env.username,
            "password":process.env.password
    };

   /**
    * Return the token
    * @returns 
    */
  
    async getToken(){
        const loginResponse=await this.request.post("https://api.testing.yappes-enterprise.com/api/oauth/token",
            {
                data:this.toeknBody,
                Headers:{
                    "Content-Type":"application/json"
                }
            },           
        );
        // add to response object (has like hash map)
        console.log("Token status code is ***************** - >" + loginResponse.status());
        //veryfy response
        expect((loginResponse).ok()).toBeTruthy();
        const loginResponseJson=await loginResponse.json();
        const token=loginResponseJson.access_token.token;
        return token;
    };
    createHeaders(token: string): any {
        return {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        };
    };
    /**
     * 
     * @param request : API request
     * @param baseUrl  : base url for api call
     * @returns : return the api response
     */

    async GET(request:any,baseUrl:string){
        const resToken=await this.getToken()
        const startTime=Date.now();
        const _response=await request.get(`${baseUrl}`,{       
            headers:this.createHeaders(resToken)
        });

        const endTime=Date.now();
        const responseTime = endTime - startTime;
        console.log(`GET - API response time <><><><><><><><><><><><><><><><>   :: ${responseTime} - ms`);

        return _response;
    };    


    /**
     * 
     * @param request : API request
     * @param baseUrl : Url of the API
     * @param requestBody  : Request body in json format
     * @returns 
     */
    async POST(request:any,baseUrl:string,requestBody:any){
        let _response;
        const resToken=await this.getToken()
        const startTime=Date.now();
        if(Object.keys(requestBody).length === 0){
            _response=await request.post(`${baseUrl}`,{
                headers:this.createHeaders(resToken)
            });

        }else{
            _response=await request.post(`${baseUrl}`,{
                headers:this.createHeaders(resToken),
                data:requestBody
            });
        }
        const endTime=Date.now();
        const responseTime = endTime - startTime;
        console.log(`POST - API response time <><><><><><><><><><><><><><><><>   :: ${responseTime} - ms`);
        return _response
    }

    async PUT(request:any,baseUrl:string,requestBody:any){
        let _response;
        const resToken=await this.getToken()
        const startTime=Date.now();
        if(Object.keys(requestBody).length === 0){
            _response=await request.post(`${baseUrl}`,{
                headers:this.createHeaders(resToken)
            });

        }else{
            _response=await request.post(`${baseUrl}`,{
                headers:this.createHeaders(resToken),
                data:requestBody
            });
        }

        const endTime=Date.now();
        const responseTime = endTime - startTime;
        console.log(`PUT - API response time <><><><><><><><><><><><><><><><>   :: ${responseTime} - ms`);

        return _response
    };

    /**
     * 
     * @param request : Pass the request fixture
     * @param baseUrl : pass the url 
     * @returns       : return the responce 
     */

    async DELETE(request:any,baseUrl:string){
        const resToken=await this.getToken()
        const startTime=Date.now();
        const _response=await request.delete(`${baseUrl}`,{       
            headers:this.createHeaders(resToken)
        });

        const endTime=Date.now();
        const responseTime = endTime - startTime;
        console.log(`DELETE - API response time <><><><><><><><><><><><><><><><>   :: ${responseTime} - ms`);

        return _response;
    };  

    /**
     * 
     * @param jsonObj : pass the json object
     * @param key : json key 
     * @returns : Retrun the array 
     */

    public getValuesByKey(jsonObj: any, key: string): any {
        const query = `$..[?(@.${key})]`;
        const result = jsonpath.query(jsonObj, query);
        return result.length ? result.map((item: { [x: string]: any; }) => item[key]) : null;
    }
}
