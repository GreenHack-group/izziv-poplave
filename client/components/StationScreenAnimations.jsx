import React from 'react'
import { View, Text } from 'react-native'
import { HeaderText, SmallText } from './PozivkoText'
import {
    WaterFlowAnimation1,
    WaterFlowAnimation2,
    WaterFlowAnimation3,
    WaterFlowAnimation4,
    WaterFlowAnimation5,
    WaterFlowAnimation6,
} from './Animations/WaterFlowAnimation'
import theme from '../shared/theme'

const WATER_FLOW_LEVELS = {
    'mali pretok': 1,
    'srednji pretok': 2,
    'velik pretok': 3,
    'prvi visokovodni pretok': 4,
    'drugi visokovodni pretok': 5,
    'tretji visokovodni pretok': 6,
}

const WATER_LEVEL_GROUPS = {
    'mali vodostaj': 1,
    'srednji vodostaj': 2,
    'velik vodostaj': 3,
    'prvi visokovodni vodostaj': 4,
    'drugi visokovodni vodostaj': 5,
    'tretji visokovodni vodostaj': 6,
}

const getLevelBasedOnGroup = (group, legend) => {
    if (null === group) return group
    return legend[group]
}

export const StationScreenAnimations = ({ data }) => {
    const { waterLevelGroup, waterFlowGroup } = data
    const pretok = getLevelBasedOnGroup(waterFlowGroup, WATER_FLOW_LEVELS)
    const vodostaj = getLevelBasedOnGroup(waterLevelGroup, WATER_LEVEL_GROUPS)
    console.log('vodostaj: ', waterLevelGroup, 'pretok: ', waterFlowGroup)
    if (null === vodostaj && null === pretok) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <HeaderText>
                    Žal za izbrano postaji ni podatkov o nivoju vodostaja in
                    pretoka.
                </HeaderText>
            </View>
        )
    }

    return (
        <View
            style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
            }}
        >
            {vodostaj !== null ? (
                <AnimationContainer
                    level={vodostaj}
                    title={'Nivo vodostaja'}
                    nivo={waterLevelGroup}
                />
            ) : (
                <SmallText>
                    Informacije o nivoju vodostaju ni za izbrano postajo
                </SmallText>
            )}
            {pretok !== null ? (
                <AnimationContainer
                    level={pretok}
                    title={'Nivo pretoka'}
                    nivo={waterFlowGroup}
                />
            ) : (
                <SmallText>
                    Informacije o nivoju pretoku ni za izbrano postajo
                </SmallText>
            )}
        </View>
    )
}

const AnimationContainer = ({ level, title, nivo }) => {
    const animation = () => {
        switch (level) {
            case 1:
                return <WaterFlowAnimation1 />
            case 2:
                return <WaterFlowAnimation2 />
            case 3:
                return <WaterFlowAnimation3 />
            case 4:
                return <WaterFlowAnimation4 />
            case 5:
                return <WaterFlowAnimation5 />
            case 6:
                return <WaterFlowAnimation6 />
        }
    }
    return (
        <View>
            <View>
                <Text>{title}</Text>
                <Text>{nivo}</Text>
            </View>
            <View
                style={{
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: theme.COLORS.softBlue,
                }}
            >
                {animation()}
            </View>
        </View>
    )
}
