import express from 'express';
import userRouter from './user';
import blogRouter from './blogs';





const router = express();

router.use('/user', userRouter);
router.use('/blogs' ,blogRouter);
export default router;
