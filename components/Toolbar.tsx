import React from 'react'
import { VStack } from '@chakra-ui/react'
import Button from 'components/Button'
import { useMap } from 'react-map-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import RightContainer from './RightContainer'
import { useMode } from 'hooks/useMode'

type CreateEvent = (evt: {features: object[]}) => void;
type UpdateEvent = (evt: {features: object[]; action: string}) => void;
type DeleteEvent = (evt: {features: object[]}) => void;

type Mode = 'default' | 'jeepney' | 'tricycle' | 'trisikad' | 'habal_habal'

const Toolbar: React.FC = () => {
  const map = useMap()

  const [mapReady, setMapReady] = React.useState(false)
  const [mode, setMode] = useMode()

  const draw = React.useMemo(() => new MapboxDraw({
    displayControlsDefault: false
  }), []) 

  React.useEffect(() => {
    const current = map.current

    current?.addControl(draw)

    return () => {
      current?.removeControl(draw)
    }
  }, [draw, map])

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
    console.log(mode)
  }, [mode])

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
      if (mode === 'simple_select' || mode === 'direct_select') {
        changeMode('default')
      }
    }

    const current = map.current

    if (current) {
      current?.on('draw.create', onCreate)
      current?.on('draw.update', onUpdate)
      current?.on('draw.delete', onDelete)
      current?.on('load', ready)
      current?.on('draw.modechange', updateMode)
    }

    return () => {
      setMapReady(false)
      if (current) {
        current?.off('draw.create', onCreate)
        current?.off('draw.update', onUpdate)
        current?.off('draw.delete', onDelete)
        current?.off('load', ready)
        current?.off('draw.modechange', updateMode)
      }
    }
  }, [changeMode, map, onCreate, onDelete, onUpdate])

  return (
    <RightContainer>
      <VStack>
        <Button
          onClick={() => {
            changeMode('jeepney')
          }}
          size="sm"
        >
          Add Jeepney Route
        </Button>
        <Button
          onClick={() => {
            changeMode('tricycle')
          }}
          size="sm"
        >
          Add Tricycle Area
        </Button>
        <Button
          onClick={() => {
            changeMode('trisikad')
          }}
          size="sm"
        >
          Add Trisikad Area
        </Button>
        <Button
          onClick={() => {
            changeMode('habal_habal')
          }}
          size="sm"
        >
          Add Habal-habal Area
        </Button>
      </VStack>
    </RightContainer>
  )
}

export default Toolbar
