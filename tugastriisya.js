import {expect} from 'chai';
import request from "supertest";

const BaseURL = "https://kasir-api.zelz.my.id"
let accessToken;
let refreshToken;
describe ("get registration",async ()=>{
    it("create account", async ()=> {
       const response = await request (BaseURL).post('/registration').send(
        {  
          "name": "Triisya Toko",
          "email": "triisyatugas@ex.com",
          "password": "123456",
        }
        
    ) 
    expect((await response).status).to.equal(201)
    console.log ((await response).body)
    }
     )
}
 
)

describe ("get login", async ()=>{
    it ("login", async()=> {
         const response = await request (BaseURL).post('/authentications').send(
          {
            "email": "triisyatugas@ex.com",
            "password": "123456",

          }
    )
    accessToken=(await response).body.data.accessToken
    refreshToken=(await response).body.data.refreshToken
    expect((await response).status).to.equal(201)
    expect((await response).body.status).to.equal("success")
    expect ((await response).body.message).to.equal("Authentication berhasil ditambahkan")
    console.log ("accessToken:",accessToken)
    console.log ("refreshToken:",refreshToken)
    }
     ).timeout(5000)
}
)

describe ("get add unit", async ()=>{
    it ("add unit", async()=> {
        const response = await request (BaseURL).post('/units').send(
            {
                "name": "gram",
                "description": "weight measurement"
            }
        )
        .set('Authorization',`Bearer ${accessToken}`)
        expect((await response).status).to.equal(201)
        expect((await response).body.status).to.equal("success")
        expect ((await response).body.message).to.equal("Unit berhasil ditambahkan")
        console.log((await response).body)
    
    })
    it ("get unit", async()=> {
        const response = await request (BaseURL).get('/units')
        
        .set('Authorization',`Bearer ${accessToken}`)
        expect((await response).status).to.equal(200)
        expect ((await response).body.status).to.equal("success")
        console.log((await response).body)
        console.log((await response).body.data.units[0])
    })
}
)
describe ("get add Category", async ()=>{
    it ("add Category", async()=> {
        const response = await request (BaseURL).post('/categories').send(
            {
                "name": "makanan ringan",
                "description": "makanan ringan dari indofood"
             }  
        )
        .set('Authorization',`Bearer ${accessToken}`)
        expect((await response).status).to.equal(201)
        expect ((await response).body.status).to.equal("success")
        expect ((await response).body.message).to.equal("Category berhasil ditambahkan")
        console.log((await response).body)
    
    })
    it ("get category", async()=> {
        const response = await request (BaseURL).get('/categories')
        
        .set('Authorization',`Bearer ${accessToken}`)
        expect((await response).status).to.equal(200)
        expect ((await response).body.status).to.equal("success")
        console.log((await response).body)
        console.log((await response).body.data.categories[0])
        console.log((await response).body.data.name)
    })
}
)
describe("add Customers", async ()=>{
    it ("add Customers", async()=> {
        const response = await request (BaseURL).post('/customers').send(
            {
                "name": "Triisya",
                "phone": "082284588140",
                "address": "Padang",
                "description": "Triisyatesttugas"
             }
        )   
        .set('Authorization',`Bearer ${accessToken}`)
        expect((await response).status).to.equal(201)
        expect ((await response).body.status).to.equal("success")
        expect ((await response).body.message).to.equal("Customer berhasil ditambahkan")
        console.log((await response).body)
    })
    it ("get customers", async()=> {
        const response = await request (BaseURL).get('/customers')
        
        .set('Authorization',`Bearer ${accessToken}`)
        expect((await response).status).to.equal(200)
        expect ((await response).body.status).to.equal("success")
        console.log((await response).body)
        console.log((await response).body.data.custumers)
        console.log((await response).body.data.name)
    })
}
)
