export const TBL_ACT_TRACKER_SCHEMA = 'actTrackerTest';

export const schema = {
  name: TBL_ACT_TRACKER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: { type: 'int' },
    provider: 'string',
    isValide: 'bool',
    protocole: 'string',
    accessTokenKey: 'string',
    refreshTokenKey: { type: 'string', optional: true },
    accessTokenSecret: { type: 'string', optional: true },
  },
};

export const config = {
  path: 'test.realm',
  schema: [schema],
  schemaVersion: 0, // optional
};
