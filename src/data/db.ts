import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { UserInterface, LogInterface } from '../types';

const sequelize: Sequelize = new Sequelize(
  // @ts-ignore
  process.env.DBNAME,
  process.env.DBUSER,
  process.env.DBPASS,
  {
    // @ts-ignore
    host: process.env.DBHOST,
    port: Number(process.env.DBPORT) ?? 3306,
    dialect: 'mariadb',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
  }
);

let connectionTries: number = 0;

const connectionCheck = () => {
  sequelize
    .authenticate()
    .then((e) => {
      clearInterval(timer);
      sequelize
        .sync()
        .then(() => {
          console.log('Tables Synced.');
        })
        .catch((error) => {
          console.log('Error Syncing Tables.');
        });
    })
    .catch((error) => {
      connectionTries++;
      if (connectionTries > Number(process.env.DBRETRIES)) {
        console.error(
          new Error('COULD NOT CONNECT TO DATABASE, PLEASE CHECK CONNECTIONS.')
        );
        process.exit(111);
      } else {
        console.log('Could Not Connect To Database, Retrying.');
      }
    });
};

const timer = setInterval(connectionCheck, 800);

interface UserAttributes extends Optional<UserInterface, 'id'> {}

export class User
  extends Model<UserInterface, UserAttributes>
  implements UserInterface
{
  public id!: number;
  public name!: string;
  public hash!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { tableName: 'users', sequelize }
);

// LOG
interface LogAttributes extends Optional<LogInterface, 'id'> {}

export class Log
  extends Model<LogInterface, LogAttributes>
  implements LogInterface
{
  public id!: number;
  public log!: object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Log.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    log: {
      type: DataTypes.JSON,
      allowNull: false,
      unique: false,
    },
  },
  { tableName: 'logs', sequelize }
);
