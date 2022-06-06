import React from 'react'
import { StackProps, VStack } from '@chakra-ui/react'

interface LeftContainerProps extends StackProps {

}

const LeftContainer: React.FC<LeftContainerProps> = (props) => {
  return (
    <VStack
      position="absolute"
      top={10}
      left={10}
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

export default LeftContainer
