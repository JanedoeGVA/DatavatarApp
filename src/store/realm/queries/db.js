import Realm from 'realm';

export default class DB {
  constructor(config) {
    this.config = config;
  }

  getDefaultPath = () => Realm.defaultPath;

  isEmpty = () =>
    new Promise((resolve, reject) => {
      Realm.open(this.config)
        .then((realm) => {
          resolve(realm.empty);
        })
        .catch((error) => {
          console.log(`error ${error}`);
          reject(error);
        });
    });

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

  /**
   * - Return the next id of the objects type
   * @param {String} model
   * The type of an object as a string equal to the name in a ObjectSchema definition, that was specified in the configuration schema.
   * @return {number}
   */
  getNextID = (model) =>
    new Promise((resolve, reject) => {
      Realm.open(this.config)
        .then((realm) => {
          const objects = realm.objects(model);
          const nextID = this.nextID(objects);
          resolve(nextID);
        })
        .catch((error) => {
          reject(error);
        });
    });

  /**
   * - Return the next id of the objects type
   * @param {Realm.Results} objects
   * -the objects from a schema, result of Realm.objects(type)
   * @return {number}
   */
  nextID = (objects) => {
    console.log(JSON.stringify(objects));
    const lastId = objects.max('id');
    if (lastId === undefined) {
      return 1;
    }
    return lastId + 1;
  };

  /**
   * - Return objects from a model with a filter
   * @param {string} model
   * -The schema name where we want to query in the Realm config
   * @param {string} filter
   * Optional, if not set return all objects from the schema
   * @return {Promise.<Realm.Results>}
   */
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

  objectByID = (model, id) =>
    new Promise((resolve, reject) => {
      Realm.open(this.config)
        .then((realm) => {
          const object = realm.objectForPrimaryKey(model, id);
          resolve(object);
        })
        .catch((error) => reject(error));
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
