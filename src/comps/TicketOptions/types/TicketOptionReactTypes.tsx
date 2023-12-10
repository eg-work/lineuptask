

/* this file represents the "React" types, so that means the types that the components will use to integrate with */
/* this acts as a mechanism for simplifying the FE and increase test capabilities as mentioned in the other file */


/* represents a single "ticket option" row that the user can increase or decrease tickets for */
interface TicketOptionRow {
  title: string
  band_description: string
  variant_description: string
  price: number 
  price_string: string
  fee: number | null
  fee_string: string
  ticket_price_id: number
  price_band_id: number
  variant_id: number
  //in reality this wouldn't live here, just included to meet AC
  purchased_ticket_count: number
  //can also include the below as auxilliary, if they were needed later down the line for subsequent requests
  //the problem I'm foreseeing is issues working out different pricing bands capacity requirements
  // variant: 
  // price: 
  // pricing: []
}
export type { TicketOptionRow }