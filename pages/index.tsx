import React from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { chakra } from '@chakra-ui/react'
import Toolbar from 'components/Toolbar'
import Infobar from 'components/Infobar'

const Home: NextPage = (props) => {
  const Map = dynamic(() => import('components/Map'), {
    ssr: false
  })

  return (
    <main>
      <chakra.div
        id="map"
        position="relative"
        w="100vw"
        h="100vh"
      >
        <Map>
          <Infobar />
          <Toolbar />
        </Map>
      </chakra.div>
    </main>
  )
}

export default Home
