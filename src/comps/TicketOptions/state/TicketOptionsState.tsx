import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { computeTicketOptionRowFromTicketOptions } from '../funcs/computeTicketOptionRowFromTicketOptions'
import { TicketOptionService } from '../service/TicketOptionsService'
import type { TicketOption } from '../types/TicketOptionDataTypes'
import type { TicketOptionRow } from '../types/TicketOptionReactTypes'
// import type {} from '@redux-devtools/extension' // required for devtools typing

/*
This file is the most complex and the brain of the component.
It contains all the state management logic for the ticket options component

Most logic is contained in the functions given below, but the most complex logic is outsourced to files without the funcs folder
This enables the more-complex functions/actions to not bloat this file directly and aids in testing complex actions,
As functionality can be tested independantly and in a unit-test fashion from the functions in the funcs folder.

Althought this approach removes the needs for passing props around, it creates a dependancy on managing the state correctly.
For instance, the actions to get new tickets depends on the states current eventId,performanceId. Due to this dependancy the ids
must be set properly and managed according for it all to play nicely.

As this system progressed, you could make this store more generic and move those dependancies away. 
Or you can simply set up your application to have a fail-safe like architecture which will ensure the right ids are set.

This concept doesn't just apply to the id's in the store, but other values too.

Also as this is just one store, it's hard to be replicated across multiple different components of the same type. 
Therefore, the approach would need to be modified to handle these cases.



*/


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
        //this is overly simply and nuanced
        setEventAndPerformanceId: (eventId, performanceId) => {
          set({ eventId, performanceId, })
        },
        //
        getTicketOptions: async () => {
          const eventId = get().eventId
          const performanceId = get().performanceId
          //here is part of the dependencies which are mentioned earlier
          if (eventId == null || performanceId == null) return;
          //no error handling
          const data = await TicketOptionService.getTicketOptions({ event_id: eventId, performance_id: performanceId })
          set({ ticketOption: data })
          //instantly computes the react types from the business logic types
          get().computePriceBands() 
        },
        ticketOption: null,
        //computes the actual price bands to display on the screen as one long list
        computePriceBands: () => {
          const ticketOption = get().ticketOption
          //this type of null check is a bad, in reality we should create the state 
          //such that we have assurance it will always be an object
          //otherwise it creates unnecessary checking throughout the app
          //but seen as though it's only references once, it doesn't harm us too much here
          if (ticketOption == null) return
          const ticketOptionRows = computeTicketOptionRowFromTicketOptions(ticketOption)
          set({ ticketOptionRows })
        },
        ticketOptionRows: [],
        descreaseTickets: (ticket_price_id: number) => {
          //just did this in the most basic way for time + no understanding of where the tickets/functionality go further
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