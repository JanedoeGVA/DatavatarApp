export const activityTrackerSchema = {
  name: 'trackerSchema',
  primaryKey: 'id',
  properties: {
    id: { type: 'int' },
    provider: 'string',
    isValide: 'bool',
    protocole: 'string',
    accessTokenKey: 'string',
    refreshTokenKey: { type: 'string', optional: true },
    accessTokenSecret: { type: 'string', optional: true }
  }
};

export const config = {
  path: 'test.realm',
  schema: [activityTrackerSchema],
  schemaVersion: 0 //optional
};
