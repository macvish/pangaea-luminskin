import { gql } from "apollo-boost"

export const GET_PRODUCTS = gql`query ($currency: Currency!){
  products {
    id,
    title
    price(currency: $currency)
    image_url
  }
}`

export const GET_CACHED_PRODUCTS = gql`query ($currency: Currency!){
  products {
    id,
    title
    price(currency: $currency)
    image_url
  }
}`

export const GET_CART_ITEMS = gql`query {
  cart @client {
    items {
      title
      price
      image_url
    }
    total
  }
  currency @client
}`

export const ADD_ITEM_TO_CART = gql`mutation ($id: String!) {
  addToCart(id: $id) @client
}`

export const GET_CURRENCY = gql`query {
  currency @client
}`
