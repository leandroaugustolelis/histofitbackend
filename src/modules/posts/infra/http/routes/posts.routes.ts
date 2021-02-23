import { Router } from 'express';
import PostsController from '../controllers/PostsController';

const postsRouter = Router();

const postsController = new PostsController();

postsRouter.post('/', postsController.create);
postsRouter.get('/', postsController.index);

export default postsRouter;
