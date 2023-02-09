import { renderHook, act } from '@testing-library/react-hooks';
import useEventListener from '../hooks/useEventListener';

describe('useEventListener', () => {
  // ? Case 1 : test listen clicking on window
  test('clicking on window should get window event object and type `click` ', () => {
    act(() => {
      renderHook(() =>
        useEventListener({
          eventName: 'click',
          handler: (event: any) => {
            expect(event?.type).toEqual('click');
          },
        })
      );
    });
  });
});
