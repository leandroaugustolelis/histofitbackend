import { getRepository, Repository } from 'typeorm';

import IPostsRepository from '../../../../providers/repositories/IPostsRepository';
import ICreatePostDTO from '../../../../dtos/ICreatePostDTO';
import IFindAllPostsDTO from '../../../../dtos/IFindAllPostsDTO';
import Post from '../models/Post';

class PostsRepository implements IPostsRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async create({
    user_id,
    date,
    location,
    caption,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({
      user_id,
      date,
      location,
      caption,
    });

    await this.ormRepository.save(post);

    return post;
  }

  public async findAllById({ user_id }: IFindAllPostsDTO): Promise<Post[]> {
    const posts = await this.ormRepository.find({
      where: { id: user_id },
    });

    return posts;
  }
}

export default PostsRepository;
