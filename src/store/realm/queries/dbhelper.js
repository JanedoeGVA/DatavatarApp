import Realm from 'realm';
import DB from './db';
import { TBL_ACT_TRACKER_SCHEMA, config } from '../models/activityTracker';

const db = new DB(config, Realm);

export const isEmpty = () =>
  new Promise((resolve, reject) => {
    db.isEmpty(TBL_ACT_TRACKER_SCHEMA)
      .then((empty) => {
        resolve(empty);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const addListActTracker = (lstActTracker) =>
  new Promise((resolve, reject) => {
    db.insertCollection(TBL_ACT_TRACKER_SCHEMA, lstActTracker)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

export const addActTracker = (actTracker) =>
  new Promise((resolve, reject) => {
    console.log(
      `@db addActTracker : actTracker = ${JSON.stringify(actTracker)}`
    );
    db.insert(TBL_ACT_TRACKER_SCHEMA, actTracker)
      .then(() => {
        resolve(actTracker);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getLstActTracker = () =>
  new Promise((resolve, reject) => {
    db.query(TBL_ACT_TRACKER_SCHEMA)
      .then((lstActTracker) => {
        resolve(lstActTracker);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getLstActTrackerSubscribed = () =>
  new Promise((resolve, reject) => {
    const filter = 'isAvailable == false';
    db.query(TBL_ACT_TRACKER_SCHEMA, filter)
      .then((lstActTracker) => {
        resolve(lstActTracker);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const removeActTracker = (actTracker) =>
  new Promise((resolve, reject) => {
    db.remove(TBL_ACT_TRACKER_SCHEMA, actTracker)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

export const removeAllActTracker = () =>
  new Promise((resolve, reject) => {
    db.remove(TBL_ACT_TRACKER_SCHEMA)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });

export const registerToken = (actTracker) =>
  new Promise((resolve, reject) => {
    console.log(`oauthAccessToken ${JSON.stringify(actTracker.token)}`);
    console.log(`default path ${JSON.stringify(db.getDefaultPath())}`);
    const filter = `provider = "${actTracker.provider}"`;
    db.query(TBL_ACT_TRACKER_SCHEMA, filter)
      .then((lstActTracker) => {
        const actTrackerToUpdate = lstActTracker[0];
        console.log(`item not update ${JSON.stringify(actTrackerToUpdate)}`);
        console.log(`id =${actTrackerToUpdate.id}`);
        const updateItem = {
          id: actTrackerToUpdate.id,
          isAvailable: false,
          token: actTracker.token
        };
        db.update(TBL_ACT_TRACKER_SCHEMA, updateItem)
          .then(() => {
            console.log(
              `item after update ${JSON.stringify(actTrackerToUpdate)}`
            );
            resolve(actTrackerToUpdate);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const updateActTrackerToken = (item) =>
  new Promise((resolve, reject) => {
    const filter = `provider = "${item.provider}"`;
    db.query(TBL_ACT_TRACKER_SCHEMA, filter)
      .then((actTracker) => {
        console.log(`item not update ${JSON.stringify(actTracker[0])}`);
        console.log(`id =${actTracker[0].id}`);
        const updateItem = {
          id: actTracker[0].id,
          isAvailable: item.isAvailable,
          token: item.token
        };
        db.update(TBL_ACT_TRACKER_SCHEMA, updateItem)
          .then(() => {
            console.log(`item after update ${JSON.stringify(actTracker[0])}`);
            resolve(actTracker[0]);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });

export const isExist = (item) =>
  new Promise((resolve, reject) => {
    db.query(TBL_ACT_TRACKER_SCHEMA, `provider == "${item.provider}"`)
      .then((lstActTracker) => {
        resolve(lstActTracker.length !== 0);
      })
      .catch((error) => {
        reject(error);
      });
  });
