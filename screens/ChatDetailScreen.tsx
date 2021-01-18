import { useRoute } from '@react-navigation/native';
import React, {useEffect} from 'react'
import { View, Text } from 'react-native';

export default function ChatDetailScreen() {

    const route = useRoute()

    useEffect(() => {
        console.log(route.params)
    }, [])

    return (
        <View>
            <Text>Chat Detail Screen</Text>
        </View>
    )
}
