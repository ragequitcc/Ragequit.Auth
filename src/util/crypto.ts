import bcrypt from 'bcrypt';

interface Encrypt {
  (data: string): Promise<string>;
}

const encrypt: Encrypt = async (data: string) => {
  const saltRounds: number = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  const hash = await bcrypt.hash(data, salt).then((hash) => {
    return hash;
  });

  return hash;
};

interface Decrypt {
  (data: string, hash: string): Promise<boolean>;
}

const decrypt: Decrypt = async (data: string, hash: string) => {
  const result = await bcrypt.compare(data, hash);

  return result;
};

export { encrypt, decrypt };
