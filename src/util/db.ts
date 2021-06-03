import { User, Log } from '../data/db';

const findUserByName = async (name: string): Promise<User | null> => {
  const user = await User.findOne({
    where: {
      name: name,
    },
  });

  return user;
};

export { findUserByName };
