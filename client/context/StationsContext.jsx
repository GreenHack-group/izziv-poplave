import React, { createContext, useState, useEffect } from 'react'
import { fetchStations } from '../Api/BackendAPI'

export const StationsContext = createContext({})

export const StationsProvider = (props) => {
    const [stations, setStations] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        retrieveStationsFromAPI()
    }, [])

    const retrieveStationsFromAPI = async () => {
        setLoading(true)
        console.log('Stations fetching ...')
        const data = await fetchStations()
        console.log('Got stations ' + data.length)
        setLoading(false)
        setStations(data)
    }

    return (
        <StationsContext.Provider value={{ stations, isLoading }}>
            {props.children}
        </StationsContext.Provider>
    )
}
