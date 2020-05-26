import React from 'react';
import { DeploymentForm } from './DeploymentForm';
import { DeploymentsList } from './DeploymentsList';

export const App = () => {
  return (
    <>
      <DeploymentForm />
      <DeploymentsList />
    </>
  );
};
