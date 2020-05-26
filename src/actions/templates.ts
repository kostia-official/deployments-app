import * as api from '../common/api';
import { Dispatch } from 'redux';
import { GET_TEMPLATES_FAIL, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_START } from '../common/constants';

export const getTemplates = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_TEMPLATES_START });

    const templates = await api.getTemplates();

    dispatch({ type: GET_TEMPLATES_SUCCESS, payload: { templates } });
  } catch (error) {
    dispatch({ type: GET_TEMPLATES_FAIL, payload: { error } });
  }
};
