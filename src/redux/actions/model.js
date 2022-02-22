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
