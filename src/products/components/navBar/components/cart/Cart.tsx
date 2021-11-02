import React from 'react'
import { Box, Flex, Icon, Select, Text } from '@chakra-ui/react'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useQuery } from 'react-apollo'
import { GET_CURRENCY, GET_CURRENCY_LIST } from '../../../../../store/actions'

interface CartProps {
    visible?: boolean
}

export const Cart: React.FC<CartProps> = ({ visible }) => {
  const { data: currencyList } = useQuery<{ currency: [] }>(GET_CURRENCY_LIST)
  const { data: currencyData } = useQuery<{ SavedCurrency: string }>(GET_CURRENCY)

  return (
    <Flex
      position="absolute"
      zIndex={199}
      h="100vh"
      w="100%"
      bgColor="rgba(205, 209, 206, 0.8)"
    >
      <Box w="66%" h="100%"></Box>
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
        </Box>
      </Flex>
    </Flex>
  )
}
