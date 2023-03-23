import {Router} from 'express';
import messageController from '../controllers/messageController.js';
import messageModel from '../models/messageModel.js';


const routerM = Router();
routerM.post("/api/sendMessage", messageController.sendMessage(messageModel));
routerM.get("/api/get-All-Messages",messageController.getAllMessages(messageModel));
routerM.delete("/api/delete-message/:id", messageController.deleteMessage(messageModel));


export default routerM;
