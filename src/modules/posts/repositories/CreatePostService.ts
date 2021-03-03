import { injectable, inject } from 'tsyringe';
import IPostsRepository from '../providers/repositories/IPostsRepository';
import IStorageProvider from '../../../shared/container/providers/StorageProvider/models/IStorageProvider';
import Post from '../infra/typeorm/entities/Post';

interface IRequest {
  user_id: string;
  date: Date;
  location: string;
  caption: string;
  photoFilename: string;
}

@injectable()
class CreatePostService {
  constructor(
    @inject('PostsRepository')
    private postsRepository: IPostsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider
  ) {}

  public async execute({
    user_id,
    date,
    location,
    caption,
    photoFilename,
  }: IRequest): Promise<Post> {
    const post = await this.postsRepository.create({
      user_id,
      date,
      location,
      caption,
      photo: photoFilename,
    });

    await this.storageProvider.saveFile(photoFilename);

    return post;
  }
}

export default CreatePostService;
