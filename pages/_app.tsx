import type { AppProps } from 'next/app'
import { AuthProvider } from 'hooks/useAuthentication'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'styles/theme'

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { DrawProvider } from 'hooks/useDraw';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <DrawProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </DrawProvider>
    </AuthProvider>
  )
}

export default MyApp
