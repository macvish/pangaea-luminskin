import React from 'react'
import { Box } from '@chakra-ui/react'

import { Header, NavBar } from './components'

export const Products: React.FC = () => {
  return (
    <Box bgColor="#F5F5F4" minH="100vh">
      <NavBar />
      <Header />
    </Box>
  )
}
