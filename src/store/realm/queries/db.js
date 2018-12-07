export default class DB {
  constructor(config, realm) {
    this.config = config;
    this.Realm = realm;
  }

  insert = (model, item) =>
    new Promise((resolve, reject) =>
      this.Realm.open(this.config)
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

  // nextId = (objects) => {
  //   const lastId = objects.max('id');
  //   if (lastId === undefined) {
  //     return 1;
  //   }
  //   return lastId + 1;
  // };

  query = (model, filter = '') =>
    new Promise((resolve, reject) => {
      this.Realm.open(this.config)
        .then((realm) => {
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
      this.Realm.open(this.config)
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
      this.Realm.open(this.config)
        .then((realm) => {
          realm.write(() => {
            realm.create(model, item, true);
            resolve();
          });
        })
        .catch((error) => reject(error));
    });
}
