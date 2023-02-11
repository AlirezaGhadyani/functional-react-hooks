import { useState, useCallback, useEffect } from 'react';
import {
  UseAsyncStatus,
  UseAsyncExecuteFunction,
  UseAsyncOptions,
  UseAsyncAsyncFunction,
  UseAsyncReturn,
} from '../types';

export default (
  asyncFunction: UseAsyncAsyncFunction,
  options: UseAsyncOptions = { immediate: true }
): UseAsyncReturn => {
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState<UseAsyncStatus>('Idle');
  const [error, setError] = useState<unknown>(null);

  // * function to execute asyncFunction
  const executeAsync = useCallback(
    async (args?: UseAsyncExecuteFunction) => {
      // * Before calling asyncFunction set status to pending
      setStatus('Pending');
      setResponse(null);
      setError(null);

      try {
        const resault = await asyncFunction(args?.variables);

        setStatus('Success');
        setResponse(resault);
        setError(null);

        if (args?.onSuccess) args.onSuccess(resault, status);
      } catch (error) {
        setStatus('Error');
        setError(error);
        setResponse(null);

        if (args?.onError) args.onError(error, status);
      }
    },
    [asyncFunction, status]
  );

  // * by default execute `executeAsync` function on component mount
  useEffect(() => {
    if (options.immediate) {
      executeAsync({
        onError: options?.onError,
        onSuccess: options?.onSuccess,
        variables: options?.variables,
      });
    }
  }, [options, executeAsync]);

  return [executeAsync, { response, status, error }];
};
