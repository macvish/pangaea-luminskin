import React from 'react'
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useQuery } from 'react-apollo'

import { GET_CURRENCY, GET_CURRENCY_LIST, GET_PRODUCTS } from '../../../../../store/actions'
import { CartData, ProductsData } from '../../../../../models'
import { CartItem } from '../'

interface CartProps {
  onClose?: () => void
  cartItems?: CartData
}

export const Cart: React.FC<CartProps> = ({ cartItems, onClose }) => {
  const { data: currencyList } = useQuery<{ currency: [] }>(GET_CURRENCY_LIST)
  const { data: currencyData } = useQuery<{ SavedCurrency: string }>(GET_CURRENCY)
  const { data: productsData } = useQuery<ProductsData>(GET_PRODUCTS, { variables: { currency: currencyData?.SavedCurrency } })

  return (
    <Flex
      position="absolute"
      zIndex={199}
      h="100vh"
      w="100%"
      bgColor="rgba(205, 209, 206, 0.8)"
    >
      <Box onClick={onClose} w="66%" h="100%"></Box>
      <Flex
        flexDir="column"
        justifyContent="space-between"
        alignItems="center"
        bgColor="#F2F2EF"
        w="34%"
        h="100%"
        p="2rem"
      >
        <Box w="100%" h="100%">
          <Text textAlign="center" fontSize="2xl" mb="10px">My Shopping Cart</Text>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            pb="3rem"
          >
            <Icon
              as={MdKeyboardArrowRight}
              w={7}
              h={7}
              p="3px"
              borderColor="rgba(198, 204, 199)"
              borderWidth="1px"
              borderRadius={15}
            />
            <Select value={currencyData?.SavedCurrency} variant="unstyled" w="19%">
              {
                currencyList?.currency.map((item: string, id: number) => (
                  <option value={item}>{item}</option>
                ))
              }
            </Select>
          </Flex>
          <Stack>
            {cartItems?.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                products={productsData?.products}
                currency={currencyData?.SavedCurrency}
              />
            ))}
          </Stack>
        </Box>
      </Flex>
    </Flex>
  )
}
