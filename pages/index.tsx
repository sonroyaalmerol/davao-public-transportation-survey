import React from 'react'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

const Home: NextPage = () => {
  const Map = dynamic(() => import('components/Map'), {
    ssr: false
  })

  return (
    <main>
      <div id="map">
        <Map />
      </div>
    </main>
  )
}

export default Home
