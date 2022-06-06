import React, {
  createContext, useContext,
} from 'react';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

export const DrawContext = createContext<{ draw: MapboxDraw | null, setDraw: React.Dispatch<React.SetStateAction<MapboxDraw | null>> } | null>(null);

export const DrawProvider: React.FC<{children : React.ReactNode}> = ({ children }) => {
  const [draw, setDraw] = React.useState<MapboxDraw | null>(null)

  return (
    <DrawContext.Provider value={{ draw, setDraw }}>
      {children}
    </DrawContext.Provider>
  );
};

export const useDraw = () => {
  const draw = useContext(DrawContext);
  return draw;
};
