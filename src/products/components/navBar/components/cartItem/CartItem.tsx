import React, { useState, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  useNumberInput
} from '@chakra-ui/react'
import { MdClose } from 'react-icons/md'
import { useMutation } from 'react-apollo'

import { CartItemData, SingleProductData } from '../../../../../models'
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, REMOVE_ITEM_FROM_ITEM_COUNT } from '../../../../../store/actions'

interface CartItemProps {
  item: CartItemData
  products?: SingleProductData[]
  currency?: string
}

export const CartItem: React.FC<CartItemProps> = ({ currency, item, products }) => {
  const [itemCount, setItemCount] = useState<number>(item.itemCount)
  const [addToCart] = useMutation(ADD_ITEM_TO_CART, { variables: { id: item.id, products } })
  const [removeFromCart] = useMutation(REMOVE_ITEM_FROM_CART, { variables: { id: item.id } })
  const [removeFromItemCount] = useMutation(REMOVE_ITEM_FROM_ITEM_COUNT, { variables: { id: item.id, products } })
  const {
    valueAsNumber,
    getInputProps,
    getIncrementButtonProps,
    getDecrementButtonProps,
  } = useNumberInput({
    step: 1,
    defaultValue: item.itemCount,
    min: 1,
    max: 50,
  })

  const inc = getIncrementButtonProps()
  const dec = getDecrementButtonProps()
  const input = getInputProps()
  
  useEffect(() => {
    if (valueAsNumber > itemCount) {
      addToCart()
      setItemCount(valueAsNumber)
    } else if (valueAsNumber < itemCount) {
      removeFromItemCount()
      setItemCount(valueAsNumber)
    }

  }, [valueAsNumber, itemCount, addToCart, removeFromItemCount])

  return (
    <Box key={item.id} bgColor="white" w="100%" p={3} mb={2}>
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
                _hover={{ bgColor: "tranparent" }}
                cursor="pointer"
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
                _hover={{ bgColor: "tranparent" }}
                cursor="pointer"
              >+</Button>
            </HStack>
            <Text fontSize="2xl">{`${currency} ${item.price}`}</Text>
          </Flex>
        </Box>
        <Flex flexDir="column" alignItems="center" w="7rem">
          <Icon
            as={MdClose}
            alignSelf="flex-end"
            cursor="pointer"
            right={10}
            onClick={() => removeFromCart()}
          />
          <Image src={item.image_url} w={10} h={10} mt="2rem"/>
        </Flex>
      </Flex>
    </Box>
  )
}
