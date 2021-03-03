import { getRepository, Repository } from 'typeorm';
import ICreatePostDTO from '../../../dtos/ICreatePostDTO';
import IFindAllPostsDTO from '../../../dtos/IFindAllPostsDTO';
import IPostsRepository from '../../../providers/repositories/IPostsRepository';

import Post from '../entities/Post';

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
    photo,
  }: ICreatePostDTO): Promise<Post> {
    const post = this.ormRepository.create({
      user_id,
      date,
      location,
      caption,
      photo,
    });

    await this.ormRepository.save(post);

    return post;
  }

  public async save(post: Post): Promise<Post> {
    return this.ormRepository.save(post);
  }

  public async findAllById({ user_id }: IFindAllPostsDTO): Promise<Post[]> {
    const posts = await this.ormRepository.find({
      where: { user_id },
      order: { created_at: 'DESC' },
    });

    return posts;
  }
}

export default PostsRepository;
