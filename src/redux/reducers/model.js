import { GET_MODEL_RESULT, POST_MODEL_RESULT } from '../actions/model';

// initial state
const initialState = {
  loading: false,
  data: null,
};

const model = (state = initialState, action) => {
  switch (action.type) {
    // begining
    case GET_MODEL_RESULT.begin:
      return {
        ...state,
        loading: true,
      };
    // success
    case GET_MODEL_RESULT.success:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    // fail
    case GET_MODEL_RESULT.fail:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      // begining
    case POST_MODEL_RESULT.begin:
      return {
        ...state,
        loading: true,
      };
      // success
    case POST_MODEL_RESULT.success:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
      // fail
    case POST_MODEL_RESULT.fail:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    default:
      return state;
  }
};

export default model;
