import ICreatePostDTO from '../../dtos/ICreatePostDTO';
import IFindAllPostsDTO from '../../dtos/IFindAllPostsDTO';
import Post from '../../infra/typeorm/entities/Post';

export default interface IPostsRepository {
  create(data: ICreatePostDTO): Promise<Post>;
  findAllById(data: IFindAllPostsDTO): Promise<Post[]>;
  save(post: Post): Promise<Post>;
}
