import React, { Fragment } from 'react'
import { SimpleGrid } from '@chakra-ui/react'
import { useQuery } from 'react-apollo'

import { GET_CURRENCY, GET_PRODUCTS } from '../../../store/actions'
import { ProductsData, SingleProductData } from '../../../models'
import { ProductItem } from './components'

export const Content: React.FC = () => {
  const { data: currencyData } = useQuery<{ SavedCurrency: string }>(GET_CURRENCY)
  const { loading, data } = useQuery<ProductsData>(GET_PRODUCTS, { variables: { currency: currencyData?.SavedCurrency } })
  
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
            <ProductItem item={item} products={data?.products} />
          </Fragment>)
      }
    </SimpleGrid>
  )
}
