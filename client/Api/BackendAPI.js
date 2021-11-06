import { create } from 'apisauce'
const mock = require('./mock-data.json')

const backendAPI = create({
    baseURL: 'https://pozivnikapi20211106154402-apim.azure-api.net/api',
})

export const fetchStations = async () => {
    const response = await backendAPI.get('/Map/stationMarkers')
    const data = await response.data
    return data
}

export const fetchStationById = async (stationId) => {
    const response = await backendAPI.get(
        `/Map/station?stationId=${parseInt(stationId)}`
    )
    const data = await response.data
    return data
}
