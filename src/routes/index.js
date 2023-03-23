import express from 'express';
import userRouter from './user';
import blogRouter from './blogs';
import messageRouter from "./message"




const router = express();

router.use('/user', userRouter);
router.use('/blogs' ,blogRouter);
router.use('/message', messageRouter );
export default router;
