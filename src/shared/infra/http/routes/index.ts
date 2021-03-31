import { Router } from 'express';

import sessionsRouter from '../../../../modules/users/infra/http/routes/sessions.routes';
import usersRouter from '../../../../modules/users/infra/http/routes/users.routes';
import friendsRouter from '../../../../modules/friends/infra/http/routes/friends.routes';
import postsRouter from '../../../../modules/posts/infra/http/routes/posts.routes';
import profileRouter from '../../../../modules/users/infra/http/routes/profile.routes';
import passwordRouter from '../../../../modules/users/infra/http/routes/password.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/profile', profileRouter);
routes.use('/password', passwordRouter);
routes.use('/friends', friendsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/posts', postsRouter);

export default routes;
