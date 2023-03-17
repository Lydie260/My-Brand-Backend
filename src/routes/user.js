import { Router } from 'express';
import userControllers from '../controllers/userController.js';
import { checkUser, loginUser } from '../middlewares/checkUserExist.js';
import userModel from '../models/userModel.js';
const route = Router();

//user routes
route.post("/signup", checkUser, userControllers.createUser(userModel));
route.post("/login",loginUser);
route.get("/users",userControllers.getAllUsers(userModel));
route.get("/user/:id",userControllers.getOneUser(userModel));
route.put("/user/update/:id",userControllers.updateUser(userModel));
route.delete("/user/delete/:id",userControllers.deleteUser(userModel));

export default route;
