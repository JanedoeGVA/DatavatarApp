import * as db from './db';
import { TBL_ACT_TRACKER_SCHEMA } from '../models/activityTracker';

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

export const updateActTracker = (actTracker) =>
  new Promise((resolve, reject) => {
    db.update(TBL_ACT_TRACKER_SCHEMA, actTracker)
      .then(() => {
        resolve();
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
