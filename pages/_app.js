import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import { useEffect } from 'react'
// import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
  )
}
