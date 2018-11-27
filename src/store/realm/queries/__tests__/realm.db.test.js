import { activityTrackerSchema } from '../../models/activityTracker';
import Realm from 'realm';

jest.unmock('../db');

const items = {
  fitbit: {
    id: 1,
    provider: 'Fitbit',
    isValide: true,
    protocole: 'Oauth2',
    accessTokenKey: 'h"OdC{.v:ad4yZY',
    refreshTokenKey: 'ow0bgNuMWL'
  },
  withings: {
    id: 2,
    provider: 'Withing',
    isValide: true,
    protocole: 'Oauth2',
    accessTokenKey: 'y5rlKeoJ5V',
    refreshTokenKey: 'CMKeabZv0I'
  },
  garmin: {
    id: 3,
    provider: 'Garmin',
    isValide: true,
    protocole: 'Oauth1',
    accessTokenKey: 'qJLBH23qxt',
    accessTokenSecret: 'JCpVSlG2r7'
  }
};

jest.mock('../../models/activityTracker');

describe('Realm ', () => {
  const realmDBStore = require('../../queries/db');

  beforeEach(() => {});

  describe('insert', () => {
    it('should return a promise with no errors', () => {
      return realmDBStore
        .insert(activityTrackerSchema.name, items.fitbit)
        .then(() => {
          expect(Realm.create).toBeCalledWith(
            activityTrackerSchema.name,
            items.fitbit
          );
        });
    });
  });
});
