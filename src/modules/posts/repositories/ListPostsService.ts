import { injectable, inject } from 'tsyringe';
import { OrderByCondition } from 'typeorm';
import Post from '../infra/typeorm/entities/Post';
import IPostsRepository from '../providers/repositories/IPostsRepository';

interface IRequest {
  user_id: string;
}

@injectable()
class ListPostsService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Post[]> {
    const posts = await this.postsRepository.findAllById({ user_id });

    return posts;
  }
}

export default ListPostsService;
