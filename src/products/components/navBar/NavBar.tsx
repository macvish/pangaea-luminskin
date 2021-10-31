import React from 'react'
import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { GrCart } from 'react-icons/gr'

export const NavBar: React.FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      top={0}
      p={5}
      pl={10}
      pr={10}
      as="nav"
      position="fixed"
      w="100%"
      boxShadow="base"
      bgColor="#F5F5F4"
    >
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
      <Flex
        justifyContent="space-between"
        w="24"
        alignItems="center"
      >
        <Text>Account</Text>
        <div>
          <Icon as={GrCart} w={5} h={5} />
          <Text as="sup">4</Text>
        </div>
      </Flex>
    </Flex>
  )
}
