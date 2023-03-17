import userModel from "../models/userModel.js";
import { hashPassword, isPasswordMatching } from "../utilis/hashPassword.js";
 import Response from "../utilis/response.js";
 import status from "http-status";
 import { generateToken } from "../utilis/token.js";

 export const checkUser = async (req,res,next) =>{
    let {email, password} = req.body;
    const user = await userModel.findOne({email});
    if (!user) {
        req.body.password =hashPassword(password);
        return next();
    }
    return Response.errorMessage(res, "user already exist", status.CONFLICT);

 };

 export const loginUser = async (req,res) => {
    let { email, password} = req.body;
    const user = await userModel.findOne({email});
    if (!user) {
        return Response.errorMessage(
            res,
            "user/email does not exist",
            status.NOT_FOUND
        );
    }
    if (isPasswordMatching(password, user.password)) {
        user.password = null;
        const token = generateToken({ user});
        return Response.succesMessage(
            res,
            "successfully logged in",
            { user, token},
            status.OK
        );
    }
    return Response.errorMessage(res, "Invalid pssword", status.BAD_REQUEST);
 };