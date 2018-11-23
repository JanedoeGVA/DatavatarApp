//functions

import config from '../models';

export const insert = (item, model) =>
  new Promise((resolve, reject) => {
    Realm.open(config)
      .then((realm) => {
        realm.write(() => {
          let lastId = realm.objects(model).max('id');
          console.log(`lastId : ${lastId}`);
          let id;
          if (lastId === undefined) {
            console.log(`lastId is undefined`);
            id = 1;
          } else {
            console.log(`lastId is defined`);
            id = ++lastId;
          }
          console.log(`id : ${id}`);
          item.id = id;
          console.log(`baseSchemas newItem: ${JSON.stringify(item)}`);
          realm.create(tblName, item);
          resolve(item);
        });
      })
      .catch((error) => reject(error));
  }); //insertApi

export const update = (item, id) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let updatingAccessToken = realm.objectForPrimaryKey(
            TBL_API_SCHEMA,
            id
          );
          updatingAccessToken.accessTokenKey = accessToken.accessTokenKey;
          updatingAccessToken.refreshTokenKey = accessToken.refreshTokenKey;
          resolve();
        });
      })
      .catch((error) => reject(error));
  }); //updateName

export const updateAccessToken = (api) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let updatingApi = realm.objectForPrimaryKey(Ap, api.id);
          updatingApi.accessTokenKey = api.accessTokenKey;
          resolve();
        });
      })
      .catch((error) => reject(error));
  }); //updateAccessToken

export const apiExist = (apiName) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        let api = realm
          .objects(TBL_API_SCHEMA)
          .filtered(`apiName == "${apiName}"`);
        resolve(api.length !== 0);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const getApiId = (apiName) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        let api = realm
          .objects(TBL_API_SCHEMA)
          .filtered(`apiName == "${apiName}"`);
        resolve(api.id);
      })
      .catch((error) => {
        reject(error);
      });
  });

export const deleteApi = (apiId) =>
  new Promise((resolve, reject) => {
    Realm.open(config)
      .then((realm) => {
        realm.write(() => {
          let deletingApi = realm.objectForPrimaryKey(TBL_API_SCHEMA, apiId);
          realm.delete(deletingApi);
          resolve();
        });
      })
      .catch((error) => reject(error));
  }); //deleteApi

export const deleteAllApi = () =>
  new Promise((resolve, reject) => {
    Realm.open(config)
      .then((realm) => {
        realm.write(() => {
          let allApi = realm.objects(TBL_API_SCHEMA);
          realm.delete(allApi);
          resolve();
        });
      })
      .catch((error) => reject(error));
  });

export const queryAllApi = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        let allApi = realm.objects(TBL_API_SCHEMA);
        resolve(allApi);
      })
      .catch((error) => {
        reject(error);
      });
  });
