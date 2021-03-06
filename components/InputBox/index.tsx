import React, {useState, useEffect} from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, Platform } from 'react-native';
import {MaterialCommunityIcons, MaterialIcons, FontAwesome5, Entypo, Fontisto} from '@expo/vector-icons'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createMessage, updateChatRoom } from '../../src/graphql/mutations';

export default function InputBox(props: any) {
    
    const [myUserId, setMyUserId] = useState('')
    const [message, setMessage] = useState('')
    const {chatRoomID} = props

    useEffect(() => {
        const fetchUser = async () => {
          try {
            const userInfo = await Auth.currentAuthenticatedUser()
            setMyUserId(userInfo.attributes.sub)
          } catch (error) {
            console.log(error)
          }
        }
        fetchUser()
      }, [])

    const handlePress = () => {
        if(!message){
            onMicrophonePress()
        } else {
            sendMessage()
        }
    }

    const updateLastMessage = async(messageId: string) => {
        await API.graphql(graphqlOperation(updateChatRoom, { 
            input: {
                id: chatRoomID,
                lastMessageID: messageId
            }
         }))
    }

    const sendMessage = async () => {
        try {
            const newMessage = await API.graphql(graphqlOperation(createMessage, { input : { 
                content: message,
                userID: myUserId,
                chatRoomID: chatRoomID
            }}))

            await updateLastMessage(newMessage.data.createMessage.id)
        } catch (error) {
            console.log(error)
        }
        setMessage('')
    }

    const onMicrophonePress = () => {
        console.warn('microphone')
    }

    return (
        <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={70}
            >
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
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        bottom: 5,
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