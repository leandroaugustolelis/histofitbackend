import { injectable, inject } from 'tsyringe';
import IPostsRepository from '../providers/repositories/IPostsRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import Post from '../infra/http/typeorm/models/Post';

interface IRequest {
  user_id: string;
  date: Date;
  location: string;
  caption: string;
  postFilename: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostRepository')
    private postsRepository: IPostsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    user_id,
    date,
    location,
    caption,
    postFilename,
  }: IRequest): Promise<Post> {
    const fileName = await this.storageProvider.saveFile(postFilename);

    const post = await this.postsRepository.create({
      user_id,
      date,
      location,
      caption,
      image: fileName,
    });

    return post;
  }
}

export default CreatePostService;