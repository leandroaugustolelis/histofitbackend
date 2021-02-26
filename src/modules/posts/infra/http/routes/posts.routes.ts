import { Router } from 'express';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';

const postsRouter = Router();

const postsController = new PostsController();

postsRouter.post('/', ensureAuthenticated, postsController.create);
postsRouter.get('/', ensureAuthenticated, postsController.index);

export default postsRouter;
