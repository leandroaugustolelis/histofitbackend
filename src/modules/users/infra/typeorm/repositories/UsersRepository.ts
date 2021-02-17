import { getRepository, Repository } from 'typeorm';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../../../dtos/IUpdateUserDTO';
import IUsersRepository from '../../../repositories/IUsersRepository';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password });

    await this.ormRepository.save(user);

    return user;
  }

  public async update({
    name,
    email,
    password,
    avatar,
  }: IUpdateUserDTO): Promise<User> {
    const user = this.ormRepository.create({ name, email, password, avatar });

    await this.ormRepository.save(user);

    return user;
  }

  public async listUsers(): Promise<User[]> {
    const test = await this.ormRepository.find();

    return test;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }
}

export default UsersRepository;
