const Realm = jest.genMockFromModule('realm');

const itemActTracker = {};
const store = {
  data: { itemActTracker }
};

Realm.open = jest.fn(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(Realm);
      }, 10);
    })
);

Realm.write = jest.fn((fn) => fn());

Realm.create = jest.fn(() => {});
Realm.objects = jest.fn((schemaName) => {
  const objects = Object.values(store.data[schemaName]);
  objects.values = () => objects;
});

module.exports = Realm;
// class RealmConst {
//   constructor(params) {
//     this.data = {};
//     this.schema = {};
//     params.schema.forEach((schema) => {
//       this.data[schema.name] = {};
//     });
//     params.schema.forEach((schema) => {
//       this.schema[schema.name] = schema;
//     });
//   }
//   objects(schemaName) {
//     return this.data[schemaName];
//   }
//   write(fn) {
//     fn();
//   }
//   create(schemaName, data) {
//     return new Promise((resolve) => {
//       resolve();
//     });
//   }
// }
