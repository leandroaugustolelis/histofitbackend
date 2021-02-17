import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { uuid } from 'uuidv4';
import CreateFriendService from '../../../services/CreateFriendService';

export default class FriendsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const friend_id1 = uuid();

    const { id } = request.params;

    const createFriend = container.resolve(CreateFriendService);

    const friend = await createFriend.execute({
      friend_id1,
      friend_id2: id,
    });

    return response.json(friend);
  }
}
