class Realm {
  constructor() {
    this.isInitialized = false;
    this.store = {
      schema: {},
      data: {}
    };
  }

  open = (jest.fn = (config) =>
    new Promise((resolve) => {
      if (!this.isInitialized) {
        this.store.schema = config.schema;
        config.schema.forEach((schema) => {
          this.store.data[schema.name] = {};
        });
        this.isInitialized = true;
      }
      setTimeout(() => {
        resolve(this);
      }, 10);
    }));

  write = (fn) => fn();

  create = (schema, item) => {};

  objects = () =>
    jest.fn((schemaName) => {
      const objects = Object.values(this.store.data[schemaName]);
      objects.values = () => objects;
    });
}

export default new Realm();
