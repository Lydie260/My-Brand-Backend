import joi from 'joi';
// import app from "../server"
import express from "express";
import  checkUser  from '../middlewares/checkUserExist.js';


const app = express();

const registerValidations = (user) =>{
    const schema = joi.object().keys({
        fullName:joi.string().required(),
        email: joi.string().required().email(),
        phone:joi.number().required().min(10),
        password:joi.string().required().min(6)
    })
    return schema.validate(user);
}


const loginValidation = (user) =>{
    const schema = joi.object().keys({
        email: joi.string().required().email(),
        password: joi.string().required().min(6)
    })
    return schema.validate(user);
}




const deleteUser= (user) =>{
    const schema = joi.object().keys({
        _id: joi.string().required(),
    })
    return schema.validate(user);
}
const createBlog = (user) =>{
    const schema = joi.object().keys({
        title:joi.string().required(),
        author:joi.string().required(),
        content:joi.string().required(),

    })
    return schema.validate(user);

}

app.post('/signup', checkUser, async (req,res) =>{
    const  { error, value } = registerValidations.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const { fullname, email, username, password } = value;
      try {
        let newUser = await User.create(req.body);
        if(!newUser){
        return res.status(404).json({
          status: "user failed",
          data: newUser,
        });}
        return res.status(201).json({
          status: "user created successful",
          data: newUser,});
      } catch (error) {
        console.log(error.message);
        res.status(500).json({
          message: error.message,
        });
      }
  });
  
  
  
  
  
  
  
  

export default {registerValidations,loginValidation, deleteUser,createBlog};
