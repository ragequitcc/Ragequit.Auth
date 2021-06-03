import jwt from 'jsonwebtoken';
import { User } from '../data/db';
import { addLog } from '../util/log';
import config from '../config/config';

const signToken = async (user: User): Promise<string | null> => {
  const token = await jwt.sign(
    {
      user: {
        name: user.name,
        roles: [],
      },
    },
    config.jwt.secret
  );

  return token;
};

// weird shit going on here.
const decodeToken = async (token: string): Promise<string | object | null> => {
  try {
    const verifiedToken = jwt.verify(token, config.jwt.secret);
    return verifiedToken;
  } catch (error) {
    addLog(error);
    return null;
  }
};

export { signToken, decodeToken };
