import { useEffect } from 'react';
import { TicketOptions } from './comps/TicketOptions/TicketOptions';
import { useTicketOptionsStore } from './comps/TicketOptions/state/TicketOptionsState';

function App() {

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
      {/* { typeof api !== "undefined" && <TicketOptions/> }  */}
      { <TicketOptions/> } 
    </div>
  );
}

export { App };
