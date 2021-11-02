import React from 'react'
import { Button, Flex, Image, Text } from '@chakra-ui/react'
import { useMutation, useQuery } from 'react-apollo'

import { ADD_ITEM_TO_CART, GET_CURRENCY } from '../../../../../store/actions'
import { SingleProductData } from '../../../../../models'

interface ProductItemProps {
  item: SingleProductData
  products: SingleProductData[]
}

export const ProductItem: React.FC<ProductItemProps> = ({
  item: {
    id,
    image_url,
    price,
    title,
  },
  products
}) => {
  const { data } = useQuery<{ SavedCurrency: string }>(GET_CURRENCY)
  const [addToCart] = useMutation(ADD_ITEM_TO_CART, { variables: { id, products } })

  return (
    <Flex
      key={id}
      flexDir="column"
      alignItems="center"
      justifyContent="space-between"
      py={5}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        maxW="12rem"
      >
        <Image
          src={image_url}
          objectFit="contain"
          w={"100%"}
          h={"170px"}
        />
      </Flex>
      <Flex
        flexDir="column"
        alignItems="center"
      >
        <Text textAlign="center" my="1rem" fontSize="larger">{title}</Text>
        <Text mb="0.5rem" fontSize="larger" textAlign="center">{`${data?.SavedCurrency} ${price}`}</Text>
        <Button
          color="white"
          bgColor="#4B5548"
          width={"14rem"}
          py="28px"
          borderRadius={0}
          _hover={{ bgColor: "#2B2E2B" }}
          onClick={() => addToCart()}
        >
          Add to Cart
        </Button>
      </Flex>
    </Flex>
  )
}
