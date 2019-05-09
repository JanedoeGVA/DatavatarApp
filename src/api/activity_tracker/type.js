import { number, string, shape, oneOf } from 'prop-types';
import { LIST_PROTOCOL } from '../constant';

export const tokenType = shape({
  id: number.isRequired,
  accessToken: string,
  secret: string,
  refreshToken: string
});

export const trackerType = shape({
  provider: string.isRequired,
  protocol: oneOf(LIST_PROTOCOL),
  logo: number.isRequired
});

export const subscribedTrackerType = {
  id: number.isRequired,
  avatar: string.isRequired,
  tracker: trackerType.isRequired,
  token: tokenType.isRequired
};
