import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '../../../services/CreateUserService';
import ListUsersService from '../../../services/ListUsersService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    console.log(user_id);
    const listUsers = container.resolve(ListUsersService);

    const users = await listUsers.execute({
      user_id,
    });

    return response.json(classToClass(users));
  }
}
