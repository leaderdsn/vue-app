import axios, { AxiosResponse } from 'axios'

const headers: Readonly<Record<string, string | boolean>> = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers,
  withCredentials: false
})

export default {
  getPosts ():Promise<AxiosResponse<never[], unknown>> {
    return api.get('posts')
  }
}
