/*

This file simply contains mappings from the swagger documentation for the response of the API call

*/
interface Price {
  id: number
  value: number
}
interface Discount {
  id: number
  value: number
}
interface Tag {
  id: number
  name: string
}
interface Adjuster {
  id: number
  name: string
  description: string
  external: boolean
  rateType: string
  rate: number
  price: Price
}
interface PriceVariants {
  id: number
  name: string
  description: string
  price: Price
  adjusters: Adjuster[]
  discount: Discount
  coupons: string[]
}
interface PriceBrandWithVariants {
  id: number
  name: string
  description: string
  color: string
  icon: string
  variants: PriceVariants[]
}
interface Pricing {
  id: number
  capacity: number
  capacityRemaining: number
  priceBand: PriceBrandWithVariants
}
interface TicketOption {
  id: number
  eventId: number
  startDate: string
  startTime: string 
  endDate: string
  endTime: string
  tags: Tag[]
  timeZone: string
  description: string
  pricing: Pricing[]
  totalCapacity: number
  totalCapacityRemaining: number
  venuePlanId: number 
}

export type {
  Tag, Price, Discount, Adjuster, 
  PriceVariants, PriceBrandWithVariants, Pricing, 
  TicketOption
}