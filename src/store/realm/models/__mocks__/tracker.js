export const TBL_TRACKER_SCHEMA = 'actTrackerTest';
export const TBL_TOKEN_SCHEMA = 'tokenTest';
export const TBL_SUBSCRIBED_SCHEMA = 'subscribedTest';
export const TBL_DATA = 'dataTest';

export const tokenSchema = {
  name: TBL_TOKEN_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int' },
    accessToken: { type: 'string', optional: true },
    refreshToken: { type: 'string', optional: true },
    secret: { type: 'string', optional: true }
  }
};

export const trackerSchema = {
  name: TBL_TRACKER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int' },
    provider: 'string',
    protocol: 'string',
    logo: 'int'
  }
};

export const subscribedSchema = {
  name: TBL_SUBSCRIBED_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int' },
    avatar: { type: 'string' },
    tracker: { type: TBL_TRACKER_SCHEMA },
    token: { type: TBL_TOKEN_SCHEMA }
  }
};

export const dataSchema = {
  name: TBL_DATA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int' },
    tracker: { type: TBL_TRACKER_SCHEMA },
    type: { type: 'string' },
    date: { type: 'date' },
    json: { type: 'string' }
  }
};

export const config = {
  path: 'datavatarAppTest.realm',
  schema: [subscribedSchema, trackerSchema, tokenSchema, dataSchema],
  schemaVersion: 0 // optional
};
