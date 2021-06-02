import { ConfigInterface } from '../types';

const keys = [
  'PORT',
  'DBUSER',
  'DBPASS',
  'DBHOST',
  'DBPORT',
  'DBRETRIES',
  'DBNAME',
  'ENV',
  'JWTSECRET',
];

keys.some((value) => {
  if (!process.env[value]) {
    throw new Error(`Missing Environment Value ${value}. Closing...`);
  }
});

const config: ConfigInterface = {
  port: Number(process.env.PORT),
  db: {
    user: process.env.DBUSER!,
    pass: process.env.DBPASS!,
    host: process.env.DBHOST!,
    port: Number(process.env.DBPORT!),
    retries: Number(process.env.DBRETRIES!),
    name: process.env.DBNAME!,
  },
  jwt: {
    secret: process.env.JWTSECRET!,
  },
  env: process.env.ENV!,
};

export default config;
