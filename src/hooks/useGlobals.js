import { useRef, useState } from "react";

export const useGlobals = (initialParams = {}) => {
  const [, forceRender] = useState(0);

  const globals = useRef({
    get: initialParams,
    set: (key, value) => {
        globals.get[key] = value;
        forceRender(prev => prev + 1);
          // console.log(`Globals: set ${key} to ${value}`);
    }
  }).current;

  return { globals };
};
