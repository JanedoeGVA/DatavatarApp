// Define your models and their properties
export const PERS_SCHEMA = 'Person';
export const CAR_SCHEMA = 'Car';

export const CarSchema = {
  name: CAR_SCHEMA,
  properties: {
    make: 'string',
    model: 'string',
    miles: { type: 'int', default: 0 }
  }
};
export const PersonSchema = {
  name: PERS_SCHEMA,
  properties: {
    name: 'string',
    birthday: 'date',
    cars: 'Car[]',
    picture: 'data?' // optional property
  }
};

export const config = {
  path: 'testRealmApp.realm',
  schema: [CarSchema, PersonSchema],
  schemaVersion: 0 //optional
};
