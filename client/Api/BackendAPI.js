import { create } from 'apisauce'

const backendAPI = create({
    baseURL: 'https://pozivnikapi20211106154402-apim.azure-api.net/api/Map',
})

export const fetchStations = async () => {
    const response = await backendAPI.get('/stationMarkers')
    const data = await response.data
    return data
}

export const fetchStationById = async (stationId) => {
    const response = await backendAPI.get(
        `/station?stationId=${parseInt(stationId)}`
    )
    const data = await response.data
    return data
}

export const fetchChartDataByStationId = async (stationId) => {
    const response = await backendAPI.get(
        `/graph?stationId=${parseInt(stationId)}`
    )
    const data = await response.data
    return data
}

export const addDeviceNotificationSubscription = async (payload) => {
    // await backendAPI.post('/addUser', payload)
}
