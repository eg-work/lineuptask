import { api } from "../../../api/create_api"
import type { TicketOption } from "../types/TicketOptionDataTypes"




interface GetTicketOptionsParams {
  performance_id: number
  event_id: number
}
//types included in serperate file
//types here should just related to input/output of the request functions
//and shouldn't relate to the business logic types found elsewhere in the app
type GetTicketOptionsResponse = TicketOption


class TicketOptionServiceClass {

  //simple function to query the endpoint given
  async getTicketOptions(params: GetTicketOptionsParams): Promise<GetTicketOptionsResponse> {
    return await api?.get(`/performance/${params.performance_id}/`).then((response) => {
      return response.data.data
    })
  }
  async getEvents() {
    return await api?.get(`/event`).then((response) => {
      console.log("response", response)
      return response.data
    })
  }

  async getTicketOptionsOld() {
    // const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiNzkiLCJzY29wZXMiOiJjaGVja291dCIsImFtciI6WyJtZmEiXSwidHlwZSI6InRyYW5zYWN0aW9uIiwic3ViIjoiMzAifQ.2bp1AR5PzJB7NwmYTq_vh8RT0RBsQelVLI6XriqUQAE`
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiNzkiLCJzY29wZXMiOiJjaGVja291dCIsImFtciI6WyJtZmEiXSwidHlwZSI6InRyYW5zYWN0aW9uIiwic3ViIjoiMzAifQ.2bp1AR5PzJB7NwmYTq_vh8RT0RBsQelVLI6XriqUQAE`
    const url = `http://api.line-up.tickets/api`

    let myURL = url

    // const params = {}
    // //@ts-expect-error
    // myURL += new URLSearchParams(params)

    myURL += '/event/'

    const req = await fetch(myURL, { 
      credentials: "include",
      headers: { 
        Authorization: `${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": 'POST,GET,LINK',
        "Accept": "application/json",
        // "Content-Type": 'application/json',
      } })

    console.log("req", req)
  }

}

const TicketOptionService = new TicketOptionServiceClass();
export { TicketOptionService }