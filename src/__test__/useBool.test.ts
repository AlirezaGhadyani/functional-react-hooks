import { renderHook, act } from "@testing-library/react-hooks";
import useBool from "../hooks/useBool";

describe("useBool", () => {
  // ? Case 1 : test bool state and initialValue
  test("default `bool` value must be true", () => {
    const { result } = renderHook(() => useBool(true));

    expect(result.current.bool).toEqual(true);
  });

  // ? Case 2 : test toggleBool function
  test("with toggle function call bool must change", () => {
    const { result } = renderHook(() => useBool(false));

    act(() => {
      result.current.toggleBool();
    });

    expect(result.current.bool).toEqual(true);
  });

  // ? Case 3 : test setBoolTrue function
  test("with setBoolTrue function call bool must be `true`", () => {
    const { result } = renderHook(() => useBool(false));

    act(() => {
      result.current.setBoolTrue();
    });

    expect(result.current.bool).toEqual(true);
  });

  // ? Case 4 : test setBoolFalse function
  test("with setBoolFalse function call bool must be `false`", () => {
    const { result } = renderHook(() => useBool(true));

    act(() => {
      result.current.setBoolFalse();
    });

    expect(result.current.bool).toEqual(false);
  });
});
