import { IDeployment, IActionWithPayload } from '../common/interfaces';
import {
  GET_DEPLOYMENTS_START,
  GET_DEPLOYMENTS_SUCCESS,
  GET_DEPLOYMENTS_FAIL,
  CREATE_DEPLOYMENT_FAIL,
  REMOVE_DEPLOYMENT_FAIL,
  CREATE_DEPLOYMENT_SUCCESS,
  REMOVE_DEPLOYMENT_SUCCESS,
  DECREMENT_DEPLOYMENT_COUNTDOWN
} from '../common/constants';
import { random } from '../common/utils';

interface IDeploymentsState {
  data: IDeployment[];
  isLoading: boolean;
  errorMessage: string;
}

const defaultState: IDeploymentsState = {
  data: [],
  isLoading: false,
  errorMessage: ''
};

export const deployments = (
  state: IDeploymentsState = defaultState,
  action: IActionWithPayload
): IDeploymentsState => {
  switch (action.type) {
    case GET_DEPLOYMENTS_START:
      return { ...state, isLoading: true };
    case GET_DEPLOYMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload?.deployments.map((deployment: IDeployment) => ({
          ...deployment,
          countdown: 0
        }))
      };
    case CREATE_DEPLOYMENT_SUCCESS:
      const newDeployment: IDeployment = {
        ...action.payload?.deployment,
        countdownMs: random(5, 30) * 1000
      };
      return { ...state, data: [...state.data, newDeployment] };
    case REMOVE_DEPLOYMENT_SUCCESS:
      return { ...state, data: state.data.filter((item) => item._id !== action.payload?._id) };
    case GET_DEPLOYMENTS_FAIL:
    case CREATE_DEPLOYMENT_FAIL:
    case REMOVE_DEPLOYMENT_FAIL:
      return { ...state, isLoading: false, errorMessage: action.payload?.error?.message };
    case DECREMENT_DEPLOYMENT_COUNTDOWN:
      return {
        ...state,
        data: state.data.map((deployment) => {
          if (deployment._id !== action.payload?._id) return deployment;

          return { ...deployment, countdownMs: deployment.countdownMs - action.payload?.ms };
        })
      };
    default:
      return state;
  }
};
