import React from 'react'
import StockMap from 'react-map-gl'
import Deck from './Deck'

const DEFAULT_VIEWPORT = {
  longitude: 125.504917,
  latitude: 7.041194,
  zoom: 14
}
interface MapProps {
  children?: React.ReactNode
}

const Map: React.FC<MapProps> = (props) => {
  return (
    <StockMap
      initialViewState={DEFAULT_VIEWPORT}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      style={{ width: '100%', height: '100%' }}
    >
      {props.children}
      <Deck />
    </StockMap>
  )
}

export default Map