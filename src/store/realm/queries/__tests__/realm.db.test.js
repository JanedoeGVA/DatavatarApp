import RealmMock from './__mock__/realm';
jest.unmock('../../realm/db');

jest.mock('realm', () => ({
  RealmMock
}));

describe('Realm ', () => {
  const Realm = require('realm');
  const realmDBStore = require('../../queries/db');

  beforeEach(() => {
    Realm.insert.mockClear();
  });

  describe('insert', () => {
    it('should return a promise with no errors', () => {
      return realmDBStore.insert('model', item).then((error) => {
        expect(error).toEqual(null);
        expect(Realm.insert).toBeCalledWith(
          'objectOne',
          returnValues.objectOne
        );
      });
    });

    it('should return a promise with no errors', () => {
      const result = [
        ['key1', JSON.stringify({ valor: 1 })],
        ['key2', JSON.stringify({ valor: 2 })]
      ];
      return asyncStore.saveData(multiSaveTestData()).then((error) => {
        expect(error).toEqual(null);
        expect(AsyncStorage.multiSet).toBeCalledWith(result);
      });
    });
  });
});
