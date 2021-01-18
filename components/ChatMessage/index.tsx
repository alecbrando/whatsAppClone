import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Message } from '../../types'
import moment from 'moment'
import { Colors } from 'react-native/Libraries/NewAppScreen'
export type ChatMessageProps = {
    messages: Message
}

export default function ChatMessage(props: ChatMessageProps) {
    const { messages } = props

    const isMyMessage = () => {
        return messages.user.id === 'u1'
    }

    return (
        <View style={styles.container}>
            {isMyMessage() ? 
            <View style={styles.myMessageBox}>
                <Text style={styles.message}>{messages.content}</Text>
                <Text style={styles.time}>{moment(messages.createdAt).fromNow()}</Text>
            </View> : 
            <View style={styles.messageBox}>
                <Text style={styles.name}>{messages.user.name}</Text>
                <Text>{messages.content}</Text>
                <Text style={styles.time}>{moment(messages.createdAt).fromNow()}</Text>
            </View>
            }   
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 10
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