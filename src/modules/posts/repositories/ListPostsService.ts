import { injectable, inject } from 'tsyringe';
import IPostsRepository from '../providers/repositories/IPostsRepository';
import Post from '../infra/http/typeorm/models/Post';

interface IRequest {
  user_id: string;
}

@injectable()
class ListPostsService {
  constructor(
    @inject('PostRepository')
    private postsRepository: IPostsRepository
  ) {}

  public async execute({ user_id }: IRequest): Promise<Post[]> {
    const posts = await this.postsRepository.findAllById({ user_id });

    return posts;
  }
}

export default ListPostsService;
