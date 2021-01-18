import { useNavigation } from '@react-navigation/native'
import moment from 'moment'
import React from 'react'
import {StyleSheet, View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import {ChatRoom} from '../../types'
export type ChatListProps = {
    chatRoom: ChatRoom
}

export default function ChatListItem(props: ChatListProps) {
    const navigatation = useNavigation()
    const handlePress = () => {
        navigatation.navigate('')
    }

    const {chatRoom} = props
    const user = chatRoom.users[1]
    return (
        <TouchableWithoutFeedback onPress={() => handlePress()}>
        <View style={styles.container}>
            <View style={styles.leftSide}>
                <Image style={styles.avatar} source={{uri: user.imageUri}} />
            </View>
            <View style={styles.middle}>
            <Text style={styles.name}>{user.name}</Text>
            <Text numberOfLines={1} style={styles.content}>{chatRoom.lastMessage.content}</Text>
            </View>
            <View style={styles.rightSide}>
            <Text style={{color: 'grey'}}>{moment(chatRoom.lastMessage.createdAt).fromNow()}</Text>
            </View>
        </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 30
    },
    name: {
        fontWeight: 'bold',
        fontSize: 15
    },
    content: {
        color: 'grey'
    },
    container: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 15,
        height: 55
    },
    leftSide: {
        flexDirection: 'column'
    },
    middle: {
        justifyContent: 'space-around',
        marginLeft: 15,
        width: 150
    },
    rightSide: {
        alignItems: 'flex-end',
        width: 180,
        marginTop: 5
    }

})