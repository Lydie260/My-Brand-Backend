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

export const commentingOnblog = (req, res) => {
    const { blog_id } = req.params;
    const { comment } = req.body;
    // console.log(blog_id);
    User.findOne({
      _id: req.user.id
    }).then((user) => {
  //  console.log(user);
      const newComment = {
        user_id: user._id,
        email: user.email,
        comment,
        postedDate: today,
      };
      blogModel
        .findOne({ _id: blog_id })
        .then((blog) => {
          if (blog) {
            blog.comments.push(newComment);
            blog
              .save()
              .then((result) => res.json(result))
              .catch((error) => res.status(500).json({ error: error.message }));
          } else res.status(404).json({ error: "blog doesn't exist" });
        })
        .catch((error) => res.status(500).json({ error: error.message }));
    });
  };
  export const likeblog = async (req, res) => {
    const { blog_id } = req.params;
    const user_id = req.user.id;
    const newLike = {
      user_id,
    };
  blogModel.findOne({_id:blog_id})
      .then(blog=>{
          if(blog)
          {
              const found = blog.likes.some(el => el.user_id.toString() === user_id.toString());
              console.log(found)
              if (found) {
                 blog.likes=blog.likes.filter(item=>item.user_id.toString()!==user_id.toString())
              }else
              {
                   blog.likes.push(newLike);
              }
              blog.save()
              .then(result=>res.json(result))
              .catch(error=>res.status(500).json({error:error.message}))
          }
          else res.status(404).json({error:"blog doesn't exist"})
      })
      .catch(error=>res.json({error:error.message}))
  };



  export default {createUser, getAllUsers, getOneUser,deleteUser,updateUser }