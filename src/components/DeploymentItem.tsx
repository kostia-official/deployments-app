import React, { useEffect, useRef } from 'react';
import { IDeployment } from '../common/interfaces';
import { useDispatch } from 'react-redux';
import { decrementCountdown } from '../actions/deployments';

export interface IDeploymentItemProps {
  deployment: IDeployment;
  onRemoveClick: (id: string) => void;
}

export const DeploymentItem = ({ deployment, onRemoveClick }: IDeploymentItemProps) => {
  const dispatch = useDispatch();
  const { _id, templateName, version, url, countdownMs } = deployment;

  // Save initial value of countdown to clear interval
  const totalCountdown = useRef<number>(countdownMs);

  useEffect(() => {
    if (totalCountdown.current <= 0) return () => {};

    const intervalMs = 10;
    const interval = setInterval(() => {
      dispatch(decrementCountdown(_id, intervalMs));
    }, intervalMs);

    // Give to interval extra time to live to be sure that it finishes
    const clearIntervalAfter = totalCountdown.current + 100;
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, clearIntervalAfter);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [dispatch, totalCountdown, _id]);

  return (
    <li>
      {countdownMs > 0
        ? `Wait ${Number(countdownMs / 1000).toFixed(2)} seconds...`
        : `${templateName}, ${version}, ${url}`}
      &nbsp;
      <button onClick={() => onRemoveClick(_id)}>Remove</button>
    </li>
  );
};
