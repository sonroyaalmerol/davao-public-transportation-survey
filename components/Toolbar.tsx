import React from 'react'
import { Heading, VStack } from '@chakra-ui/react'
import Card from 'components/Card'
import Button from 'components/Button'
import { useMap } from 'react-map-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import RightContainer from './RightContainer'

type createEvent = (evt: {features: object[]}) => void;
type updateEvent = (evt: {features: object[]; action: string}) => void;
type deleteEvent = (evt: {features: object[]}) => void;

const Toolbar: React.FC = () => {
  const map = useMap()
  const draw = React.useMemo(() => new MapboxDraw({
    displayControlsDefault: false
  }), [])

  const onCreate: createEvent = (e) => {
    console.log(e)
  }

  const onUpdate: updateEvent = (e) => {
    console.log(e)
  }

  const onDelete: deleteEvent = (e) => {
    console.log(e)
  }

  React.useEffect(() => {
    map.current?.addControl(draw)

    map.current?.on('draw.create' as any, onCreate)
    map.current?.on('draw.update' as any, onUpdate)
    map.current?.on('draw.delete' as any, onDelete)
    
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      map.current?.removeControl(draw)
      map.current?.off('draw.create' as any, onCreate)
      map.current?.off('draw.update' as any, onUpdate)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      map.current?.off('draw.delete' as any, onDelete)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draw, map.current])

  return (
    <RightContainer>
      <VStack>
        <Button
          onClick={() => {
            draw.changeMode('draw_line_string')
          }}
        >
          Add Jeepney Route
        </Button>
        <Button
          onClick={() => {
            draw.changeMode('draw_polygon')
          }}
        >
          Add Tricycle Area
        </Button>
        <Button
          onClick={() => {
            draw.changeMode('draw_polygon')
          }}
        >
          Add Trisikad Area
        </Button>
        <Button
          onClick={() => {
            draw.changeMode('draw_polygon')
          }}
        >
          Add Habal-habal Area
        </Button>
      </VStack>
    </RightContainer>
  )
}

export default Toolbar
