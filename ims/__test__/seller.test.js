//import sequelize connection
const connection = require("../db/db.config")
//import super test
const request = require("supertest")
const app = require("../server")
//import product model
const Product = require("../db/models/product.model")
/*
afterAll(async() => {
    // Perform cleanup or resource closing tasks here
    // This code will run after all the tests in the test suite have completed
    await Product.destroy({where:{id:109}})

});

//seller add products
test("seller add product", async () => {
    const res = await request(app).post("/seller/create-product").send({
        "id": 111,
        "productName": "tshirts",
        "price": 200,
        "perPackQuantity": 1,
        "quantity": 1,
        "description": "desc",
        "createdBy": 2
    }).set('Authorization', 'bearer ' +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VsbGVyIiwiZW1haWwiOiJwcmFzYW5uYS5nQHdlc3RhZ2lsZWxhYnMuaW4iLCJpZCI6MiwiaWF0IjoxNjg2NjUwMzY0LCJleHAiOjE2ODcxNjg3NjR9._yfzT4ImvZu15u1I3GquHGJvHC6t71xDjf_wjMvZQhk")
    //res.text = JSON.parse(res.text)
    console.log("response.message",res)
    expect(res.body.message).toBe("product created")
});
//seller update the product
test("seller update product details", async () => {
    const res = await request(app).put("/seller/update-product/productId/111").send({
        "id": 111,
        "productName": "tshirts",
        "price": 200,
        "perPackQuantity": 2,
        "quantity": 1,
        "description": "desc",
        "createdBy": 2
    }).set('Authorization', 'bearer ' +"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VsbGVyIiwiZW1haWwiOiJwcmFzYW5uYS5nQHdlc3RhZ2lsZWxhYnMuaW4iLCJpZCI6MiwiaWF0IjoxNjg2NjUwMzY0LCJleHAiOjE2ODcxNjg3NjR9._yfzT4ImvZu15u1I3GquHGJvHC6t71xDjf_wjMvZQhk")
    //res.text = JSON.parse(res.text)
    console.log("response.message",res)
    expect(res.body.message).toBe("product is updated successfully")
});*/

//get all products
test("seller can get their products",async()=>{
    const res=await request(app).get("/seller/getproducts/sellerId/2")
    .set('Authorization','bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VsbGVyIiwiZW1haWwiOiJwcmFzYW5uYS5nQHdlc3RhZ2lsZWxhYnMuaW4iLCJpZCI6MiwiaWF0IjoxNjg2NjUwMzY0LCJleHAiOjE2ODcxNjg3NjR9._yfzT4ImvZu15u1I3GquHGJvHC6t71xDjf_wjMvZQhk");
    console.log("payload.....",res.body.payload);
    expect(res.body.message).toBe("get products");
});
//get specific product by seller
test("seller can get their specific products",async()=>{
    const res=await request(app).get("/seller/get-products-by-id/sellerId/2/productId/107")
    .set('Authorization','bearer ' + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VsbGVyIiwiZW1haWwiOiJwcmFzYW5uYS5nQHdlc3RhZ2lsZWxhYnMuaW4iLCJpZCI6MiwiaWF0IjoxNjg2NjUwMzY0LCJleHAiOjE2ODcxNjg3NjR9._yfzT4ImvZu15u1I3GquHGJvHC6t71xDjf_wjMvZQhk");
    console.log("payload.....",res.body.payload);
    expect(res.body.message).toBe("product details");
});
//seller can delete their product based on id
test("seller can delete their product",async()=>{
    const res=await request(app).delete("/seller/delete-product-by-id/productId/111")
    .set('Authorization','bearer ' + 
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VsbGVyIiwiZW1haWwiOiJwcmFzYW5uYS5nQHdlc3RhZ2lsZWxhYnMuaW4iLCJpZCI6MiwiaWF0IjoxNjg2NjUwMzY0LCJleHAiOjE2ODcxNjg3NjR9._yfzT4ImvZu15u1I3GquHGJvHC6t71xDjf_wjMvZQhk")
    console.log("payload.....",res.body.payload);
    expect(res.body.message).toBe("product successfully deleted");
});




