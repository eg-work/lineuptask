import axios from "axios"
import type { AxiosInstance } from "axios"

let api: AxiosInstance | undefined = undefined 

const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGFubmVsX2lkIjoiNzkiLCJzY29wZXMiOiJjaGVja291dCIsImFtciI6WyJtZmEiXSwidHlwZSI6InRyYW5zYWN0aW9uIiwic3ViIjoiMzAifQ.2bp1AR5PzJB7NwmYTq_vh8RT0RBsQelVLI6XriqUQAE`
const url = `https://api.line-up.tickets/api`

function create_api() {
  if (typeof api !== "undefined") return
  api = axios.create({
    baseURL: url,
    // headers: {
    //   Authorization: token
    // }
  })
  api.interceptors.request.use(function (config) {
    console.log("adding header")
    config.headers.Authorization = `Bearer ${token}`
    return config;
  })
}

export { create_api, api }