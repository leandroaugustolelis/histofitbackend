import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      name,
      email,
      password,
    });

    return response.json(post);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const listPosts = container.resolve(CreatePostService);

    const posts = await listPosts.execute({
      user_id,
    });

    return response.json(classToClass(posts));
  }
}

export default PostsController;
