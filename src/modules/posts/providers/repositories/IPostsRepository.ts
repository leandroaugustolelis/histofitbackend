import ICreatePostDTO from '../../dtos/ICreatePostDTO';
import Post from '../../infra/http/typeorm/schemas/Post';

export default interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  // findById(id: string): Promise<Post | undefined>;
}
