import { SUBMIT_LOGIN } from '../actions/auth';

const initialState = {
  data: null,
  isAuth: false,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_LOGIN:
      return {
        ...state,
        data: action.payload.data,
        isAuth: true,
      };
    default:
      return state;
  }
};

export default auth;
