import React from 'react'
import {
  Box,
  Button,
  Flex,
  Icon,
  Modal,
  ModalContent,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useMutation, useQuery } from 'react-apollo'

import { CHANGE_CURRENCY, GET_CURRENCY, GET_CURRENCY_LIST, GET_PRODUCTS } from '../../../../../store/actions'
import { CartData, ProductsData } from '../../../../../models'
import { CartItem } from '../'

interface CartProps {
  onClose: () => void
  cartItems?: CartData
  isVisible: boolean
}

export const Cart: React.FC<CartProps> = ({ cartItems, isVisible, onClose }) => {
  const { data: currencyList } = useQuery<{ currency: [] }>(GET_CURRENCY_LIST)
  const { data: currencyData } = useQuery<{ SavedCurrency: string }>(GET_CURRENCY)
  const { data: productsData } = useQuery<ProductsData>(GET_PRODUCTS, { variables: { currency: currencyData?.SavedCurrency } })
  const [changeCurrency] = useMutation(CHANGE_CURRENCY)

  const onSelectCurrency = (value: string) => {
    changeCurrency({
      variables: { currency: value },
      refetchQueries: [
        { query: GET_PRODUCTS, variables: { currency: value } }
      ]
    })
  }

  return (
    <Modal
      isOpen={isVisible}
      onClose={onClose}
      blockScrollOnMount
      size="full"
      motionPreset="slideInRight"
      scrollBehavior="inside"
    >
      <ModalContent w="100rem" bgColor="transparent">
        <Flex
          minH="100vh"
          w="100%"
          bgColor="rgba(205, 209, 206, 0.8)"
        
        >
          <Box onClick={onClose} w={[0, 0, "66%"]} h="100%"></Box>
          <Flex
            flexDir="column"
            justifyContent="space-between"
            alignItems="center"
            bgColor="#F2F2EF"
            w={["100%", "100%", "34%"]}
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
                  onClick={onClose}
                  cursor="pointer"
                />
                <Select
                  defaultValue={currencyData?.SavedCurrency}
                  variant="unstyled"
                  w="19%"
                  onChange={({ target }) => onSelectCurrency(target.value)}
                >
                  {
                    currencyList?.currency.map((item: string, id: number) => (
                      <option value={item}>{item}</option>
                    ))
                  }
                </Select>
              </Flex>
              <Stack shouldWrapChildren wrap="wrap">
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
            <Box w="100%">
              <Flex justifyContent="space-between" alignItems="center" py={6} >
                <Text fontSize="2xl" fontWeight="bold">SubTotal</Text>
                <Text fontSize="2xl" fontWeight="bold">{`${currencyData?.SavedCurrency} ${cartItems?.total}`}</Text>
              </Flex>
              <Button
                color="white"
                fontSize="18px"
                fontWeight="medium"
                bgColor="#4B5548"
                w="100%"
                py="28px"
                borderRadius={0}
                _hover={{ bgColor: "#2B2E2B" }}
              >
                PROCEED TO CHECKOUT
              </Button>
            </Box>
          </Flex>
        </Flex>
      </ModalContent>
    </Modal>
  )
}
