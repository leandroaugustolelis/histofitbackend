import { getMongoRepository, MongoRepository } from 'typeorm';

import IPostsRepository from '../../../../providers/repositories/IPostsRepository';
import Post from '../schemas/Post';
import ICreatePostDTO from '../../../../dtos/ICreatePostDTO';

class PostsRepository implements IPostsRepository {
  private ormRepository: MongoRepository<Post>;

  constructor() {
    this.ormRepository = getMongoRepository(Post, 'mongodb');
  }

  public async create({
    user_id,
    date,
    location,
    caption,
    comments,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({
      user_id,
      date,
      location,
      caption,
      comments,
    });

    await this.ormRepository.save(post);

    return post;
  }
}

export default PostsRepository;
