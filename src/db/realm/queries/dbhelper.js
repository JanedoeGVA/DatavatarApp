import DB from './db';
import { TBL_ACT_TRACKER_SCHEMA } from '../models/activityTracker';

class DBHelper {
  addActTracker = (actTracker) =>
    new Promise((resolve, reject) => {
      DB.insert(TBL_ACT_TRACKER_SCHEMA, actTracker)
        .then(() => {
          resolve(actTracker);
        })
        .catch((error) => {
          reject(error);
        });
    });

  getLstActTracker = () =>
    new Promise((resolve, reject) => {
      DB.query(TBL_ACT_TRACKER_SCHEMA)
        .then((lstActTracker) => {
          resolve(lstActTracker);
        })
        .catch((error) => {
          reject(error);
        });
    });

  removeActTracker = (actTracker) =>
    new Promise((resolve, reject) => {
      DB.delete(TBL_ACT_TRACKER_SCHEMA, actTracker)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

  removeAllActTracker = () =>
    new Promise((resolve, reject) => {
      DB.delete(TBL_ACT_TRACKER_SCHEMA)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

  updateActTracker = (actTracker) =>
    new Promise((resolve, reject) => {
      DB.update(TBL_ACT_TRACKER_SCHEMA, actTracker)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });

  isExist = (item) =>
    new Promise((resolve, reject) => {
      DB.query(TBL_ACT_TRACKER_SCHEMA, `provider == "${item.provider}"`)
        .then((lstActTracker) => {
          resolve(lstActTracker.length !== 0);
        })
        .catch((error) => {
          reject(error);
        });
    });
}

export default new DBHelper();
