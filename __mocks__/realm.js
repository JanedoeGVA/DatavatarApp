const realm = jest.genMockFromModule('realm');

open = (config) =>
  new Promise((resolve) => {
    resolve(new Realm(config));
  });

realm.open = open;

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
  write(fn) {
    fn();
  }
  create(schemaName, data) {
    return new Promise((resolve) => {
      resolve();
    });
  }
}
module.exports = realm;
