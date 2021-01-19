import React from 'react'
import {View, StyleSheet} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function NewMessage() {
    return (
        <View style={styles.container}>
            <MaterialCommunityIcons name="message-reply-text" size={28} color={'white'} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C6157',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        position: 'absolute',
        bottom: 20,
        right: 20
    }
})
