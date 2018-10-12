import * as realm from './realm';
import * as async from './async_storage';

export default {
  ...realm,
  ...async
  //other store like async...
};
