import * as realm from './baseSchemas';
import * as async from './asyncStorage';

export default {
  ...realm,
  ...async
  //other store like async...
};
