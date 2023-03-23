import status from "http-status";
import Response from "../utilis/response.js";

 const createUser = (Model) => async (req, res, next) => {
    let reqData = req.body
  {
    try {
   
        const doc = await Model.create(reqData);
        if (!doc)
        {
            return Response.errorMessage(
                res,
                "failed to register",
                status.BAD_REQUEST
              );        }
        return Response.succesMessage(res, "user created successfuly ", doc, status.OK);
    }catch(error){
      console.log(error)
    }
  }
 
};

//get all datas

 const getAllUsers = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.find().select("-password");
            if (!doc) {
                return Response.errorMessage(
                    res,
                    "failed to get all",
                    status.BAD_REQUEST
                  );              }
            return Response.succesMessage(res, "succcessfully retrieved data ", doc, status.OK);

        } catch (error) {
            console.log(error);
          }
        }
};

//get One By Id datas

 const getOneUser = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.findById(req.params.id).select("-password");
            if (!doc) {
                return Response.errorMessage(
                    res,
                    "failed to get one",
                    status.BAD_REQUEST
                  );              }
            return Response.successMessage (res, "succcessfully got one user", doc, status.OK);
            
        }catch (error) {
            console.log (error)
        }
        }
};

//Update One By Id datas

 const updateUser = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.findByIdAndUpdate(req.params.id, req.body,{
                new:true,
            }).select("-password");
            if (!doc) {
                return Response.errorMessage(
                    res,
                    "failed to update user",
                    status.BAD_REQUEST
                  );              }
            return Response.succesMessage(res, "user updated successfuly ", doc, status.OK);

        }catch (error) {
            console.log (error)
        }
        }
};

//delete One By Id datas

 const deleteUser = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.findByIdAndDelete(req.params.id).select("-password");;
            if (!doc) {
                return Response.errorMessage(
                    res,
                    "failed to delete user",
                    status.BAD_REQUEST
                  );              }
            return Response.succesMessage(res, "user deleted successfuly ", doc, status.OK);

            
        }catch (error) {
            console.log (error)
        }
        }
};




  export default {createUser, getAllUsers, getOneUser,deleteUser,updateUser }