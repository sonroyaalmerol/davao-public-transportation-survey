import React from 'react'
import StockMap from 'react-map-gl'
import DrawControl from './DrawControl'

const DEFAULT_VIEWPORT = {
  longitude: 125.504917,
  latitude: 7.041194,
  zoom: 14
}

const Map: React.FC = () => {
  const [viewport, setViewport] = React.useState(DEFAULT_VIEWPORT)
  // const [mode, setMode] = React.useState(new DrawPolygonMode());

  return (
      <StockMap
        initialViewState={DEFAULT_VIEWPORT}
        mapStyle="mapbox://styles/mapbox/dark-v10"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        style={{ width: '100vw', height: '100vh' }}
      >
        <DrawControl
          position="top-left"
          onCreate={(e) => {console.log(['hello', e])}}
          onDelete={(e) => {console.log(['hello', e])}}
          onUpdate={(e) => {console.log(['hello', e])}}
        />
      </StockMap>
  )
}

export default Map