import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import { getUserByUsername } from './userService.js';

async function login({ username, password }) {
  const user = await getUserByUsername(username);

  if (!user) {
    throw new Error('Invalid Credentials');
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    throw new Error('Invalid Credentials');
  }

  const token = jwt.sign({
    userId: user.id,
    username: user.username
  },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );
  return { token };
};

export default login;