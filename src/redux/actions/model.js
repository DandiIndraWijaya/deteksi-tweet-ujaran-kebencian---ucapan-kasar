import services from '@src/config/services';
import URL from '@src/config/url';
import { generatorAction } from '../generator';

// generate reducers
export const GET_MODEL_RESULT = generatorAction('GET_MODEL_RESULT');
export const getModelResult = (callback) => (dispatch) => {
  // initialize dispatcher
  dispatch({ type: GET_MODEL_RESULT.begin });

  // make get request
  return services
    .get(URL.MODEL).then((res) => {
      if (callback) callback(res);
      dispatch({
        type: GET_MODEL_RESULT.success,
        payload: res.data,
      });
    })
    // catch if failed
    .catch((e) => {
      if (callback) callback(e);
      const error = e.response.data;
      dispatch({
        type: GET_MODEL_RESULT.fail,
        payload: { error },
      });
    });
};

export const POST_MODEL_RESULT = generatorAction('POST_MODEL_RESULT');
export const postModelResult = (payload, callback) => (dispatch) => {
  // initialize dispatcher
  dispatch({ type: POST_MODEL_RESULT.begin });

  // make get request
  return services
    .post(URL.MODEL, payload).then((res) => {
      if (callback) callback(res);
      dispatch({
        type: POST_MODEL_RESULT.success,
        payload: res.data,
      });
    })
    // catch if failed
    .catch((e) => {
      if (callback) callback(e);
      const error = e.response.data;
      dispatch({
        type: POST_MODEL_RESULT.fail,
        payload: { error },
      });
    });
};

export const POST_TEST_MODEL = generatorAction('POST_TEST_MODEL');
export const postTestModel = (payload, callback) => (dispatch) => {
  dispatch({ type: POST_TEST_MODEL.begin });

  return services
    .post(URL.TEST_MODEL, payload).then((res) => {
      if (callback) callback(res);
      dispatch({
        type: POST_TEST_MODEL.success,
        payload: res.data,
      });
    })
    // catch if failed
    .catch((e) => {
      if (callback) callback(e);
      const error = e.response.data;
      dispatch({
        type: POST_TEST_MODEL.fail,
        payload: { error },
      });
    });
};
