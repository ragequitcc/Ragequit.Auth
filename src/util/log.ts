import { Log } from '../data/db';

const addLog = (log: object): void => {
  Log.create({
    log: log,
  }).catch((error) => {
    console.error(error);
  });
};

export { addLog };
