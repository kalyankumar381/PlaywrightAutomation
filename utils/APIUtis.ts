import { expect} from '@playwright/test';
import { request } from 'http';
import dotenv from 'dotenv';
dotenv.config();
export class APIUtils{
    
    constructor(public request:any){
       
    }

    public toeknBody={        
            "grant_type":"password",
            "client_id":"15baf8a50c0c653b47b4df9cee458e2d1a6ae226a27c4bf7e9871d387eb95106",
            "client_secret":"cc62bc8020cfa4c73661fcb92671962adc5ba3d9afcf60c9b44aa4a691246797",
            "username":process.env.username,
            "password":process.env.password
        }

   
  
    async getToken(){
        const loginResponse=await this.request.post("https://api.testing.yappes-enterprise.com/api/oauth/token",
            {
                data:this.toeknBody,
                Headers:{
                    "Content-Type":"application/json"
                }
            },
           
        )

        // add to response object (has like hash map)
        console.log("Kalyan status code is ***************** - >" + loginResponse.status());
        //veryfy response
       // expect((loginResponse).ok()).toBeTruthy();
        const loginResponseJson=await loginResponse.json();
        console.log("Response is ***************** - > " + await loginResponseJson);
       const token=loginResponseJson.access_token.token;
        console.log(token);
        return token;
    }
    public createHeaders(token: string): any {
        return {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json"
        };
      }

    // async createOrder(orderPayLocad){
    //     let response:any={}; // creating a object
    //     response.token=await this.getToken();

    //     const orderResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    //     {
    //         data:orderPayLocad,
    //         headers:{
    //             'Authorization' :response.token,
    //             'Content-Type' : 'application/json'
    //         } ,
    
    //     })
    
    //     console.log(" Status code is  ******* :-  "+ orderResponse.status());
    //     const orderResponseJson =await orderResponse.json();
    //     console.log(orderResponseJson);
    //     const orderId=orderResponseJson.orders[0];
    //     console.log("Order id is ---  " + orderId);

    //     response.orderId=orderId;
    //     response.orderResponse=orderResponse;
    //     return response;
    // }


    // async getAllProducts(allProdPayLoad){
    //     let getAllProresponse:any={};
    //     getAllProresponse.token=await this.getToken();
    //     const getAllProdResponse=await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/product/get-all-products",
    //     {
    //         data:allProdPayLoad,
    //         headers:{
    //             'Authorization' :getAllProresponse.token,
    //             'Content-Type' : 'application/json'
    //         } ,
    
    //     })

    //     console.log(" Status code is  ******* :-  "+ getAllProdResponse.status());
    //     const getAllProdJson =await getAllProdResponse.json();
    //     console.log(getAllProdJson);
    //     const orderId=getAllProdJson.data[0].productName;
    //     const productPrice=getAllProdJson.data[0].productPrice;

    //     console.log("Product name  id is ---  " + orderId);
    //     console.log("************* Product Price   id is ---  " + productPrice);

    //     getAllProresponse.orderId=orderId;
    //     getAllProresponse.getAllProdResponse=getAllProdResponse;
    //     return getAllProdResponse;
    // }

 

}

module.exports={APIUtils}
