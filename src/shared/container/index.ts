import { container } from 'tsyringe';

import '../../modules/users/providers';
import './providers';

import FriendsRepository from '../../modules/friends/infra/typeorm/repositories/FriendsRepository';
import IFriendsRepository from '../../modules/friends/repositories/IFriendsRepository';

import UsersRepository from '../../modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/users/repositories/IUsersRepository';
import IPostsRepository from '../../modules/posts/providers/repositories/IPostsRepository';
import PostsRepository from '../../modules/posts/infra/http/typeorm/repositories/PostsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IFriendsRepository>(
  'FriendsRepository',
  FriendsRepository
);

container.registerSingleton<IPostsRepository>(
  'PostsRepository',
  PostsRepository
);
