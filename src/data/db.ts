import { Sequelize, Model, Optional, DataTypes } from 'sequelize';
import { UserInterface } from '../types';

const sequelize: Sequelize = new Sequelize(
  process.env.DBNAME ?? 'ragequit_auth',
  process.env.DBUSER ?? 'root',
  process.env.DBPASS ?? 'root',
  {
    host: process.env.DBHOST ?? 'localhost',
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

interface UserAttributes extends Optional<UserInterface, 'name'> {}

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
