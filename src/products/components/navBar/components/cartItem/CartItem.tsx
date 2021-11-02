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
  useNumberInput
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { useMutation, useQuery } from 'react-apollo'

import { CartItemData, SingleProductData } from '../../../../../models'
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from '../../../../../store/actions'

interface CartItemProps {
  item: CartItemData
  products?: SingleProductData[]
  currency?: string
}

export const CartItem: React.FC<CartItemProps> = ({ currency, item, products }) => {
  const [addToCart] = useMutation(ADD_ITEM_TO_CART, { variables: { id: item.id, products } })
  const {
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: 1,
    min: 1,
    max: 50,
  })

  const inc = getIncrementButtonProps({ onClick: () => console.log('clicked') })
  const dec = getDecrementButtonProps({ onClick: () => console.log('Clicked') })
  const input = getInputProps()

  return (
    <Box key={item.id} bgColor="white" w="100%" p={3} mb={2}>
      <Icon as={MdClose} position="absolute" right={10} onClick={() => console.log('Clicked')} />
      <Flex justifyContent="space-between">
        <Box>
          <Text fontSize="17px" mb="3px">{item.title}</Text>
          <Text fontSize="sm" mb="3px">Oily / Two Month</Text>
          <Text fontSize="sm" mb="3px">One time purchase of Two month supply</Text>
          <Flex justifyContent="space-between" alignItems="center" w="100%">
            <HStack maxW="7rem" maxH="4rem" borderWidth={1}>
              <Button
                {...dec}
                bgColor="transparent"
                minW={5}
                fontSize="17px"
              >-</Button>
              <Input
                {...input}
                readOnly
                variant="unstyled"
                textAlign="center"
                ml={0}
              />
              <Button
                {...inc}
                bgColor="transparent"
                minW={5}
                fontSize="17px"
              >+</Button>
            </HStack>
            <Text fontSize="2xl">{`${currency} ${item.price}`}</Text>
          </Flex>
        </Box>
        <Flex justifyContent="center" alignItems="center" w="7rem">
          <Image src={item.image_url} w={10} h={10}/>
        </Flex>
      </Flex>
    </Box>
  )
}
