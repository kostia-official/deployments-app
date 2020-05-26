import * as api from '../common/api';
import { Dispatch } from 'redux';
import {
  GET_DEPLOYMENTS_START,
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAIL,
  CREATE_DEPLOYMENT_START,
  CREATE_DEPLOYMENT_SUCCESS,
  CREATE_DEPLOYMENT_FAIL,
  REMOVE_DEPLOYMENT_START,
  REMOVE_DEPLOYMENT_SUCCESS,
  REMOVE_DEPLOYMENT_FAIL,
  DECREMENT_DEPLOYMENT_COUNTDOWN
} from '../common/constants';
import { IDeploymentInput } from '../common/interfaces';

export const getDeployments = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_DEPLOYMENTS_START });

    const deployments = await api.getDeployments();

    dispatch({ type: GET_DEPLOYMENTS_SUCCESS, payload: { deployments } });
  } catch (error) {
    dispatch({ type: GET_DEPLOYMENTS_FAIL, payload: { error } });
  }
};

export const createDeployment = (deploymentInput: IDeploymentInput) => async (
  dispatch: Dispatch
) => {
  try {
    dispatch({ type: CREATE_DEPLOYMENT_START });

    const deployment = await api.createDeployment(deploymentInput);

    dispatch({ type: CREATE_DEPLOYMENT_SUCCESS, payload: { deployment } });
  } catch (error) {
    dispatch({ type: CREATE_DEPLOYMENT_FAIL, payload: { error } });
  }
};

export const removeDeployment = (_id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: REMOVE_DEPLOYMENT_START });

    await api.removeDeployment(_id);

    dispatch({ type: REMOVE_DEPLOYMENT_SUCCESS, payload: { _id } });
  } catch (error) {
    dispatch({ type: REMOVE_DEPLOYMENT_FAIL, payload: { error } });
  }
};

export const decrementCountdown = (_id: string, ms: number) => ({
  type: DECREMENT_DEPLOYMENT_COUNTDOWN,
  payload: { _id, ms }
});
