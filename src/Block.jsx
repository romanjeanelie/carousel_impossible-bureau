import { createContext, useContext } from "react";

const offsetContext = createContext(0);

const Block = ({ children, offset }) => {
  return (
    <offsetContext.Provider value={offset}>
      <group position={[3 * offset, 0, 0]}>{children}</group>
    </offsetContext.Provider>
  );
};

export { Block };
