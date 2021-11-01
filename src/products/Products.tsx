import React from 'react'
import { Box } from '@chakra-ui/react'

import { Header, NavBar } from './components'
import { Content } from './components/content/Content'

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
