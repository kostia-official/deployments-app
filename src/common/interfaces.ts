import { Action } from 'redux';

export interface IDeploymentInput {
  url: string;
  templateName: string;
  version: string;
}

export interface IDeployment extends IDeploymentInput {
  _id: string;
  url: string;
  templateName: string;
  version: string;
  deployedAt: Date;
  countdownMs: number;
}

export interface ITemplate {
  _id: string;
  name: string;
  versions: string[];
}

// Simplified action interface. For a bigger app it should be without any
export interface IActionWithPayload extends Action {
  payload?: any;
}
