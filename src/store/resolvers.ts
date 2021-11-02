import { CartItemData } from "../models"
import { GET_CART_ITEMS } from "./actions"

interface ArgumentProps {
  id: number
  products: CartItemData[]
}

export const resolvers = {
  Mutation: {
    addToCart: (_: any, { id, products }: ArgumentProps, { cache }: any) => {
      const { cart } = cache.readQuery({ query: GET_CART_ITEMS })
      const newItem = products?.find((item: CartItemData) => item.id === id)
      
      if (cart?.items?.length > 0) {
        const searchCartItem = cart?.items.find((item: CartItemData) => item.id === id)
        console.log(searchCartItem)
        
        if (searchCartItem) {
          const newCart = cart?.items.map((item: CartItemData) => item.id === searchCartItem.id ? { ...item, itemCount: item.itemCount + 1 } : item)
          
          cache.writeData({
            data: {
              cart: {
                items: newCart,
                total: cart.total + newItem?.price,
                __typename: 'Cart'
              }
            }
          })
  
          return
        }
      }

      if (newItem) {
        cache.writeData({
          data: {
            cart: {
              items: cart.items.concat({...newItem, itemCount: 1}),
              total: cart.total + newItem.price,
              __typename: 'Cart'
            }
          }
        })
        console.log(cart.items)
      }
    }
  }
}
