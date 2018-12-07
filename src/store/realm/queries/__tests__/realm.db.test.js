import {
  TBL_ACT_TRACKER_SCHEMA,
  config
} from '../../models/__mocks__/activityTracker';
import DB from '../db';

const item = { id: 1, value: 'item' };

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
    (conf) =>
      new Promise((resolve, reject) => {
        if (!conf) {
          reject(new Error('no config'));
        }
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
  objects: jest.fn(() => Realm.lstObjects),
  delete: jest.fn(() => {}),
  objectForPrimaryKey: jest.fn(() => item)
};

const FILTER = 'filter';

jest.unmock('../db');
jest.mock('../../models/activityTracker');

describe('Realm ', () => {
  const store = new DB(config, Realm);
  const badStore = new DB(null, Realm);
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
      await store.insert(TBL_ACT_TRACKER_SCHEMA, item);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.store.isInitialized).toBe(true);
      expect(Realm.create).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA, item);
    });
    it('should reject when the db is not configured', async () => {
      expect.assertions(1);
      try {
        await badStore.insert(TBL_ACT_TRACKER_SCHEMA, item);
      } catch (error) {
        expect(error).not.toBe(null);
      }
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
    it('should reject when the db is not configured', async () => {
      expect.assertions(1);
      try {
        await badStore.query(TBL_ACT_TRACKER_SCHEMA);
      } catch (error) {
        expect(error).not.toBe(null);
      }
    });
  });

  describe('delete', () => {
    it('should call Realm open and delete is called with only the item to delete', async () => {
      expect.assertions(3);
      await store.remove(TBL_ACT_TRACKER_SCHEMA, item);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.delete).toBeCalledWith(
        Realm.objectForPrimaryKey(TBL_ACT_TRACKER_SCHEMA, item.id)
      );
      expect(Realm.delete).toBeCalledTimes(1);
    });
    it('should call Realm open and delete is called with all items', async () => {
      expect.assertions(2);
      await store.remove(TBL_ACT_TRACKER_SCHEMA);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.delete).toBeCalledWith(
        Realm.objects(TBL_ACT_TRACKER_SCHEMA)
      );
    });
    it('should reject when the db is not configured', async () => {
      expect.assertions(1);
      try {
        await badStore.remove(TBL_ACT_TRACKER_SCHEMA);
      } catch (error) {
        expect(error).not.toBe(null);
      }
    });
  });

  describe('update', () => {
    it('should call Realm open and update', async () => {
      expect.assertions(2);
      await store.update(TBL_ACT_TRACKER_SCHEMA, item);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.create).toBeCalledWith(TBL_ACT_TRACKER_SCHEMA, item, true);
    });
    it('should reject when the db is not configured', async () => {
      expect.assertions(1);
      try {
        await badStore.update(TBL_ACT_TRACKER_SCHEMA, item, true);
      } catch (error) {
        expect(error).not.toBe(null);
      }
    });
  });
});
