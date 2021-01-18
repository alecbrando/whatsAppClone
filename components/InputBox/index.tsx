import React from 'react'
import { View, StyleSheet, Text } from 'react-native';
import {MaterialCommunityIcons, FontAwesome5, Entypo, Fontisto} from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function InputBox() {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color={'grey'} />
                <TextInput 
                    style={styles.textInput}
                    multiline
                 />
                <Entypo name="attachment" size={24} color={'grey'} style={styles.icon}/>
                <Fontisto name="camera" size={24} color={'grey'} style={styles.icon} />
            </View>
            <View style={styles.rightContainer}>
                <MaterialCommunityIcons name="microphone" size={27} color={'white'} />
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
    },
    leftContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 50,
        marginRight: 10,
        flex: 1,
        alignItems: 'center',
    },
    rightContainer: {
        backgroundColor: '#0C6157',
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
    },
    icon: {
        marginHorizontal: 5
    }
})