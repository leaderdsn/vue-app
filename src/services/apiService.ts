import axios, { AxiosResponse } from 'axios'
import { IPost } from '@/interfaces/interfaces'

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
}
const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers,
  withCredentials: false
})

export default {
  getPosts ():Promise<AxiosResponse<IPost[], string>> {
    return api.get('/posts')
  }
}
