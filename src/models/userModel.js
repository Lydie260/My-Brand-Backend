import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({

  fullName: {
    type: String,
  },
  email: {
    type: String,
    unique: true
  },
  phone: {
    type: String,
    unique: true
  },


  password: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  role:{
    type:String,
    enum:["Admin","User"],
    default:"User"
  },
  

}, {
  timestamps: true
});

export default mongoose.model('User', userSchema);
