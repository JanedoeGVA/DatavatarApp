import {
  TBL_ACT_TRACKER_SCHEMA,
  config
} from '../../models/__mocks__/activityTracker';
import DB from '../db';

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
const FILTER = `provider == "${items.fitbit.provider}"`;

jest.unmock('../db');
jest.mock('../../models/activityTracker');

describe('Realm ', () => {
  const store = new DB(config);
  const Realm = require('realm'); // eslint-disable-line global-require

  beforeEach(() => {
    Realm.open.mockClear();
    Realm.create.mockClear();
    Realm.write.mockClear();
  });

  describe('insert', () => {
    it('should call Realm open and create', async () => {
      await store.insert(TBL_ACT_TRACKER_SCHEMA, items.fitbit);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.create).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA, items.fitbit);
    });
  });

  describe('query', () => {
    it('should call Realm open and objets and return all the objects', async () => {
      await store.query(TBL_ACT_TRACKER_SCHEMA);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.objects).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA);
    });
    it('should call Realm open and objects and return filters objects', async () => {
      await store.query(TBL_ACT_TRACKER_SCHEMA, FILTER);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.objects).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA);
    });
  });
});
