import { useRef, useState } from "react";

export const useGlobals = (initialParams = {}) => {
  const [, forceRender] = useState();

  const globals = useRef({
    get: initialParams,
    set: (key, value) => {
        globals.get[key] = value;
        forceRender("");
        //   console.log(`Globals: set ${key} to ${value}`);
    }
  }).current;

  return { globals };
};
