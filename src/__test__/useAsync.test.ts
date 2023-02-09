import { renderHook, act } from '@testing-library/react-hooks';
import useAsync from '../hooks/useAsync';

const successData = { name: 'alireza', lasname: 'ghadyani' };
const failedData = 'you failed';

const asyncFunction = async (isResolved: boolean = true) => {
  return new Promise((resolve, reject) =>
    isResolved ? resolve(successData) : reject(failedData)
  );
};

describe('useBool', () => {
  // ? Case 1 : test success status
  test('after calling execute function when promise resolved should get data', () => {
    act(() => {
      const {
        result: { current },
      } = renderHook(() => useAsync(asyncFunction, { immediate: false }));

      current?.[0]({
        onSuccess: (response, status) => {
          expect(response).toEqual(successData);
          expect(status).toEqual('Success');
        },
      });
    });
  });

  // ? Case 2 : test error status
  test('after calling execute function when promise resolved should get error', () => {
    act(() => {
      const {
        result: { current },
      } = renderHook(() =>
        useAsync(asyncFunction, { immediate: false, variables: false })
      );

      current?.[0]({
        onError: (response, status) => {
          expect(response).toEqual(failedData);
          expect(status).toEqual('Error');
        },
      });
    });
  });
});
