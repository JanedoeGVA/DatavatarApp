// Define your models and their properties

export const TBL_ACT_TRACKER_SCHEMA = 'actTracker';
const TBL_TOKEN_SCHEMA = 'token';

const tokenSchema = {
  name: TBL_TOKEN_SCHEMA,
  properties: {
    accessToken: { type: 'string', optional: true },
    refreshToken: { type: 'string', optional: true },
    secret: { type: 'string', optional: true }
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
  path: 'datavatarApp.realm',
  schema: [schema, tokenSchema],
  schemaVersion: 0 // optional
};
