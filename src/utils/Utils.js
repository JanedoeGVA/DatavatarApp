export const toTitleCase = (string) => {
  let str = string.replace(/_/g, ' ');
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const toUrlCase = (string) => {
  let str = string.replace(/\s/g, '_');
  return str.toLowerCase();
};

export const getApiImage = (apiName) => {
  switch (apiName) {
    case 'fitbit':
      return require('@images/fitbit-logo.png');
    case 'nokia_health':
      return require('@images/nokia_health-logo.png');
    case 'garmin':
      return require('@images/garmin-logo.png');
    default:
      return require('@images/my_fitnesspal-logo.png');
  }
};
