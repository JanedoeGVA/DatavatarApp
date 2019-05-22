import Realm from 'realm';
import { TBL_SUBSCRIBED_SCHEMA, config } from '../../models/__mocks__/tracker';
import DB from '../db';

const item = { id: 1, value: 'item' };
const FILTER = 'filter';

jest.unmock('../db');
jest.mock('../../models/tracker');
jest.mock('realm');

describe('Realm ', () => {
  const store = new DB(config);
  const badStore = new DB(null);
  beforeEach(() => {
    Realm.open.mockClear();
    Realm.create.mockClear();
    Realm.write.mockClear();
    Realm.objects().values.mockClear();
    Realm.objects().filtered.mockClear();
    Realm.delete.mockClear();
    Realm.objects.mockClear();
    Realm.objectForPrimaryKey.mockClear();
  });

  describe('insert', () => {
    it('should call Realm open and create', async () => {
      expect.assertions(3);
      await store.insert(TBL_SUBSCRIBED_SCHEMA, item);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.store.isInitialized).toBe(true);
      expect(Realm.create).toBeCalledWith(TBL_SUBSCRIBED_SCHEMA, item);
    });
    it('should reject when the db is not configured', async () => {
      expect.assertions(1);
      try {
        await badStore.insert(TBL_SUBSCRIBED_SCHEMA, item);
      } catch (error) {
        expect(error).not.toBe(null);
      }
    });
  });

  describe('query', () => {
    it('should call Realm open and filtered is not call', async () => {
      expect.assertions(3);
      await store.query(TBL_SUBSCRIBED_SCHEMA);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.objects).toBeCalledWith(TBL_SUBSCRIBED_SCHEMA);
      expect(Realm.objects().filtered).not.toHaveBeenCalled();
    });
    it('should call Realm open and filtered is call with a filter', async () => {
      expect.assertions(3);
      await store.query(TBL_SUBSCRIBED_SCHEMA, FILTER);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.objects).toBeCalledWith(TBL_SUBSCRIBED_SCHEMA);
      expect(Realm.objects().filtered).toBeCalledWith(FILTER);
    });
    it('should reject when the db is not configured', async () => {
      expect.assertions(1);
      try {
        await badStore.query(TBL_SUBSCRIBED_SCHEMA);
      } catch (error) {
        expect(error).not.toBe(null);
      }
    });
  });

  describe('delete', () => {
    it('should call Realm open and delete is called with only the item to delete', async () => {
      expect.assertions(3);
      await store.remove(TBL_SUBSCRIBED_SCHEMA, item);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.delete).toBeCalledWith(
        Realm.objectForPrimaryKey(TBL_SUBSCRIBED_SCHEMA, item.id)
      );
      expect(Realm.delete).toBeCalledTimes(1);
    });
    it('should call Realm open and delete is called with all items', async () => {
      expect.assertions(2);
      await store.remove(TBL_SUBSCRIBED_SCHEMA);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.delete).toBeCalledWith(Realm.objects(TBL_SUBSCRIBED_SCHEMA));
    });
    it('should reject when the db is not configured', async () => {
      expect.assertions(1);
      try {
        await badStore.remove(TBL_SUBSCRIBED_SCHEMA);
      } catch (error) {
        expect(error).not.toBe(null);
      }
    });
  });

  describe('update', () => {
    it('should call Realm open and update', async () => {
      expect.assertions(2);
      await store.update(TBL_SUBSCRIBED_SCHEMA, item);
      expect(Realm.open).toBeCalledWith(config);
      expect(Realm.create).toBeCalledWith(TBL_SUBSCRIBED_SCHEMA, item, true);
    });
    it('should reject when the db is not configured', async () => {
      expect.assertions(1);
      try {
        await badStore.update(TBL_SUBSCRIBED_SCHEMA, item, true);
      } catch (error) {
        expect(error).not.toBe(null);
      }
    });
  });
});
