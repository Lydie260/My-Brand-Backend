import userModel from "../models/userModel.js";

const createUser= handleCrud.createUser(userModel);
 const getOne = handleCrud.getOneUser(userModel);
 const getAllUsers = handleCrud.getAllUsers(userModel);
 const updateUser = handleCrud.updateUser (userModel);
 const deleteUser = handleCrud.deleteUser(userModel);

 
 export default {createUser,getOne,getAllUsers,deleteUser,updateUser}
