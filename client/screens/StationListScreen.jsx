import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { SearchBar } from 'react-native-elements'
import theme from '../shared/theme'
import { Container } from '../components/Container'
import { StationsContext } from '../context/StationsContext'
import OnStartAnimation from '../components/Animations/OnStartAnimation'
import StationListItem from '../components/StationListItem'

export const StationListScreen = (props) => {
    const { stations, isLoading } = useContext(StationsContext)
    const [search, setSearch] = useState(null)
    const [filteredStations, setFilteredStations] = useState([])

    useEffect(() => {
        if (search === null) {
            return setFilteredStations(stations)
        }

        const filtered = stations.filter(
            (station) =>
                station.measuringPoint.includes(search) ||
                station.river.includes(search)
        )
        setFilteredStations(filtered)
    }, [search])

    useEffect(() => {
        setFilteredStations(stations)
        setSearch(null)
    }, [stations])

    const renderStationListItem = useCallback(
        ({ item }) => (
            <StationListItem
                key={item.stationId}
                station={item}
                onPress={(stationId) => handleOnPress(stationId)}
            />
        ),
        []
    )

    const handleOnPress = (stationId) =>
        props.navigation.navigate('Station', { stationId })

    if (isLoading) {
        return <OnStartAnimation />
    }

    return (
        <Container>
            <View style={{ marginTop: theme.LAYOUT.paddingLarge }} />
            <SearchBar
                lightTheme
                containerStyle={styles.searchBarContainer}
                inputContainerStyle={styles.searchBarContainer}
                onChangeText={(text) => setSearch(text)}
                onClear={() => setSearch(null)}
                value={search}
                placeholder={'Poišči postajo po imenu ali reki...'}
            />
            <View>
                <Text style={styles.title}>
                    {filteredStations.length > 0
                        ? 'Seznam postaj'
                        : 'Pod tem geslom ni postaj'}
                </Text>
            </View>
            <FlatList
                data={filteredStations}
                renderItem={renderStationListItem}
                keyExtractor={(item) => item.stationId}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    searchBarContainer: {
        backgroundColor: theme.COLORS.white,
        borderRadius: theme.LAYOUT.rounded,
    },

    searchInner: {
        backgroundColor: theme.COLORS.white,
        borderRadius: theme.LAYOUT.rounded,
    },

    title: {
        color: theme.COLORS.darkBlue,
        marginTop: theme.LAYOUT.paddingMedium,
        marginBottom: theme.LAYOUT.paddingSmall,
    },
})
