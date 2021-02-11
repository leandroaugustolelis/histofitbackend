import { Router } from 'express';
import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authconfig from '../config/auth';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const usersRepository = getRepository(User);
  const { email, password } = request.body;

  const user = await usersRepository.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error('Incorrect email/password combination');
  }

  const passwordMatched = await compare(password, user.password);

  if (!passwordMatched) {
    throw new Error('Incorrect email/password combination');
  }

  const { secret, expiresIn } = authconfig.jwt;

  const token = sign({}, secret, {
    subject: user.id,
    expiresIn,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
