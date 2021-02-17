import { getRepository, Repository } from 'typeorm';
import ICreateFriendDTO from '../../../dtos/ICreateFiendDTO';
import IFriendsRepository from '../../../repositories/IFriendsRepository';
import Friend from '../entities/Friend';

class FriendsRepository implements IFriendsRepository {
  private ormRepository: Repository<Friend>;

  constructor() {
    this.ormRepository = getRepository(Friend);
  }

  public async create({
    friend_id1,
    friend_id2,
  }: ICreateFriendDTO): Promise<Friend> {
    const friend = this.ormRepository.create({ friend_id1, friend_id2 });

    await this.ormRepository.save(friend);

    return friend;
  }

  public async save(user: Friend): Promise<Friend> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<Friend | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }
}

export default FriendsRepository;
