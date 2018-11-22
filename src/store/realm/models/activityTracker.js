// Define your models and their properties
export const TBL_ACT_TRACKER_SCHEMA = 'Api';

export const activityTrackerSchema = {
  name: TBL_ACT_TRACKER_SCHEMA,
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
  path: 'datavatarApp.realm',
  schema: [activityTrackerSchema],
  schemaVersion: 0 //optional
};
