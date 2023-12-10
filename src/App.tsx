import { useEffect } from 'react';
import { TicketOptions } from './comps/TicketOptions/TicketOptions';
import { useTicketOptionsStore } from './comps/TicketOptions/state/TicketOptionsState';



/*
  App is where we render the component in question
*/
function App() {

  //
  const eventId = 151
  const performanceId = 21813
  const setEventAndPerformanceId = useTicketOptionsStore(state => state.setEventAndPerformanceId)

  //on initial mount of the app,
  //we set the eventId & performanceId as the user had selected them
  useEffect(() => {
    setEventAndPerformanceId(eventId, performanceId)
  }, [])

  return (
    <div className="App">
      {/* Render the component for the tech task */}
      { <TicketOptions/> } 

      {/* This was no longer needed, but kept for dicussion */}
      {/* { typeof api !== "undefined" && <TicketOptions/> }  */}
    </div>
  );
}

export { App };
