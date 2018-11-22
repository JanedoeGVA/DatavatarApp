import * as db from './queries/db';
import * as dbHelper from './queries/dbhelper';

export default {
  ...db,
  ...dbHelper
};
