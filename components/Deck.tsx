import React from 'react'
import { useMap } from 'react-map-gl'
import { Deck as StockDeck } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';

const DEFAULT_VIEWPORT = {
  latitude: 51.47,
  longitude: 0.45,
  zoom: 4,
  bearing: 0,
  pitch: 30
}
interface DeckProps {
}

const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const Deck: React.FC<DeckProps> = (props) => {
  const map = useMap()

  const deck = React.useCallback(() => new StockDeck({
    canvas: 'deck-canvas',
    width: '100%',
    height: '100%',
    initialViewState: DEFAULT_VIEWPORT,
    controller: true,
    onViewStateChange: ({viewState}) => {
      map.current?.jumpTo({
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        bearing: viewState.bearing,
        pitch: viewState.pitch
      });
    },
    layers: [
      new GeoJsonLayer({
        id: 'airports',
        data: AIR_PORTS,
        // Styles
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusScale: 2000,
        getPointRadius: (f: { properties: { scalerank: number; }; }) => 11 - f.properties.scalerank,
        getFillColor: [200, 0, 80, 180],
        // Interactive props
        pickable: true,
        autoHighlight: true,
        onClick: info =>
          // eslint-disable-next-line
          info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
      })
    ]
  }), [map]) 

  return null
}

export default Deck