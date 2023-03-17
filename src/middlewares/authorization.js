import Response from "../utilis/response";
const verifyAccess = function(requiredRole){
    return async(req,res,next)=>{
        try{
            const role = req.user.role;
            if(requiredRole!==role){
                return Response.errorMessage(res,"you are not Authorized",403);
            }return next()
        }catch(err){
            console.log(err);
        }
    }
}
export default verifyAccess;