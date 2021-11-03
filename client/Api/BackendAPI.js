import { create } from 'apisauce'

// TODO replace with real backend api

const dummyApi = create({ baseURL: 'https://jsonplaceholder.typicode.com' })

export const fetchStations = async () => {
    // const response = await fetch(`${BASE_URL}/stations`)
    const response = await dummyApi.get('/posts')
    const data = await response.data
    return data
}
