import ICreateFriendDTO from '../dtos/ICreateFiendDTO';
import Friend from '../infra/typeorm/entities/Friend';

export default interface IFriendsRepository {
  findByEmail(email: string): Promise<Friend | undefined>;
  create(data: ICreateFriendDTO): Promise<Friend>;
  save(friend: Friend): Promise<Friend>;
}
