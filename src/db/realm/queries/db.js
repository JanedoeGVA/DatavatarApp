import Realm from 'realm';
import { config } from '../models/activityTracker';

class DB {
  insert = (model, item) =>
    new Promise((resolve, reject) => {
      Realm.open(config)
        .then((realm) => {
          realm.write(() => {
            /*let lastId = realm.objects(model).max('id');
            let id;
            if (lastId === undefined) {
              id = 1;
            } else {
              id = ++lastId;
            }
            item.id = id;*/
            realm.create(model, item);
            resolve();
          });
        })
        .catch((error) => {
          reject(error);
        });
    });

  query = (model, filter = '') =>
    new Promise((resolve, reject) => {
      Realm.open(config)
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

  delete = (model, item = undefined) =>
    new Promise((resolve, reject) => {
      Realm.open(config)
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
      Realm.open(config)
        .then((realm) => {
          realm.write(() => {
            realm.create(model, item, true);
            resolve();
          });
        })
        .catch((error) => reject(error));
    }); //updateName
}

export default new DB();
