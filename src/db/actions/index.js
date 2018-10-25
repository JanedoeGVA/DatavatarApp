import { FAILURE, SUCCESS } from '../constant';

export const successAction = (data) => {
  return {
    type: SUCCESS,
    data: data
  };
};

export const failureAction = (error, data) => {
  return {
    type: FAILURE,
    data: data
  };
};
