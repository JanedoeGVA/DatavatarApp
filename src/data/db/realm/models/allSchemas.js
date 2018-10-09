import Realm from 'realm';

const TBL_API_SCHEMA = 'Api';

const apiSchema = {
  name: TBL_API_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int' },
    apiName: 'string',
    isValide: 'bool',
    type: 'string',
    accessTokenKey: 'string',
    refreshTokenKey: { type: 'string', optional: true },
    accessTokenSecret: { type: 'string', optional: true }
  }
};

const databaseOptions = {
  path: 'datavatarApp.realm',
  schema: [apiSchema],
  schemaVersion: 0 //optional
};

export default new Realm(databaseOptions);
