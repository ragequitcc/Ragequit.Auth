import { Sequelize, Model, DataTypes, Optional } from 'sequelize';
import config from '../util/config';

const sequelize: Sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.pass,
  {
    host: config.db.host,
    port: Number(config.db.port),
    dialect: 'mariadb',
    logging: config.mode === 'development' ? console.log : false,
  }
);

const User = sequelize.define('user', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
  },
});

setTimeout(() => {
  sequelize
    .sync({ force: true })
    .then(() => {
      console.log('Tables Synced.');
    })
    .catch((error) => {
      console.log('Error Syncing Tables.');
    });
}, 2500);

export { User };
