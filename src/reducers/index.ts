import { combineReducers } from 'redux';
import { templates } from './templates';
import { deployments } from './deployments';

export const rootReducer = combineReducers({ templates, deployments });

export type RootState = ReturnType<typeof rootReducer>;
