import { Router } from 'express';
import SportsActivitiesController from '../controllers/SportsActivitiesController';

const sportsactivitiesRouter = Router();

const sportsactivitiesController = new SportsActivitiesController();

sportsactivitiesRouter.post('/', sportsactivitiesController.create);

export default sportsactivitiesRouter;
