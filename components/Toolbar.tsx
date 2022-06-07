import React from 'react'
import { VStack } from '@chakra-ui/react'
import Button from 'components/Button'
import RightContainer from './RightContainer'
import useDraw from 'hooks/useDraw'

const Toolbar: React.FC = () => {
  const [draw, changeMode] = useDraw()

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
