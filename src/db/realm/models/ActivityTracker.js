export const TBL_ACT_TRACKER_SCHEMA = 'Api';

export const activityTracker = {
  name: TBL_ACT_TRACKER_SCHEMA,
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
