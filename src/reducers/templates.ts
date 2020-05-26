import { ITemplate, IActionWithPayload } from '../common/interfaces';
import { GET_TEMPLATES_FAIL, GET_TEMPLATES_SUCCESS, GET_TEMPLATES_START } from '../common/constants';

interface ITemplatesState {
  data: ITemplate[];
  isLoading: boolean;
  errorMessage: string;
}

const defaultState: ITemplatesState = {
  data: [],
  isLoading: false,
  errorMessage: ''
};

export const templates = (
  state: ITemplatesState = defaultState,
  action: IActionWithPayload
): ITemplatesState => {
  switch (action.type) {
    case GET_TEMPLATES_START:
      return { ...state, isLoading: true };
    case GET_TEMPLATES_SUCCESS:
      return { ...state, isLoading: false, data: action.payload?.templates };
    case GET_TEMPLATES_FAIL:
      return { ...state, isLoading: false, errorMessage: action.payload?.error?.message };
    default:
      return state;
  }
};
