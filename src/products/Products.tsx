import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { useQuery } from 'react-apollo'

import { Content, Header, NavBar } from './components'
import { Cart } from './components/navBar/components'
import { GET_CART_ITEMS } from '../store/actions'
import { CartData } from '../models'

export const Products: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const { data } = useQuery<{ cart: CartData }>(GET_CART_ITEMS)

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
