jest.unmock('../../async_storage');
jest.unmock('lodash.merge');

const returnValues = {
  arrayOne: JSON.stringify(['red', 'blue']),
  objectOne: JSON.stringify({
    isATest: true,
    hasNestedData: {
      ohYeah: "it's true"
    }
  }),
  stringOne: JSON.stringify('testing string')
};

const multiGetTestData = () => [
  ['key1', JSON.stringify({ valor: 1 })],
  ['key2', JSON.stringify({ valor: 2 })]
];

const multiSaveTestData = () => [
  ['key1', { valor: 1 }],
  ['key2', { valor: 2 }]
];

jest.mock('react-native', () => ({
  AsyncStorage: {
    setItem: jest.fn(
      () =>
        new Promise((resolve) => {
          resolve(null);
        })
    ),
    multiSet: jest.fn(
      () =>
        new Promise((resolve) => {
          resolve(null);
        })
    ),
    getItem: jest.fn(
      (key) =>
        new Promise((resolve) => {
          if (returnValues[key]) {
            resolve(returnValues[key]);
          } else {
            resolve(null);
          }
        })
    ),
    multiGet: jest.fn(
      () =>
        new Promise((resolve) => {
          resolve(multiGetTestData());
        })
    ),
    removeItem: jest.fn(
      () =>
        new Promise((resolve) => {
          resolve(null);
        })
    ),
    getAllKeys: jest.fn(
      () =>
        new Promise((resolve) => {
          resolve(['one', 'two', 'three']);
        })
    ),
    multiRemove: jest.fn(() => ({
      then: jest.fn()
    }))
  }
}));

describe('AsyncStorage ', () => {
  const { AsyncStorage } = require('react-native'); // eslint-disable-line global-require
  const asyncStore = require('../../async_storage'); // eslint-disable-line global-require

  beforeEach(() => {
    AsyncStorage.setItem.mockClear();
    AsyncStorage.multiSet.mockClear();
    AsyncStorage.getItem.mockClear();
    AsyncStorage.multiGet.mockClear();
    AsyncStorage.removeItem.mockClear();
    AsyncStorage.getAllKeys.mockClear();
    AsyncStorage.multiRemove.mockClear();
  });

  describe('save', () => {
    it('should return a promise with no errors', () =>
      asyncStore
        .saveData('objectOne', JSON.parse(returnValues.objectOne))
        .then((error) => {
          expect(error).toEqual(null);
          expect(AsyncStorage.setItem).toBeCalledWith(
            'objectOne',
            returnValues.objectOne
          );
        }));

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

  describe('retrieve', () => {
    it('should return a promise with saved data', () =>
      asyncStore.retrieveData('objectOne').then((error) => {
        expect(error).toEqual(JSON.parse(returnValues.objectOne));
        expect(AsyncStorage.getItem).toBeCalledWith('objectOne');
      }));

    it('should return a promise with saved data', () =>
      asyncStore.retrieveData(['testing', 'testing']).then((error) => {
        expect(error).toEqual([{ valor: 1 }, { valor: 2 }]);
        expect(AsyncStorage.multiGet).toBeCalledWith(['testing', 'testing']);
      }));
  });

  describe('update', () => {
    it('should return a promise with no errors', () =>
      asyncStore
        .updateData('objectOne', {
          isAGoodTest: false,
          hasNestedData: {
            boom: true
          }
        })
        .then((error) => {
          expect(error).toEqual(null);
          expect(AsyncStorage.setItem).toBeCalledWith(
            'objectOne',
            JSON.stringify({
              isATest: true,
              hasNestedData: {
                ohYeah: "it's true",
                boom: true
              },
              isAGoodTest: false
            })
          );
        }));

    it('should handle a string and return a promise with no errors', () =>
      asyncStore.updateData('stringOne', 'asdf').then((error) => {
        expect(error).toEqual(null);
        expect(AsyncStorage.setItem).toBeCalledWith(
          'stringOne',
          JSON.stringify('asdf')
        );
      }));
  });

  describe('delete', () => {
    it('should return a promise with no errors', () =>
      asyncStore.removeData('testing').then((error) => {
        expect(error).toEqual(null);
        expect(AsyncStorage.removeItem).toBeCalledWith('testing');
      }));

    it('should handle an array of keys', () => {
      const keys = ['thingOne', 'thingTwo'];
      return asyncStore.removeData(keys).then((error) => {
        expect(error).toEqual(null);
        expect(AsyncStorage.multiRemove).toBeCalledWith(keys);
      });
    });
  });

  describe('keys', () => {
    it('should return the keys', () =>
      asyncStore.keysData().then((keys) => {
        expect(keys).toEqual(['one', 'two', 'three']);
        expect(AsyncStorage.getAllKeys).toBeCalled();
      }));
  });

  describe('push', () => {
    it('should handle a non-initialized key', () => {
      const key = 'arrayNonExistent';
      const value = 'green';
      return asyncStore.pushData(key, value).then((error) => {
        expect(error).toEqual(null);
        expect(AsyncStorage.getItem).toBeCalledWith(key);
        expect(AsyncStorage.setItem).toBeCalledWith(
          key,
          JSON.stringify([value])
        );
      });
    });
    it('should handle an initialized array', () => {
      const key = 'arrayOne';
      const value = 'green';
      return asyncStore.pushData(key, value).then((error) => {
        expect(error).toEqual(null);
        expect(AsyncStorage.getItem).toBeCalledWith(key);
        expect(AsyncStorage.setItem).toBeCalledWith(
          key,
          JSON.stringify(['red', 'blue', value])
        );
      });
    });
    it('should throw an error if saved value for key is neither null nor array', () => {
      const key = 'stringOne';
      const value = 'green';
      return asyncStore.pushData(key, value).catch((error) => {
        expect(error.message).toEqual(
          'Existing value for key "stringOne" must be of type null or Array, received string.'
        );
      });
    });
  });
});
