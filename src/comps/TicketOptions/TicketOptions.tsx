import { useEffect } from "react"
import { TicketOptionRow } from "./comps/TicketOptionRow"
import { useTicketOptionsStore } from "./state/TicketOptionsState"
import { clsx } from "clsx"

//one include for the "ticket options" component's styles
//then that base file will include individual styles files as the components grew
import "./styles/TicketOptionStyles.css"


interface props {
}
const TicketOptions = ({ }: props) => {

  const getTicketOptions = useTicketOptionsStore(state => state.getTicketOptions)
  // const ticketOptions = useTicketOptionsStore(state => state.ticketOptions)
  const ticketOption = useTicketOptionsStore(state => state.ticketOption)
  const ticketOptionRows = useTicketOptionsStore(state => state.ticketOptionRows)


  //on initial load of ticket options component
  //we will load the ticket options, with preloaded eventId and performanceId
  useEffect(() => {
    getTicketOptions()
  }, [])


  return (
    <div className={clsx("ticketOptions")}>
      <div className={clsx("ticketOptionsTitle")}>Ticket Options</div>
      <div className={clsx("ticketOptionsList")}>
        {
          ticketOptionRows.map(({ ticket_price_id }, ii) => {

            //render the row component
            //this is on the basis on ticket_price_id being unique (which without further information it may very not be unique)
            //if it wasn't unique this approach would need to be changed
            return <TicketOptionRow key={ticket_price_id} ticketPriceId={ticket_price_id}/>
          })
        }
      </div>
    </div>
  )
}
export { TicketOptions }
export type { props as TicketOptionsProps }