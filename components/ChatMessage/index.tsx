import React, {useEffect, useState}  from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Message } from '../../types'
import moment from 'moment'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Auth } from 'aws-amplify'
export type ChatMessageProps = {
    message: Message
}

export default function ChatMessage(props: ChatMessageProps) {
    const [myID, setMyID] = useState('')
    const { message } = props
    
    useEffect(() => {
        const fetchCurrentUser = async () => {
            const userInfo = await Auth.currentAuthenticatedUser()
            setMyID(userInfo.attributes.sub)
        }
        fetchCurrentUser()
    }, [])
    const isMyMessage = () => {
        return message.user.id === myID
    }
    
    return (
        <View style={styles.container}>
            {isMyMessage() ? 
            <View style={styles.myMessageBox}>
                <Text style={styles.message}>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View> : 
            <View style={styles.messageBox}>
                <Text style={styles.name}>{message.user.name}</Text>
                <Text>{message.content}</Text>
                <Text style={styles.time}>{moment(message.createdAt).fromNow()}</Text>
            </View>
            }   
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    messageBox: {
        backgroundColor: '#e5e5e5',
        marginRight: 50,
        borderRadius: 5,
        padding: 10
    },
    myMessageBox: {
        backgroundColor: '#77F76E',
        marginLeft: 50,
        borderRadius: 5,
        padding: 7
    },
    name: {
        fontWeight: 'bold',
        color: '#0C6157',
    },
    message: {
        marginVertical: 5
    },
    time: {
        alignSelf: 'flex-end',
        color: 'grey'
    }
})