import type { TicketOption } from "../types/TicketOptionDataTypes";
import type { TicketOptionRow } from "../types/TicketOptionReactTypes";



//used this one-liner from the internet, rationale is the problems surrounding rounding of floating point numbers
//things like 1.345, which I'm not even sure will be possible in your current system / api / database
//but it's just used for quickness
function roundToDecimalPlaces(value: number, decimalPlaces: number) {
  return Number(Math.round(parseFloat(value + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(decimalPlaces)
}



//outsourced the function for creating the ticket option rows
function computeTicketOptionRowFromTicketOptions(ticketOption: TicketOption): TicketOptionRow[] {
  let ticketOptionRows: TicketOptionRow[] = []
  
  const { pricing } = ticketOption
  
  //iterating over the prices, using object deconstructing  syntax to extract properties
  pricing.forEach(({ priceBand, }, ii) => {


    const { variants } = priceBand
    variants.forEach(({ adjusters, description, id, name, price, }, ii) => {

      let fee = null

      //checking for the presense of an element in the list as it's a list and not raw value
      //unsure the wider functionality, for example, if adjusters can be empty list etc
      if (adjusters.length > 0) {
        fee = adjusters[0].price.value
      }

      //formatting the fee string for easier displaying
      let fee_string = ""
      if (fee != null) {
        fee_string = `(+ £${roundToDecimalPlaces(fee, 2)} fee)`
      }

      
      //see types file for explanation of properties
      const ticketOptionRow: TicketOptionRow = {
        //title is combination of names in different objects
        title: `${priceBand.name} - ${name}`,
        //simple extraction
        band_description: priceBand.description,
        //simple extraction
        variant_description: description,
        //I originally started out with just price and fee as numbers
        //but as the actual design has more than just the number, ie pound sign, brackets etc
        //it is best to keep that translation here so it can be easily tested
        //I would most likely remove price and fee from this type as it's no longer needed (keeping their respective id's)
        //but I thought I would leave it to enable discussion
        price: price.value,
        price_string: `£${roundToDecimalPlaces(price.value, 2)}`,
        fee,
        fee_string,
        //hopefully unique as dicussed
        ticket_price_id: price.id,
        //included for dicussion 
        price_band_id: priceBand.id,
        variant_id: id,
        //setup to work here, but results in poor implementation
        purchased_ticket_count: 0,
      }

      ticketOptionRows.push(ticketOptionRow)
    })
  })



  return ticketOptionRows 
}
export { computeTicketOptionRowFromTicketOptions }