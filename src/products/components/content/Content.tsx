import React, { Fragment } from 'react'
import { Button, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import { useQuery, useMutation } from 'react-apollo'

import { ADD_ITEM_TO_CART, GET_PRODUCTS } from '../../../store/actions'
import { SingleProductData } from '../../../models'
import { ProductItem } from './components'

interface ProductsData {
  products: SingleProductData[]
}

export const Content: React.FC = () => {
  const { loading, data } = useQuery<ProductsData>(GET_PRODUCTS, { variables: { currency: "USD" } })
  
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
          : data?.products.map((item: SingleProductData) => <Fragment key={item.id}>
            <ProductItem item={item} />
          </Fragment>)
      }
    </SimpleGrid>
  )
}
