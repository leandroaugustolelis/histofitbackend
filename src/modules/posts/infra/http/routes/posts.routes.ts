import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload';
import ensureAuthenticated from '../../../../users/infra/http/middlewares/ensureAuthenticated';
import PostsController from '../controllers/PostsController';

const upload = multer(uploadConfig.multer);

const postsRouter = Router();

const postsController = new PostsController();

postsRouter.post(
  '/',
  ensureAuthenticated,
  upload.single('photo'),
  postsController.create
);
postsRouter.get('/', ensureAuthenticated, postsController.index);

export default postsRouter;
