import React from 'react'
import { Box } from '@chakra-ui/react'

import { Content, Header, NavBar } from './components'

export const Products: React.FC = () => {
  return (
    <>
      <NavBar />
      <Box as="main" bgColor="#F5F5F4" minH="100vh">
        <Header />
        <Content />
      </Box>
    </>
  )
}
