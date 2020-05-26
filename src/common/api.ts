import axios, { AxiosRequestConfig } from 'axios';
import { IDeployment, ITemplate, IDeploymentInput } from './interfaces';

const api = axios.create({ baseURL: 'https://deployments-api.herokuapp.com/' });

const request = async (url: string, config: AxiosRequestConfig) => {
  const { data } = await api(url, config);
  return data;
};

export const getTemplates = (): Promise<ITemplate[]> => {
  return request('/templates', { method: 'GET' });
};

export const getDeployments = async (): Promise<IDeployment[]> => {
  return request('/deployments', { method: 'GET' });
};

export const createDeployment = async (data: IDeploymentInput): Promise<IDeployment> => {
  return request('/deployments', { method: 'POST', data });
};

export const removeDeployment = async (id: string): Promise<void> => {
  return request(`/deployments/${id}`, { method: 'DELETE' });
};
