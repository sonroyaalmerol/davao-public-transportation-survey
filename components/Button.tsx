import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@chakra-ui/react'
import React from 'react'

interface ButtonProps extends BaseButtonProps {

}

const Button: React.FC<ButtonProps> = (props) => {
  const boxProps = { ...props }
  
  return (
    <BaseButton
      borderRadius={20}
      backdropFilter="blur(5px) saturate(180%)"
      backgroundColor="rgba(17, 25, 40, 0.75)"
      border="1px solid rgba(255, 255, 255, 0.125)"
      color="white"
      padding="1rem"
      _hover={{
        backgroundColor: "rgba(17, 25, 40, 0)",
        
      }}
      {...boxProps}
    />
  )
}

export default Button