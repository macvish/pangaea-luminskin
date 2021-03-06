import React, { useState } from 'react'
import { Flex, Heading, Icon, Text, useMediaQuery } from '@chakra-ui/react'
import { GrCart } from 'react-icons/gr'
import { AiOutlineMenu } from 'react-icons/ai'
import { useQuery } from 'react-apollo'

import { GET_CART_ITEMS } from '../../../store/actions'
import { CartData } from '../../../models'
import { Cart } from './components'

interface NavBarCartData {
  cart: CartData
  currency: string
}

export const NavBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isAbove768] = useMediaQuery('(min-width: 768px)')
  const { data } = useQuery<NavBarCartData>(GET_CART_ITEMS)

  const calculateItems = () => {
    let i = 0

    data?.cart?.items.forEach((item) => {
      i = i + item.itemCount
    })

    return i
  }

  const displayMenu = () => {
    if (isAbove768) {
      return (
        <Flex
          justifyContent="space-between"
          alignItems="center"
        >
          <Heading
            fontSize={23}
            fontWeight="light"
            letterSpacing={15}
            mr={5}
          >
            LUMIN
          </Heading>
          <Flex
            justifyContent="space-between"
            w="28"
          >
            <Text>Shop</Text>
            <Text>Learn</Text>
          </Flex>
        </Flex>
      )
    }

    return <Icon as={AiOutlineMenu} w={5} h={5}/>
  }

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        top={0}
        p={5}
        pl={10}
        pr={10}
        as="nav"
        position="fixed"
        zIndex={99}
        w="100%"
        boxShadow="base"
        bgColor="#F5F5F4"
      >
        {displayMenu()}
        <Flex
          justifyContent="space-between"
          w="24"
          alignItems="center"
        >
          <Text>Account</Text>
          <div onClick={() => setIsVisible(true)}>
            <Icon as={GrCart} w={5} h={5} />
            <Text as="sup">{calculateItems()}</Text>
          </div>
        </Flex>
      </Flex>
      <Cart
        isVisible={isVisible}
        cartItems={data?.cart}
        onClose={() => setIsVisible(false)}
      />
    </>
  )
}
