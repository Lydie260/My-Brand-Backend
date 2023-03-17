import blogModel from "../models/blogModel.js";

 const createBlog = handleCRUD.createBlog(blogModel);
 const getOneBlog = handleCRUD.getOneBlog(blogModel);
 const getAllBlogs = handleCRUD.getallBlogs(blogModel);
 const updateBlog = handleCRUD.updateBlog(blogModel);
 const deleteBlog = handleCRUD.deleteBlog(blogModel);

 export default {createBlog,getOneBlog,getAllBlogs,updateBlog,deleteBlog}
