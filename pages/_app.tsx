import type { AppProps } from 'next/app'
import { AuthProvider } from 'hooks/useAuthentication'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'styles/theme'

import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import { ModeProvider } from 'hooks/useMode';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <ModeProvider>
        <ChakraProvider theme={theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </ModeProvider>
    </AuthProvider>
  )
}

export default MyApp
