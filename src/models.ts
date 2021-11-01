export interface SingleProductData {
  id: number
  title: string
  image_url: string
  price: number
}

export interface CartItemData extends SingleProductData {
  itemCount: number
  __typename: string
}

export interface CartData {
  items: CartItemData[]
  total: number
}
