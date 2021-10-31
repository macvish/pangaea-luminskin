import React from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

export const Header: React.FC = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      w="100%"
      p={5}
      pl={10}
      pr={10}
    >
      <Box>
        {/* <Heading as="h1">All Products</Heading>
        <Text>A 360° look at Lumin</Text> */}
      </Box>
    </Flex>
  )
}
