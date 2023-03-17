const signupSchema = Joi.object({
    fullname: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(3).max(50).required(),
    password: Joi.string().min(3).max(500).required(),
  });
  const querrySchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    message: Joi.string().min(3).max(50).required(),
  });
  // adding user
  app.post('/sign-up', checkUser, async (req,res) =>{
    const { error, value } = signupSchema.validate(req.body);
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
  
  
  
  
  
  
  
  