import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { computeTicketOptionRowFromTicketOptions } from '../funcs/computeTicketOptionRowFromTicketOptions'
import { TicketOptionService } from '../service/TicketOptionsService'
import type { TicketOption } from '../types/TicketOptionDataTypes'
import type { TicketOptionRow } from '../types/TicketOptionReactTypes'
// import type {} from '@redux-devtools/extension' // required for devtools typing

interface TicketOptionsState {
  eventId: number | null
  performanceId: number | null
  setEventAndPerformanceId: (eventId: number, performanceId: number) => void
  getTicketOptions: () => void
  //ticketOption is what is returned by the api
  ticketOption: TicketOption | null
  //computePriceBands converts the ticketOption above into ticketOptionRows below (ignore naming)
  computePriceBands: () => void
  //ticketOptionRows represents the actual react rows we will display
  ticketOptionRows: TicketOptionRow[]
  //descrease/increase for tickets
  descreaseTickets: (ticket_price_id: number) => void
  increaseTickets: (ticket_price_id: number) => void


  //***TODO - save/confirm/buy tickets functionality?
  buyTheTickets: () => void
}

const useTicketOptionsStore = create<TicketOptionsState>()(
  devtools(
    persist(
      (set, get) => ({
        eventId: null,
        performanceId: null,
        setEventAndPerformanceId: (eventId, performanceId) => {
          set({ eventId, performanceId, })
        },
        getTicketOptions: async () => {
          const eventId = get().eventId
          const performanceId = get().performanceId
          if (eventId == null || performanceId == null) return;
          const data = await TicketOptionService.getTicketOptions({ event_id: eventId, performance_id: performanceId })
          set({ ticketOption: data })
          get().computePriceBands() 
        },
        ticketOption: null,
        //computes the actual price bands to display on the screen as one long list
        computePriceBands: () => {
          const ticketOption = get().ticketOption
          //this is a bad check, in reality we should create the state 
          //such that we have assurance it will always be an object
          //otherwise it creates unnecessary checking throughout the app
          if (ticketOption == null) return
          const ticketOptionRows = computeTicketOptionRowFromTicketOptions(ticketOption)
          set({ ticketOptionRows })
        },
        ticketOptionRows: [],
        descreaseTickets: (ticket_price_id: number) => {
          //just did this in the most basic way for time + no understanding of where the tickets go further
          //also setting the whole store's list everytime is terrible
          const ticketOptionRows = get().ticketOptionRows.slice()
          const ticketRowIndex = ticketOptionRows.findIndex(x => x.ticket_price_id === ticket_price_id)
          if (ticketRowIndex === -1) return
          //could include other logic, like not going below zero, not surpassing the capacity for respective band etc
          if (ticketOptionRows[ticketRowIndex].purchased_ticket_count === 0) return
          ticketOptionRows[ticketRowIndex].purchased_ticket_count -= 1
          set({ ticketOptionRows })
        },
        increaseTickets: (ticket_price_id: number) => {
          //must slice the state to get a new variable, not a mutable copy! 
          const ticketOptionRows = get().ticketOptionRows.slice()
          const ticketRowIndex = ticketOptionRows.findIndex(x => x.ticket_price_id === ticket_price_id)
          if (ticketRowIndex === -1) return
          ticketOptionRows[ticketRowIndex].purchased_ticket_count += 1
          //again, setting the entire list is terrible approach
          set({ ticketOptionRows })
        },

        //TODO
        buyTheTickets: () => {},
      }),
      {
        name: 'ticket-options-store',
      },
    ),
  ),
)

export { useTicketOptionsStore }