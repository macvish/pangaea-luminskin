import React from 'react'
import { Flex, Heading, Icon, Text, useMediaQuery } from '@chakra-ui/react'
import { GrCart } from 'react-icons/gr'
import { AiOutlineMenu } from 'react-icons/ai'

export const NavBar: React.FC = () => {
  const [isAbove768] = useMediaQuery('(min-width: 768px)')

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
      {displayMenu()}
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
