import { TBL_ACT_TRACKER_SCHEMA, config } from '../../models/__mocks__/activityTracker';
import DB from '../db';

jest.unmock('../db');

const items = {
  fitbit: {
    id: 1,
    provider: 'Fitbit',
    isValide: true,
    protocole: 'Oauth2',
    accessTokenKey: 'h"OdC{.v:ad4yZY',
    refreshTokenKey: 'ow0bgNuMWL',
  },
  withings: {
    id: 2,
    provider: 'Withing',
    isValide: true,
    protocole: 'Oauth2',
    accessTokenKey: 'y5rlKeoJ5V',
    refreshTokenKey: 'CMKeabZv0I',
  },
  garmin: {
    id: 3,
    provider: 'Garmin',
    isValide: true,
    protocole: 'Oauth1',
    accessTokenKey: 'qJLBH23qxt',
    accessTokenSecret: 'JCpVSlG2r7',
  },
};

jest.mock('../../models/activityTracker');

describe('Realm ', () => {
  const store = new DB(config);
  const Realm = require('realm');

  beforeEach(() => {});

  describe('insert', () => {
    it('should return a promise with no errors', () => store.insert(TBL_ACT_TRACKER_SCHEMA, items.fitbit).then(() => {
      expect(Realm.create).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA, items.fitbit);
      // spy.mockRestore();
    }));
  });
});
