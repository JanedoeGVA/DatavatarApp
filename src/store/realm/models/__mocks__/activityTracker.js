export const TBL_ACT_TRACKER_SCHEMA = 'actTrackerTest';
const TBL_TOKEN_SCHEMA = 'tokenTest';

const tokenSchema = {
  name: TBL_TOKEN_SCHEMA,
  properties: {
    accessTokenKey: { type: 'string', optional: true },
    refreshTokenKey: { type: 'string', optional: true },
    accessTokenSecret: { type: 'string', optional: true }
  }
};

export const schema = {
  name: TBL_ACT_TRACKER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int' },
    provider: 'string',
    isAvailable: 'bool',
    protocol: 'string',
    token: { type: TBL_TOKEN_SCHEMA },
    logo: 'int'
  }
};

export const config = {
  path: 'datavatarAppTest.realm',
  schema: [schema, tokenSchema],
  schemaVersion: 0 // optional
};
