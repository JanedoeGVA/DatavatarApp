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
    (config) =>
      new Promise((resolve, reject) => {
        if (!config) {
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
  objectForPrimaryKey: jest.fn(() => {})
};

export default Realm;
