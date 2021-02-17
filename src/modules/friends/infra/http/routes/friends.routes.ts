import { Router } from 'express';
import FriendsController from '../controllers/FriendsController';

const friendsRouter = Router();

const friendsController = new FriendsController();

friendsRouter.post('/:id', friendsController.create);

export default friendsRouter;
