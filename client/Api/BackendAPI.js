import { create } from 'apisauce'

const backendAPI = create({
    baseURL: 'https://pozivnikapi20211106154402-apim.azure-api.net/api',
})

export const fetchStations = async () => {
    const response = await backendAPI.get('/Map/stationMarkers')
    const data = await response.data
    return data
}
