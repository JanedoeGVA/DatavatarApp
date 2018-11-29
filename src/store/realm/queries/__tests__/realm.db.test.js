import {
  TBL_ACT_TRACKER_SCHEMA,
  config
} from '../../models/__mocks__/activityTracker';
import DB from '../db';

jest.unmock('../db');

const items = {
  fitbit: {
    id: 1,
    provider: 'Fitbit',
    isValide: true,
    protocole: 'Oauth2',
    accessTokenKey: 'h"OdC{.v:ad4yZY',
    refreshTokenKey: 'ow0bgNuMWL'
  },
  withings: {
    id: 2,
    provider: 'Withing',
    isValide: true,
    protocole: 'Oauth2',
    accessTokenKey: 'y5rlKeoJ5V',
    refreshTokenKey: 'CMKeabZv0I'
  },
  garmin: {
    id: 3,
    provider: 'Garmin',
    isValide: true,
    protocole: 'Oauth1',
    accessTokenKey: 'qJLBH23qxt',
    accessTokenSecret: 'JCpVSlG2r7'
  }
};

jest.mock('../../models/activityTracker');

describe('Realm ', () => {
  const store = new DB(config);
  const Realm = require('realm'); // eslint-disable-line global-require
  // Realm.open = jest.fn(
  //   () =>
  //     new Promise((resolve) => {
  //       setTimeout(() => {
  //         resolve(Realm);
  //       }, 10);
  //     })
  // );
  // Realm.write = jest.fn((fn) => fn());
  // Realm.create = jest.fn(() => {});
  beforeEach(() => {
    Realm.open.mockClear();
    Realm.create.mockClear();
    Realm.write.mockClear();
  });

  describe('insert', () => {
    it('should return a promise with no errors', async () => {
      await store.insert(TBL_ACT_TRACKER_SCHEMA, items.fitbit);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.create).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA, items.fitbit);
    });
  });
});
