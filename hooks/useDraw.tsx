import React from 'react'
import { useMap } from 'react-map-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { useMode } from 'hooks/useMode'

// @ts-ignore
import StaticMode from '@mapbox/mapbox-gl-draw-static-mode'

type CreateEvent = (evt: {features: object[]}) => void;
type UpdateEvent = (evt: {features: object[]; action: string}) => void;
type DeleteEvent = (evt: {features: object[]}) => void;

type Mode = 'default' | 'jeepney' | 'tricycle' | 'trisikad' | 'habal_habal'

const useDraw: () => [MapboxDraw, (mode: Mode) => void] = () => {
  const map = useMap()

  const [mapReady, setMapReady] = React.useState(false)
  const [mode, setMode] = useMode()

  const draw = React.useMemo(() => new MapboxDraw({
    displayControlsDefault: false,
    modes: {
      ...MapboxDraw.modes,
      static: StaticMode
    }
  }), [])

  const onCreate: CreateEvent = React.useCallback((e) => {
    console.log(e)
  }, [])

  const onUpdate: UpdateEvent = React.useCallback((e) => {
    console.log(e)
  }, [])

  const onDelete: DeleteEvent = React.useCallback((e) => {
    console.log(e)
  }, [])

  React.useEffect(() => {
    const current = map.current
    current?.addControl(draw)
    return () => {
      current?.removeControl(draw)
    }
  }, [draw, map])

  const changeMode = React.useCallback((mode: Mode) => {
    setMode(mode)
    switch (mode) {
      case 'jeepney':
        draw.changeMode('draw_line_string')
        break
      case 'habal_habal': 
      case 'tricycle':
      case 'trisikad':
        draw.changeMode('draw_polygon')
        break
      default:
        draw.changeMode('simple_select')
    }
  }, [draw, setMode])

  React.useEffect(() => {
    const ready = () => {
      setMapReady(true)
    }
    const updateMode = ({ mode }: { mode: string }) => {
      if (mode === 'simple_select' || mode === 'direct_select' || mode === 'static') {
        changeMode('default')
      }
    }
    const current = map.current
    if (current) {
      current?.on('load', ready)
      current?.on('draw.create', onCreate)
      current?.on('draw.update', onUpdate)
      current?.on('draw.delete', onDelete)
      current?.on('draw.modechange', updateMode)
    }
    return () => {
      setMapReady(false)
      if (current) {
        current?.off('load', ready)
        current?.off('draw.create', onCreate)
        current?.off('draw.update', onUpdate)
        current?.off('draw.delete', onDelete)
        current?.off('draw.modechange', updateMode)
      }
    }
  }, [changeMode, map, onCreate, onDelete, onUpdate])

  return [draw, changeMode]
}

export default useDraw
