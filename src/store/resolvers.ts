import { CartItemData, SingleProductData } from "../models"
import { GET_CART_ITEMS, GET_CACHED_PRODUCTS } from "./actions"

export const resolvers = {
  Mutation: {
    addToCart: (_: any, args: any, { cache }: any) => {
      const { cart, currency } = cache.readQuery({ query: GET_CART_ITEMS })
      const { products } = cache.readQuery({ query: GET_CACHED_PRODUCTS, variables: { currency } })
      const newItem = products.find((item: SingleProductData) => item.id === args.id)
      const searchCartItem = cart?.items.find((item: CartItemData) => item.id === newItem.id)

      if (searchCartItem) {
        const newCart = cart?.items.map((item: CartItemData) => item.id === searchCartItem.id ? { ...item, itemCount: item.itemCount + 1 } : item)
        
        cache.writeQuery({
          data: {
            cart: {
              items: newCart,
              total: cart.total + newItem.price,
              __typename: 'Cart'
            }
          }
        })

        return
      }

      cache.writeQuery({
        data: {
          cart: {
            items: cart.items.concat(newItem),
            total: cart.total + newItem.price,
            __typename: 'Cart'
          }
        }
      })
    }
  }
}
