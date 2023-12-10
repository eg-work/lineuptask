import { useEffect } from "react"
import { TicketOptionRow } from "./comps/TicketOptionRow"
import { useTicketOptionsStore } from "./state/TicketOptionsState"
import { clsx } from "clsx"

//one include for the "ticket options" component's styles
//then that base file will include individual styles files as the components grew
import "./styles/TicketOptionStyles.css"



//this is the main component for the purposes of the tech task
//props don't need to be defined here if they're empty, but it's just a habit
interface props {
}
const TicketOptions = ({ }: props) => {

  //due to the complexity being outsourced to zustand we only need to selectors
  //getTicketOptions will refresh our ticket options for the given performance_id
  //ticketOptionRows will be our actual ticket rows to display to the user 
  const getTicketOptions = useTicketOptionsStore(state => state.getTicketOptions)
  const ticketOptionRows = useTicketOptionsStore(state => state.ticketOptionRows)


  //on initial load of ticket options component
  //we will load the ticket options, with preloaded eventId and performanceId
  //this is one of the cavets with using this type of store, i've set it up to all be inplace,
  //but it means you have to set the correct id's and management the changing of those id's
  //ahead of time
  useEffect(() => {
    getTicketOptions()
  }, [])


  //clsx used as more-lightweight than classNames
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