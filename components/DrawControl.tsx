import MapboxDraw from '@mapbox/mapbox-gl-draw';
import { useControl } from 'react-map-gl';

import type { MapRef, ControlPosition } from 'react-map-gl';

type DrawControlProps = ConstructorParameters<typeof MapboxDraw>[0] & {
  position?: ControlPosition;

  onCreate?: (evt: {features: object[]}) => void;
  onUpdate?: (evt: {features: object[]; action: string}) => void;
  onDelete?: (evt: {features: object[]}) => void;
};

const DrawControl: React.FC<DrawControlProps> = (props) => {
  const onCreate = (e: any) => {
    if ('onCreate' in props && props.onCreate) {
      props?.onCreate(e as any)
    }
  }

  const onUpdate = (e: any) => {
    if ('onUpdate' in props && props.onUpdate) {
      props?.onUpdate(e as any)
    }
  }

  const onDelete = (e: any) => {
    if ('onDelete' in props && props.onDelete) {
      props?.onDelete(e as any)
    }
  }

  useControl<MapboxDraw>(
    ({ map }: { map: MapRef }) => {
      map.on('draw.create' as any, onCreate);
      map.on('draw.update' as any, onUpdate);
      map.on('draw.delete' as any, onDelete);
      return new MapboxDraw(props);
    },
    ({ map }: { map: MapRef }) => {
      map.off('draw.create' as any, onCreate);
      map.off('draw.update' as any, onUpdate);
      map.off('draw.delete' as any, onDelete);
    },
    {
      position: props.position
    }
  );

  return null;
}

DrawControl.defaultProps = {
  onCreate: () => {},
  onUpdate: () => {},
  onDelete: () => {}
};

export default DrawControl