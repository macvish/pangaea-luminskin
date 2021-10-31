import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Select,
  Text,
} from '@chakra-ui/react'

export const Header: React.FC = () => {
  return (
    <Box
      p={62}
      pl={10}
      pr={10}
    >
      <Flex
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        as="header"
        p={28}
        pl={0}
        pr={0}
      >
        <Box>
          <Heading as="h1" fontWeight="light" fontSize="5xl" mb={5}>All Products</Heading>
          <Text fontSize="20px">A 360° look at Lumin</Text>
        </Box>
        <Select
          placeholder="Filter by"
          w={['100%', '45%']}
          h={['initial', 16]}
          bgColor='white'
          borderColor="black"
          borderRadius={0}
        >
          <option value="all_product">All Product</option>
        </Select>
      </Flex>
    </Box>
  )
}
