// pages/_document.js

import { ColorModeScript } from '@chakra-ui/react'
import { Html, Head, Main, NextScript, DocumentProps } from 'next/document'
import { theme } from 'styles/theme'

const Document: React.FC<DocumentProps> = () => {
  return (
    <Html lang='en'>
      <Head />
      <body>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document