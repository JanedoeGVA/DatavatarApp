import Realm from 'realm';

export default class DB {
  constructor(config) {
    this.config = config;
  }
  insert = (model, item) =>
    new Promise((resolve, reject) => {
      Realm.open(this.config)
        .then((realm) => {
          realm.write(() => {
            realm.create(model, item);
            resolve();
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

  nextId = (model) => {
    let lastId = realm.objects(model).max('id');
    if (lastId === undefined) {
      return 1;
    } else {
      return lastId + 1;
    }
  };

  query = (model, filter = '') =>
    new Promise((resolve, reject) => {
      Realm.open(this.config)
        .then((realm) => {
          let objects = realm.objects(model);
          if (filter) {
            resolve(objects.filtered(filter));
          } else {
            resolve(objects);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });

  remove = (model, item = undefined) =>
    new Promise((resolve, reject) => {
      Realm.open(this.config)
        .then((realm) => {
          realm.write(() => {
            let delItems;
            if (item) {
              console.log(`item = ${JSON.stringify(item)}`);
              delItems = realm.objectForPrimaryKey(model, item.id);
              console.log(`delItems = ${JSON.stringify(delItems)}`);
            } else {
              delItems = realm.objects(model);
            }
            realm.delete(delItems);
            resolve();
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

  update = (model, item) =>
    new Promise((resolve, reject) => {
      Realm.open(this.config)
        .then((realm) => {
          realm.write(() => {
            realm.create(model, item, true);
            resolve();
          });
        })
        .catch((error) => reject(error));
    });
}
