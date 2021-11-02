import { gql } from "apollo-boost"

export const GET_PRODUCTS = gql`query ($currency: Currency!){
  products {
    id,
    title
    price(currency: $currency)
    image_url
  }
}`

export const GET_CURRENCY_LIST = gql`query {
  currency
}`

export const GET_CART_ITEMS = gql`query {
  cart @client {
    items {
      id
      title
      price
      image_url
      itemCount
    }
    total
  }
  SavedCurrency @client
}`

export const ADD_ITEM_TO_CART = gql`mutation ($id: String!, $products: Array!) {
  addToCart(id: $id, products: $products) @client
}`

export const REMOVE_ITEM_FROM_CART = gql`mutation ($id: String!) {
  removeFromCart(id: $id) @client
}`

export const GET_CURRENCY = gql`query {
  SavedCurrency @client
}`
