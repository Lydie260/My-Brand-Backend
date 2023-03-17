

const createBlog = (Model) => async (req, res, next) => {
    let reqData = req.body
  
  try {
    let imageUrl = "";
    if (req.files) {
      const image = await imageUpload(req);
      imageUrl = image.url;
      reqData.image = imageUrl;
    }
    const doc = await Model.create(reqData);
    if (!doc) {
        return res.status (404).json ({message:"failed to create a blog"});

    }
    return res.status(200).json({message: 'Blog Created successfully', data: doc});
}catch(error){
  console.log(error)
}
};

//get all datas

 const getAllBlogs = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.find()
            if (!doc) {
                return res.status (404).json ({message:"failed to get all blogs"});
            }
            return res.status (200).json ({message:"succcessfully retrieved blogs",data:doc});
        }catch (error) {
            console.log (error)
        }
        }
};

//get One By Id datas

 const getOneBlog = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.findById(req.params.id)
            if (!doc) {
                return res.status (404).json ({message:"failed to retrieved blogs"});
            }
            return res.status (200).json ({message:"succcessfully blog retrieved",data:doc});
        }catch (error) {
            console.log (error)
        }
        }
};

//Update One By Id datas

 const updateBlog = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.findByIdAndUpdate(req.params.id, req.body,{
                new:true,
            })
            if (!doc) {
                return res.status (404).json ({message:"failed to update a blog"});
            }
            return res.status (200).json ({message:"succcessfully blog updated",data:doc});
        }catch (error) {
            console.log (error)
        }
        }
};

//delete One By Id datas

 const deleteBlog = (Model) => async (req, res, next) => {
    {
        try {
            const doc = await Model.findByIdAndDelete(req.params.id)
            if (!doc) {
                return res.status (404).json ({message:""});
            }
            return res.status (200).json ({message:"succcessfully deleted blog",data:doc});
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



  export default {createBlog, getAllBlogs, getOneBlog,deleteBlog,updateBlog }