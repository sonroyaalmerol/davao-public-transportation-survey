import React from 'react'
import { StackProps, VStack } from '@chakra-ui/react'

interface RightContainerProps extends StackProps {

}

const RightContainer: React.FC<RightContainerProps> = (props) => {
  return (
    <VStack
      position="absolute"
      top={5}
      right={5}
      maxW="30vw"
      maxH="90vh"
      overflowY="scroll"
      css={{
        '&::-webkit-scrollbar': {
          display: 'none'
        },
        '&': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none'
        }
      }}
    >
      {props.children}
    </VStack>
  )
}

export default RightContainer
