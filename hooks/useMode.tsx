import React, {
  createContext, useContext,
} from 'react';

type Mode = 'default' | 'jeepney' | 'tricycle' | 'trisikad' | 'habal_habal'

export const ModeContext = createContext<[Mode, React.Dispatch<React.SetStateAction<Mode>>]>([] as unknown as [Mode, React.Dispatch<React.SetStateAction<Mode>>]);

export const ModeProvider: React.FC<{children : React.ReactNode}> = ({ children }) => {
  const [mode, setMode] = React.useState<Mode>('default')

  return (
    <ModeContext.Provider value={[mode, setMode]}>
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const mode = useContext(ModeContext);
  return mode;
};
