import React, { useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../reducers';
import { DeploymentItem } from './DeploymentItem';
import styled from 'styled-components';
import { removeDeployment, getDeployments } from '../actions/deployments';

const UlStyled = styled.ul`
  padding: 0 20px;
  margin: 0;
`;

const ErrorMessage = styled.p`
  color: darkred;
`;

export const DeploymentsList = () => {
  const dispatch = useDispatch();
  const { data, errorMessage, isLoading } = useSelector((state: RootState) => state.deployments);

  useEffect(() => {
    dispatch(getDeployments());
  }, [dispatch]);

  const dispatchRemoveDeployment = useCallback((id: string) => dispatch(removeDeployment(id)), [
    dispatch
  ]);

  const isLoadedEmptyDeployments = !isLoading && data.length === 0;

  return (
    <fieldset>
      <legend>Deployments</legend>

      {isLoading && <p>Loading...</p>}
      {isLoadedEmptyDeployments && <p>No created deployments</p>}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <UlStyled>
        {data.map((deployment) => (
          <DeploymentItem
            key={deployment._id}
            deployment={deployment}
            onRemoveClick={dispatchRemoveDeployment}
          />
        ))}
      </UlStyled>
    </fieldset>
  );
};
