

/* this file represents the "React" types, so that means the types that the components will use to integrate with */
/* this acts as a mechanism for simplifying the FE and increase test capabilities as mentioned in readme */


/* represents a single "ticket option" row that the user can increase or decrease tickets for */
interface TicketOptionRow {
  //title of ticket option, left column, row 1
  title: string
  //description of the ticket option, left column, row 2
  band_description: string
  //description of variant ticket option, left column, row 3
  variant_description: string
  //formatted ticket price string
  price_string: string
  //formatted booking fee price string
  fee_string: string

  //the price,fee are no longer needed as clocked the need for their formatting
  //I've kept them just for discussion
  price: number 
  fee: number | null

  //(hopefully) unique ticket price id
  ticket_price_id: number
  //included price_band_id,variant_id to illustrate the need to take data forward
  //if the user was to "submit" their ticket choices I'm unsure what that api call will need
  //in this methodology it's prudent to include these extra id's which will be needed here
  price_band_id: number
  variant_id: number

  //in reality this wouldn't live here, just included to meet AC, please see state file for explaination 
  //specifically the descreaseTickets/increaseTickets functions
  purchased_ticket_count: number

  //can also include the below as auxilliary, if they were needed later down the line for subsequent requests
  //the problem I'm foreseeing is issues working out different pricing bands capacity requirements
  // variant: 
  // price: 
  // pricing: []
}
export type { TicketOptionRow }