import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: string;
  db: {
    user: string;
    pass: string;
    name: string;
    host: string;
    port: string;
  };
  mode: string | undefined;
}

const config: Config = {
  port: process.env.PORT ? process.env.PORT : '8080',
  db: {
    user: process.env.DBUSER ? process.env.DBUSER : '',
    pass: process.env.DBPASS ? process.env.DBPASS : '',
    name: process.env.DBNAME ? process.env.DBNAME : '',
    host: process.env.DBHOST ? process.env.DBHOST : '',
    port: process.env.DBPORT ? process.env.DBPORT : '',
  },
  mode: process.env.MODE,
};

export default config;
