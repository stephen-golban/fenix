export type ProductOption = {
  id: string
  name: string
  values: string[]
}

export type Money = {
  amount: string
}

export type ProductVariant = {
  id: string
  title: string
  availableForSale: boolean
  selectedOptions: {
    name: string
    value: string
  }[]
  price: Money
}

export type Product = {
  id: string
  title: string
  description: string
  category: string,
  availableOnDemand: boolean
  provider: string
  color: string
  photos: {
    id: string
    url: string
  }[]
  dimensions_with_price: {
    id: string
    width: number
    length: number
    height: number
    price: number
  }[]
}
