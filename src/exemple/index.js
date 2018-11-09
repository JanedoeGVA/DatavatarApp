import PropTypes from 'prop-types';

class ActivityTracker {
  constructor(id, provider, type, logo) {
    this.id = id;
    this.provider = provider;
    this.isAvailable = true;
    this.isValide = false;
    this.type = type;
    this.accessTokenKey = '';
    this.refreshTokenKey = '';
    this.accessTokenSecret = '';
    this.logo = require(logo);
  }
}

ActivityTracker.propTypes = {
  id: PropTypes.number.isRequired,
  provider: PropTypes.string.isRequired,
  isAvailable: PropTypes.bool.isRequired,
  isValide: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  accessTokenKey: PropTypes.string.isRequired,
  refreshTokenKey: PropTypes.string.isRequired,
  accessTokenSecret: PropTypes.string.isRequired,
  image: PropTypes.element.isRequired
};
const ADD = 'ADD';
const DELETE = 'DELETE';
const UPDATE = 'UPDATE';

const FITBIT_ID = 1;
const GARMIN_ID = 2;
const WITHINGS_ID = 3;
const STRAVA_ID = 4;

const FITBIT_PROVIDER = 'Fitbit';

const FITBIT_LOGO = 'assets/fitbit-logo.png';

const FITBIT_TRACKER = new ActivityTracker(
  FITBIT_ID,
  FITBIT_PROVIDER,
  OAUTH2,
  FITBIT_LOGO
);

const initialState = {
  byId: ['1', '2', '3', '4'],
  byName: ['Fitbit', 'Garmin', 'Withings', 'Strava'],
  byHash: {
    '1': { id: '1', content: { title: 'item 1' } },
    '2': { id: '2', content: { title: 'item 2' } },
    '3': { id: '3', content: { title: 'item 3' } }
  },
  tab: []
};

const action1 = {
  type: 'add',
  id: '4',
  payload: { id: '4', content: { title: 'item 4' } }
};

const action2 = {
  type: 'update',
  id: '2',
  payload: { content: { title: 'item 2 updated' } }
};

const action3 = {
  type: 'remove',
  id: '4'
};

const reducer = (state = intialState, action = {}) => {
  switch (action.type) {
    case 'add': {
      return {
        byId: [...state.byId, action.id],
        byHash: {
          ...state.byHash,
          [action.id]: action.payload
        }
      };
    }

    case 'update': {
      state.byHash[action.id] = {
        ...state.byHash[action.id],
        ...action.payload
      };
      return {
        ...state
      };
    }

    case 'remove': {
      const prunedIds = state.byId.filter((item) => {
        return item !== action.id; // return all the items not matching the action.id
      });
      delete state.byHash[action.id]; // delete the hash associated with the action.id

      return {
        byId: prunedIds,
        byHash: state.byHash
      };
    }

    default: {
      return state;
    }
  }
};

// assuming Redux passes in the state object as this.props.data
/*class viewData {

    Object.entries(data).map(([key, value]) => (
        <View>
          <Text>{`${key} :`}</Text>
          <View style={styles.shiftLeft}>
            { value.map(({ title, id}) => <Text key={id}>{`id: ${id}, title: "${title}"`}</Text>)}
          </View>
        </View>
      ))}
    }
return this.props.data.byId.map((item, index) => (
    <View key={index}>
      {this.props.data.byHash[item].content.title}
    </View>
  )
}*/
