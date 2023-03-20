import express from "express";
import mongoose from "mongoose";
import "dotenv/config"
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes/user.js";
import routers from "./routes/blogs.js"
import swaggerDoc from "./swagger/index.js"
import fileUploader from "express-fileupload";

const app = express();
//const swaggerJSDoc = require("swagger-jsdoc");
app.use(bodyParser.json());
app.use(fileUploader({ useTempFiles: true }));
app.use(cors())
app.use ('/',routes)
app.use('/',routers)

app.use("/mybrand",swaggerDoc)


  // server configuration
  const server = process.env.PORT || 4040
app.listen(server,() =>{
    console.log (`server is running on port ${server}`);
})
//database configuration
const database = process.env.DATABASE;
mongoose
.connect(database,{
       useNewUrlParser: true,
       useUnifiedTopology: true,
     })
     .then(() => {
       console.log("Database is well connected!");
  });



export default app