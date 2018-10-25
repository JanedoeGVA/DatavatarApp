import DBHelper from '../../../db/realm/queries/dbhelper';

export const createActTracker = (actTracker) => {
  DBHelper.addActTracker(actTracker);
};
