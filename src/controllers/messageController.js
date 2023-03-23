
import status from "http-status";
import Response from "../utilis/response.js";



const sendMessage    = (Model) => async (req, res, next) => {
    let reqData = req.body;

  try {
   
    const doc = await Model.create(reqData);
    if (!doc) {
        return Response.errorMessage(
            res,
            "failed to send Message",
            status.BAD_REQUEST
          );  
    }
    return Response.succesMessage(res, "Message sent successfuly ", doc, status.OK);
}catch(error){
  console.log(error)
}
};

//get all 

 const getAllMessages = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.find()
            if (!doc) {
                return Response.errorMessage(
                    res,
                    "failed to get Messages",
                    status.BAD_REQUEST
                  );               }
                  return Response.succesMessage(res, "succcessfully retrieved All Messages ", doc, status.OK);
                }catch (error) {
            console.log (error)
        }
        }
};





//delete One By Id 

 const deleteMessage = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.findByIdAndDelete(req.params.id)
            if (!doc) {
                return Response.errorMessage(
                    res,
                    "failed to delete message",
                    status.BAD_REQUEST
                  );                          }
                  return Response.succesMessage(res, "Message deleted successfuly ", doc, status.OK);
                }catch (error) {
            console.log (error)
        }
        }
};





  export default {sendMessage, getAllMessages, deleteMessage}