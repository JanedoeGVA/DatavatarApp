import Realm from 'realm';
import { config } from './schema';

const FILTER = 'miles > 999';
const EMPTY_FILTER = '';

/*export const insert = (model, item) =>
  new Promise((resolve, reject) => {
    console.log('performing insert');
    Realm.open(config)
      .then((realm) => {
        // Create Realm objects and write to local storage
        realm.write(() => {
          realm.create(model, item);
          item.miles += 20; // Update a property value
          const cars = realm.objects('Car').filtered(FILTER);
          // Will return a Results object with our 1 car
          resolve(cars); // => 1
        });
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
  export default new Realm(config);*/
class DB {
  insert = (model, item) =>
    new Promise((resolve, reject) => {
      console.log('performing insert');
      Realm.open(config)
        .then((realm) => {
          // Create Realm objects and write to local storage
          realm.write(() => {
            realm.create(model, item);
            item.miles += 20; // Update a property value
            const cars = realm.objects('Car').filtered(FILTER);
            // Will return a Results object with our 1 car
            resolve(cars); // => 1
          });
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
}

export default new DB();
