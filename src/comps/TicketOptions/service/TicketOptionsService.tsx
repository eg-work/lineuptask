import { api } from "../../../api/create_api"
import type { TicketOption } from "../types/TicketOptionDataTypes"


/*
 simple api for the ticketoption component

 business logic types are imported from the respective types folders

 I prefer to keep the types defined in here as those solely pertaining to the API requests and their responses.

 These should generally be built up from the business logic types where possible
*/




//specific typings given here
interface GetTicketOptionsParams {
  performance_id: number
  event_id: number
}
//but response is from the business logic types
type GetTicketOptionsResponse = TicketOption



class TicketOptionServiceClass {

  //simple function to query the endpoint given
  async getTicketOptions(params: GetTicketOptionsParams): Promise<GetTicketOptionsResponse> {
    return await api?.get(`/performance/${params.performance_id}/`).then((response) => {
      return response.data.data
    })
  }

}

//this is a little convoluted, but suffices for now
const TicketOptionService = new TicketOptionServiceClass();
export { TicketOptionService }