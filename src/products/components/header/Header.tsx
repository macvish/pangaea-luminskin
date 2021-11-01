import React from 'react'
import {
  Box,
  Flex,
  Heading,
  Select,
  Text,
  useMediaQuery,
} from '@chakra-ui/react'

export const Header: React.FC = () => {
  const [isAbove768] = useMediaQuery('(min-width: 768px)')

  return (
    <Box
      p={62}
      pl={isAbove768 ? 28 : 12}
      pr={isAbove768 ? 28 : 12}
    >
      <Flex
        flexDir={isAbove768 ? 'row' : 'column'}
        justifyContent="space-between"
        alignItems={isAbove768 ? 'center' : 'flex-start'}
        w="100%"
        as="header"
        p={28}
        pl={0}
        pr={0}
      >
        <Box mb={!isAbove768 ? 10 : 0}>
          <Heading as="h1" fontWeight="light" fontSize={["3xl", "3xl", "5xl"]} mb={4}>All Products</Heading>
          <Text fontSize={["15px", "15px", "20px"]}>A 360° look at Lumin</Text>
        </Box>
        <Select
          placeholder="Filter by"
          w={['100%', '100%', '45%']}
          h={[12, 12, 16]}
          bgColor='white'
          borderColor="black"
          borderRadius={0}
        >
          <option value="all_product">All Products</option>
          <option value="all_product">New Products</option>
          <option value="all_product">Sets</option>
          <option value="all_product">Skincare</option>
          <option value="all_product">Hair &amp; Body Care</option>
          <option value="all_product">Accessories</option>
        </Select>
      </Flex>
    </Box>
  )
}
