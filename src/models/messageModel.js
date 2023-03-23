

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({

  names: {
    type: String,
  },
  email: {
    type: String,
    
  },
  subject: {
    type: String,
  },


  text: {
    type: String,
  },

  

}, {
  timestamps: true
});

export default mongoose.model('message', messageSchema);
