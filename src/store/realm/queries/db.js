import Realm from 'realm';

export default class DB {
  constructor(config) {
    this.config = config;
  }

  getDefaultPath = () => Realm.defaultPath;

  isEmpty = (model) =>
    new Promise((resolve, reject) =>
      Realm.open(this.config)
        .then((realm) => {
          const objects = realm.objects(model);
          resolve(objects.isEmpty);
        })
        .catch((error) => {
          reject(error);
        })
    );

  insert = (model, item) =>
    new Promise((resolve, reject) =>
      Realm.open(this.config)
        .then((realm) => {
          realm.write(() => {
            realm.create(model, item);
            resolve();
          });
        })
        .catch((error) => {
          reject(error);
        })
    );

  insertCollection = (model, arr) =>
    new Promise((resolve, reject) =>
      Realm.open(this.config)
        .then((realm) => {
          realm.write(() => {
            arr.map((item) => realm.create(model, item));
            resolve();
          });
        })
        .catch((error) => {
          reject(error);
        })
    );
  // nextId = (objects) => {
  //   const lastId = objects.max('id');
  //   if (lastId === undefined) {
  //     return 1;
  //   }
  //   return lastId + 1;
  // };

  query = (model, filter = '') =>
    new Promise((resolve, reject) => {
      Realm.open(this.config)
        .then((realm) => {
          console.log(this.getDefaultPath());
          const objects = realm.objects(model);
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
              delItems = realm.objectForPrimaryKey(model, item.id);
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
