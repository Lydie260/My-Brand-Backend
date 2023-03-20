import chai, { should } from "chai";
import { expect } from "chai";
import chaiHttp from "chai-http";
import path from "path";
import Sinon from "sinon";
import app from "../server";
import blogModel from "../models/blogModel";
import userModel from "../models/userModel";


const testingData ={
    title: "testing blog title",
    author:"tester",
    content: "testing blog content",

};

const testingDataUpdate ={
    title: "testing blog title update",
    author:"tester",
    content: "testing blog content update",
    image:"",
};

const tester = {
    fullName: "fullName",
    email: "admin@gmail.com",
    phone: "12345678",
    password: "admin",
};

const adminUser = {
    fullName:"fullName",
    email:"admin@gmail.com",
    phone: "12345678",
    password:"12345",
    role:"Admin",
};


const admin = {
    email: "admin10@gmail.com",
    password:"123",
};

chai.expect();
chai.use(chaiHttp);

jest.setTimeout(4000000);
describe("Testing Blog routes", () =>{
    it("should create new blog.", async () =>{
        const res1 = await chai
        .request(app)
        .post("/signup") 
        .send(adminUser);
    const login = await chai 
         .request(app)
         .post("/login")
         .send(admin);
         
    const res = await chai 
         .request(app)
         .post("/api/create-blog")   
         .field("title", testingData.title)
         .field("content", testingData.content)
         .set("Authorization", `Bearer ${login.body.data.token}`);
        expect(res.status).to.be.equal(200);   
    });

    it("should get all blogs", async () =>{
            const res = await chai.request(app).get("/api/get-all-blogs");
            expect(res.status).to.be.equal(200);
        });

        it("should get one blog by id", async () =>{
                const blog = await chai.request(app).get("/api/get-all-blogs/");
                const id = blog.body.data[0]._id;
                const res = await chai.request(app).get(`/api/blog/${id}`);
                expect(res.status).to.be.equal(200);
            });
            it("should update blog", async () => {
                    const adminLogin = await chai
                         .request(app)
                         .post("/login")
                         .send(admin);
                    const token = `Bearer ${adminLogin.body.data.token}`;
                    const res2 = await chai 
                          .request(app)
                          .post("/api/create-blog")
                          .send(testingData)
                          .set("Authorization", token);
                          
                    const blog = await chai.request(app).get("/api/get-all-blogs/");
                    const id = blog.body.data[0]._id;
                    
                    const res = await chai
                        .request(app)
                        .put(`/api/blog-update/${id}`)
                        .send(testingDataUpdate)
                        .set("Authorization", token);
                    expect(res.status).to.be.equal(200);    
                },900000);
      
                it("should like on blog", async () =>{
                        const adminLogin = await chai
                              .request(app)
                              .post("/login")
                              .send(admin);
                        const token = `Bearer ${adminLogin.body.data.token}`;
                        const blog = await chai.request(app).get("/api/get-all-blogs");
                        const id = blog.body.data[0]._id;
                        const res = await chai
                              .request(app)
                              .post(`/api/blog/${id}/like`) 
                              .send(testingDataUpdate)
                              .set("Authorization", token) 
                              .send({blog_id: id});
                        expect(res.status).to.be.equal(200);            
                       });
   
});

