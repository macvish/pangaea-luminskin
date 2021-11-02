export interface SingleProductData {
  id: number
  title: string
  image_url: string
  price: number
}

export interface ProductsData {
  products: SingleProductData[]
}

export interface CartItemData extends SingleProductData {
  itemCount: number
}

export interface CartData {
  items: CartItemData[]
  total: number
  __typename?: string
}
