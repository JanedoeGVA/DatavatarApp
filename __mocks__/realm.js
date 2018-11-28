const realm = jest.genMockFromModule('realm');

class Realm {
  constructor(params) {
    this.data = {};
    this.schema = {};
    params.schema.forEach((schema) => {
      this.data[schema.name] = {};
    });
    params.schema.forEach((schema) => {
      this.schema[schema.name] = schema;
    });
  }

  objects(schemaName) {
    return this.data[schemaName];
  }

  write = (fn) => fn();

  create = (schemaName, data) => jest.fn(() => data);
}
const open = (config) =>
  new Promise((resolve) => {
    resolve(new Realm(config));
  });

const create = (schemaName, data) => jest.fn(() => data);

realm.open = open;
realm.create = create;

module.exports = realm;
