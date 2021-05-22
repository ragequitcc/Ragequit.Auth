import bcrypt from 'bcrypt';

interface Encrypt {
  (data: string): Promise<string>;
}

const encrypt: Encrypt = async (data: string) => {
  const saltRounds: number = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hash = await bcrypt.hash(data, salt);

  return hash;
};

interface ComparePassword {
  (password: string, hash: string): Promise<boolean>;
}

const comparePassword: ComparePassword = async (password: string, hash: string) => {
  const result = await bcrypt.compare(password, hash);

  return result;
};

export { encrypt, comparePassword };
