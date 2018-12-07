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

const Realm = {
  lstObjects: {
    values: jest.fn(),
    filtered: jest.fn()
  },
  store: {
    isInitialized: false,
    schema: {},
    data: {}
  },
  open: jest.fn(
    () =>
      new Promise((resolve) => {
        if (!Realm.store.isInitialized) {
          Realm.store.schema = config.schema;
          config.schema.forEach((schema) => {
            Realm.store.data[schema.name] = {};
          });
          Realm.store.isInitialized = true;
        }
        setTimeout(() => {
          resolve(Realm);
        }, 10);
      })
  ),
  write: jest.fn((fn) => fn()),
  create: jest.fn(() => {}),
  objects: jest.fn(() => Realm.lstObjects)
};

const FILTER = 'filter';

jest.unmock('../db');
jest.mock('../../models/activityTracker');

describe('Realm ', () => {
  const store = new DB(config, Realm);
  beforeEach(() => {
    Realm.open.mockClear();
    Realm.create.mockClear();
    Realm.write.mockClear();
    Realm.objects().values.mockClear();
    Realm.objects().filtered.mockClear();
    Realm.objects.mockClear();
  });

  describe('insert', () => {
    it('should call Realm open and create', async () => {
      expect.assertions(3);
      await store.insert(TBL_ACT_TRACKER_SCHEMA, items.fitbit);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.store.isInitialized).toBe(true);
      expect(Realm.create).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA, items.fitbit);
    });
  });

  describe('query', () => {
    it('should call Realm open and filtered is not call', async () => {
      expect.assertions(3);
      await store.query(TBL_ACT_TRACKER_SCHEMA);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.objects).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA);
      expect(Realm.objects().filtered).not.toHaveBeenCalled();
    });
    it('should call Realm open and filtered is call with a filter', async () => {
      expect.assertions(3);
      await store.query(TBL_ACT_TRACKER_SCHEMA, FILTER);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.objects).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA);
      expect(Realm.objects().filtered).toBeCalledWith(FILTER);
    });
  });
});
