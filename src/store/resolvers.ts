import { CartItemData } from "../models"
import { GET_CART_ITEMS } from "./actions"

interface AddToCartProps {
  id: number
  products: CartItemData[]
}

interface RemoveFromCartProps {
  id: number
}

export const resolvers = {
  Mutation: {
    addToCart: (_: any, { id, products }: AddToCartProps, { cache }: any) => {
      const { cart } = cache.readQuery({ query: GET_CART_ITEMS })
      const newItem = products?.find((item: CartItemData) => item.id === id)
      
      if (cart?.items?.length > 0) {
        const searchCartItem = cart?.items.find((item: CartItemData) => item.id === id)
        
        if (searchCartItem && newItem) {
          const newCart = cart?.items.map((item: CartItemData) => item.id === searchCartItem.id ? {
            ...item,
            itemCount: item.itemCount + 1,
            price: item.price + newItem.price
          } : item)
          
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
      }
    },
    removeFromCart: (_: any, { id }: RemoveFromCartProps, { cache }: any) => {
      const { cart } = cache.readQuery({ query: GET_CART_ITEMS })
      
      if (cart?.items) {
        const item = cart?.items.find((item: CartItemData) => item.id === id)
        const newCart = cart.items.filter((item: CartItemData) => item.id !== id)
        
        cache.writeData({
          data: {
            cart: {
              items: newCart,
              total: cart.total - item.price,
              __typename: 'Cart'
            }
          }
        })
      }
    },
    removeFromItemCount: (_: any, { id, products }: AddToCartProps, { cache }: any) => {
      const { cart } = cache.readQuery({ query: GET_CART_ITEMS })
      const newItem = products?.find((item: CartItemData) => item.id === id)

      if (newItem) {
        const newCart = cart?.items.map((item: CartItemData) => item.id === id ? {
          ...item,
          itemCount: item.itemCount - 1,
          price: item.price - newItem.price
        } : item)

        console.log(newCart)
        
        cache.writeData({
          data: {
            cart: {
              items: newCart,
              total: cart.total - newItem.price,
              __typename: 'Cart'
            }
          }
        })
      }
    }
  }
}
