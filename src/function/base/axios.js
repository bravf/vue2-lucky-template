import axios from 'axios'

const instance = axios.create({
  baseURL: '/api/',
  timeout: 5000,
})

instance.interceptors.request.use(config => {
  return config
})
instance.interceptors.response.use(response => {
  const data = response.data
  return data.data
})

export default instance
