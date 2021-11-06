import { create } from 'apisauce'
const mock = require('./mock-data.json')

// TODO replace with real backend api

const dummyApi = create({
    baseURL: 'https://e791-89-212-16-215.ngrok.io/api/', // temporary url
})

export const fetchStations = async () => {
    // const response = await fetch(`${BASE_URL}/stations`)
    //const response = await dummyApi.get('/Map/stationMarkers')
    //const data = await response.data
    return mock
}
