import { Box, BoxProps } from '@chakra-ui/react'
import React from 'react'

interface CardProps extends BoxProps {

}

const Card: React.FC<CardProps> = (props) => {
  const boxProps = { ...props }
  
  return (
    <Box
      borderRadius={20}
      backdropFilter="blur(5px) saturate(180%)"
      backgroundColor="rgba(17, 25, 40, 0.75)"
      border="1px solid rgba(255, 255, 255, 0.125)"
      color="white"
      padding="1.5rem"
      {...boxProps}
    />
  )
}

export default Card