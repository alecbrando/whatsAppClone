import React, {useState} from 'react'
import { View, StyleSheet, Text } from 'react-native';
import {MaterialCommunityIcons, MaterialIcons, FontAwesome5, Entypo, Fontisto} from '@expo/vector-icons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function InputBox() {

    const [message, setMessage] = useState('')
    const handlePress = () => {
        if(!message){
            onMicrophonePress()
        } else {
            sendMessage()
        }
    }

    const sendMessage = () => {
        console.warn('sending')
        setMessage('')
    }

    const onMicrophonePress = () => {
        console.warn('microphone')
    }

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color={'grey'} />
                <TextInput 
                    placeholder={"Type A Message"}
                    style={styles.textInput}
                    multiline
                    value={message}
                    onChangeText={text => setMessage(text)}
                 />
                <Entypo name="attachment" size={24} color={'grey'} style={styles.icon}/>
                {!message && <Fontisto name="camera" size={24} color={'grey'} style={styles.icon} />}
            </View>
            <TouchableOpacity onPress={() => handlePress()}>
            <View style={styles.rightContainer}>
            {!message ? 
                  <MaterialCommunityIcons name="microphone" size={27} color={'white'} /> :
                  <MaterialIcons name="send" size={27} color={"white"} />
                }           
            </View>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 5
    },
    leftContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        margin: 10,
        padding: 10,
        borderRadius: 25,
        marginRight: 10,
        flex: 1,
        alignItems: 'flex-end',
    },
    rightContainer: {
        backgroundColor: '#0C6157',
        borderRadius: 50,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
    },
    icon: {
        marginHorizontal: 5
    }
})