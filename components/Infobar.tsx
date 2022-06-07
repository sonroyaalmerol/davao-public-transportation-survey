import React from 'react'
import { Heading, Text, VStack } from '@chakra-ui/react'
import Card from 'components/Card'
import LeftContainer from './LeftContainer'
import { useMode } from 'hooks/useMode'

const Infobar: React.FC = () => {
  const [mode] = useMode()

  return mode === 'default' ? (
    <LeftContainer>
      <Card>
        <VStack>
          <Heading size="md">Davao City Public Transportation Map Survey</Heading>
          <Text fontSize="sm" textAlign="center">for a BS Computer Science undergraduate thesis aimed to develop a public transportation routing app in Davao City</Text>
        </VStack>
      </Card>
      <Card>
        <VStack>
          <Heading size="md">How to contribute?</Heading>
          <Text fontSize="sm" textAlign="center">Draw specific areas/routes that you know where jeepneys/tricycles/trisikads/habal-habal operate.</Text>
          <Text fontSize="sm" textAlign="center">You may also add known source and destination location with its estimated fare within the drawn areas/routes.</Text>
        </VStack>
      </Card>
    </LeftContainer>
  ) : (<></>)
}

export default Infobar
