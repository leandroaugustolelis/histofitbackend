import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';
import { uuid } from 'uuidv4';
import CreatePostService from '../../../repositories/CreatePostService';
import ListPostsService from '../../../repositories/ListPostsService';

class PostsController {
  public async create(request: Request, response: Response): Promise<Response> {
    console.log('oii');
    const { location, caption, date, postFilename } = request.body;
    const user_id = uuid();

    const createPost = container.resolve(CreatePostService);

    const post = await createPost.execute({
      user_id,
      location,
      caption,
      date,
      postFilename,
    });

    return response.json(post);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    console.log(user_id);
    const listPosts = container.resolve(ListPostsService);

    const posts = await listPosts.execute({
      user_id,
    });

    return response.json(classToClass(posts));
  }
}

export default PostsController;
