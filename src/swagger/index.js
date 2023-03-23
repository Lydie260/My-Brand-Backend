import { Router } from "express";
import { serve,setup } from "swagger-ui-express";
//const { serve, setup } = require("swagger-ui-express");
const docrouter = Router();
import dotenv from "dotenv";
dotenv.config();
const options = {
  openapi: "3.0.1",
  info: {
    title: "My Brand",
    version: "1.0.0",
    description: "My brand Backend.",
  },
  basePath: "/",
  security: [
    {
      bearerAuth: [],
    },
  ],
  tags: [
    { name: "Users", description: "Users" },
    { name: "Blog", description: "Blogs" },
  ],
  paths: {
    "/signup": {
      post: {
        tags: ["Users"],
        description: "User SignUp",
        security: [],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                fullName: "user",
                email: "user@gmail.com",
                phone: "076666666",
                password: "user",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New User was created successfully",
          },
          400: {
            description: "Bad Request",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/login": {
      post: {
        tags: ["Users"],
        description: "User login",
        security: [],
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                email: "user@gmail.com",
                password: "user",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          400: {
            description: "Invalid credation",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/users": {
        get: {
          tags: ["Users"],
          description: "Get All users",
          description:"This Api is used get All user from mongooDb ",
          parameters: [],
          security: [],
          responses: {
            200: {
              description: "successfully",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },
      "/user/{id}":{
        get: {
          security: [],
          tags: ["Users"],
          description: "Get One user by id",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
            },
          ],
          responses: {
            200: {
              description: "successfully",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },

    "/user/update/{id}": {
      put: {
        tags: ["Users"],
        description: "Update user",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
              example: {
                fullName: "Name",
                email: "name@gmail.com",
                phone: "079999999",
                password: "name",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },



    "/user/delete/{id}": {
        delete: {
          tags: ["Users"],
          description: "Delete User",
          parameters: [
            {
              in: "path",
              name: "id",
              required: true,
            },
          ],
        
          responses: {
            200: {
              description: "successfully",
            },
            401: {
              description: "User Not Authorized",
            },
            404: {
              description: "Article doesn't exist!",
            },
            500: {
              description: "Internal Server Error",
            },
          },
        },
      },



// Blog

"/api/create-blog": {
  post: {
    tags: ["Blog"],
    description: "Create new blog ",
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            $ref: "#/components/schemas/Blog",
          },
        },
      },
      required: true,
    },
    responses: {
      200: {
        description: "successfully",
      },
      401: {
        description: "User Not Authorized",
      },
      500: {
        description: "Internal Server Error",
      },
    },
  },
},

    "/api/get-all-blogs": {
      get: {
        tags: ["Blog"],
        description: "Get All Blog ",
        parameters: [],
        security: [],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },


    "/api/blog/{id}":{
      get: {
        security: [],

        tags: ["Blog"],
        description: "Get one Blog",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        responses: {
          200: {
            description: "successfully",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
  

    "/api/blog-update/{id}": {
      put: {
        tags: ["Blog"],
        description: "Update blog ",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
              example: {
                title: " blog  title update",
                content: " blog  content update",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },
    "/api/delete-blog/{id}": {
      delete: {
        tags: ["Blog"],
        description: "Delete blog ",
        parameters: [
          {
            in: "path",
            name: "id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "User Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    // comments and likes

    "/api/blog/{blog_id}/like": {
      post: {
        tags: ["Blog"],
        description: "Liking on  blog ",
        parameters: [
          {
            in: "path",
            name: "blog_id",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
            },
          },
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },

    
    "/api/blog/{blog_id}/comment": {
      post: {
        tags: ["Blog"],
        description: "Commenting on  blog ",
        parameters: [
          {
            in: "path",
            name: "blog_id",
            required: true,
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Blog",
              },
              example: {
                comment: "that content is very helpful thanks",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "successfully",
          },
          401: {
            description: "Not Authorized",
          },
          404: {
            description: "Article doesn't exist!",
          },
          500: {
            description: "Internal Server Error",
          },
        },
      },
    },


//Message

"/api/sendMessage": {
  post: {
    tags: ["Message"],
    description: "send new Message ",
    requestBody: {
      content: {
        'multipart/form-data': {
          schema: {
            $ref: "#/components/schemas/message",
          },
        },
      },
      required: true,
    },
    responses: {
      200: {
        description: "successfully",
      },
      401: {
        description: "User Not Authorized",
      },
      500: {
        description: "Internal Server Error",
      },
    },
  },
},















  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "The auto-generated id of the user",
          },
          fullName: {
            type: "string",
            description: "User's name",
          },
          email: {
            type: "string",
            description: "User's email",
          },
          phone: {
            type: "string",
            description: "User's Phone",
          },
          password: {
            type: "string",
            description: "User's password",
          },
          role: {
            type: "string",
            description: "User role",
            role:"users",
            enum:"admin,user",
            default:"user"
          },
        },
      },
      Blog: {
        type: "object",
        properties: {
          title: {
            type: "string",
            description: "blog title",
          },
          author:{
            type: "string",

          },
          postedDate:{
            type:"string",


          },
          content: {
            type: "string",
            description: "blog content",
          },
          postedDate:{
            type: "string",
            description:"date"
          },
          image: {
            type: "string",
            description: "blog image url",
            format: "binary",
          },
        },
      },
      message: {
        type: "object",
        properties : {
          names: {
            type: "String",
            description: "sender's Name",
          },
          email:{
            type: "String",
            description: "sender's email"
          },
          subject: {
            type: "String",
            description: "sender's subject"
          },
          text: {
            type: "String",
            description: "message",
          }
        }
      },


    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};
 export default docrouter.use("/", serve, setup(options));
