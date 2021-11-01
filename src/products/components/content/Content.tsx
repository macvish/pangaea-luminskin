import React from 'react'
import { Button, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { gql, useQuery } from '@apollo/client'

interface ProductData {
  title: string
  image_url: string
  price: number
}

interface ProductsData {
  products: ProductData[]
}

export const Content: React.FC = () => {
  const GET_PRODUCTS = gql`query getProducts($currency: Currency!){
    products {
      title,
      price(currency: $currency),
      image_url
    }
  }`

  const { loading, data } = useQuery<ProductsData>(GET_PRODUCTS, { variables: { currency: "USD" } })

  const renderProduct = ({ image_url, price, title }: ProductData, index: number) => {
    return <Flex
      key={index}
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      py={10}
    >
      <Image src={image_url} w={["8rem", 40]} h={["8rem", 40]}  />
      <Text textAlign="center" my="1rem" fontSize="larger">{title}</Text>
      <Text mb="0.5rem" fontSize="larger">{price}</Text>
      <Button
        color="white"
        bgColor="#4B5548"
        width={"14rem"}
        py="28px"
        borderRadius={0}
        _hover={{ bgColor: "#2B2E2B" }}
      >
        Add to Cart
      </Button>
    </Flex>
  }

  console.log(loading, data)
  
  return (
    <SimpleGrid
      bgColor="#E2E6E3"
      columns={[2, 2, 3]}
      spacing={["20px", "20px", "24px"]}
      py={[10, 10, 10]}
      px={[5, 5, 20]}
    >
      {
        loading
          ? null
        : data?.products.map((item: ProductData, index: number) => renderProduct(item, index))
      }
    </SimpleGrid>
  )
}
