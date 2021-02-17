import { injectable, inject } from 'tsyringe';
import Friend from '../infra/typeorm/entities/Friend';
import IFriendsRepository from '../repositories/IFriendsRepository';

interface IRequest {
  friend_id1: string;
  friend_id2: string;
}

@injectable()
class CreateFriendService {
  constructor(
    @inject('FriendsRepository')
    private friendsRepository: IFriendsRepository
  ) {}

  public async execute({ friend_id1, friend_id2 }: IRequest): Promise<Friend> {
    const friend = this.friendsRepository.create({
      friend_id1,
      friend_id2,
    });

    return friend;
  }
}

export default CreateFriendService;
