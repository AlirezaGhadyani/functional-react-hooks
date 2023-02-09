import { useState } from "react";

export default (initialState = false) => {
  const [bool, setBool] = useState<boolean>(initialState);

  // * toggle bool
  const toggleBool = () => setBool((prevBool) => !prevBool);

  // * set bool true
  const setBoolTrue = () => setBool(true);

  // * set bool false
  const setBoolFalse = () => setBool(false);

  return { bool, setBool, toggleBool, setBoolTrue, setBoolFalse };
};
