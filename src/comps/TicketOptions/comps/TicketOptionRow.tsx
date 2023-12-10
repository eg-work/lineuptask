import { useTicketOptionsStore } from "../state/TicketOptionsState"
import { clsx } from "clsx"

//I'm using ticketPriceId as I believe it's the only unique value present,
//this could and most likely is wrong and therefore I would need to use a different approach
//essentially I'm trying to make it so that each of these "TicketOptionsRow"
//link to the specific id or id(s) that they need in order to send further post requests for obtaining tickets
interface props { ticketPriceId: number }
const TicketOptionRow = ({ ticketPriceId }: props) => {


  const ticketOptionRow = useTicketOptionsStore(state => state.ticketOptionRows.find(x => x.ticket_price_id === ticketPriceId))


  //this can be simplfied, just written like this for simplicity
  const decreaseTickets = useTicketOptionsStore(state => state.descreaseTickets)
  const increaseTickets = useTicketOptionsStore(state => state.increaseTickets)


  if (typeof ticketOptionRow === "undefined") return null;


  //as the ticket option row is mainly just text displayed (the only interaction being the plus or minus)
  //I thought it's best to have all these elements in the same component for simplicity + performance.
  //this will negate the need to render multiple child components and helps with general code health (small file)
  //I use selectors to get the increase/decrease functions (albeit this is a poor implementation as it will set the whole list each time)
  //the rest of the row is just displayed from the "react" type we have computed during transformation of the api call
  return (
    <div className={clsx("ticketOptionRow")}>
      <div className={clsx("titles")}>
        <div>{ ticketOptionRow.title }</div>
        <div>{ ticketOptionRow.band_description }</div>
        <div>{ ticketOptionRow.variant_description }</div>
      </div>
      <div className={clsx("prices")}>
        <div>{ ticketOptionRow.price_string }</div>
        <div>{ ticketOptionRow.fee_string }</div>
      </div>
      <div className={clsx("tickets")}>
        <div>
          <button onClick={() => { decreaseTickets(ticketPriceId) }}>-</button>
        </div>
        <div>{ ticketOptionRow.purchased_ticket_count }</div>
        <div>
          <button onClick={() => { increaseTickets(ticketPriceId) }}>+</button>
        </div>
      </div>
    </div>
  )
}
export { TicketOptionRow }