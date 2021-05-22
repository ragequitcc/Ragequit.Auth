import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: string;
    db: {
        user: string | undefined;
        pass: string | undefined;
        name: string | undefined;
        host: string | undefined;
    }
}

const config: Config = {
    port: process.env.PORT ? process.env.PORT : "8080",
    db: {
        user: process.env.DBUSER,
        pass: process.env.DBPASS,
        name: process.env.DBNAME,
        host: process.env.DBHOST
    }
}

export default config;
