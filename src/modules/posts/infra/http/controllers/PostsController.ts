import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import ListPostsService from '../../../repositories/ListPostsService';
import CreatePostService from '../../../repositories/CreatePostService';

class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { location, caption, date } = request.body;

    const { id: user_id } = request.user;

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      user_id,
      location,
      caption,
      date,
      photoFilename: request.file.filename,
    });

    return response.json(post);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listPosts = container.resolve(ListPostsService);

    const posts = await listPosts.execute({
      user_id,
    });
    return response.json(classToClass(posts));
  }
}

export default PostsController;
