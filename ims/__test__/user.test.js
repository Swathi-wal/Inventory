const connection= require("../db/db.config")
//import super test
const request=require("supertest")
const app=require("../server")
const User=require("../db/models/user.model")

/*afterAll(async() => {
    // Perform cleanup or resource closing tasks here
    // This code will run after all the tests in the test suite have completed
    await User.destroy({where:{email:"sudheer.g@westagilelabs.com"}})

});
  

//user registration
test("user registration successful",async()=>{
    const res=await request(app).post("/register-user").send({
    "role":"customer",
    "firstName":"sudheer",
    "lastName":"gokavarapu",
    "email":"sudheer.g@westagilelabs.com",
    "password":"sudheer",
    "mobile":6305000626,
    "address":{
        "pincode":533220,
        "street":"ranga",
        "city":"kesanakurru",
        "district":"eastgodavari",
        "country":"india"
    }})
    console.log(res);
    res.text=JSON.parse(res.text)
    expect(res.text.message).toBe("user registered")
})

//user already registered
test("Response should be user already registered",async()=>{
    const res=await request(app).post("/register-user").send({
    "role":"customer",
    "firstName":"sudheer",
    "lastName":"gokavarapu",
    "email":"sudheer.g@westagilelabs.com",
    "password":"sudheer",
    "mobile":6305000626,
    "address":{
        "pincode":533220,
        "street":"ranga",
        "city":"kesanakurru",
        "district":"eastgodavari",
        "country":"india"
    }})
    //console.log(res);
    res.text=JSON.parse(res.text)
    expect(res.text.message).toBe("user already registered")
})*/

//user login
test("route for login",async()=>{
    const res= await request(app).post("/user/login").send({
        "email":"manikanta.g@westagilelabs.com",
        "password":"manikanta"
    });
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).toHaveProperty("password");
    res.text=JSON.parse(res.text)
    console.log("response....",res.text.message);
    expect(res.text.message).toBe("Login success");
});



