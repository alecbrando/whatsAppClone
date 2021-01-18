import React from 'react'
import {StyleSheet, View, Text, Image} from 'react-native'
import {ChatRoom} from '../../types'

export type ChatListProps = {
    chatRoom: ChatRoom
}

export default function ChatListItem(props: ChatListProps) {

    const {chatRoom} = props
    const user = chatRoom.users[1]
    return (
        <View style={styles.container}>
            <View style={styles.leftSide}>
                <Image style={styles.avatar} source={{uri: user.imageUri}} />
            </View>
            <View style={styles.middle}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.content}>{chatRoom.lastMessage.content}</Text>
            </View>
            <View style={styles.rightSide}>
            <Text>Yesterday</Text>
            </View>
        </View>
    )
}
//{chatRoom.lastMessage.createdAt}


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
        marginLeft: 15
    },
    leftSide: {
        flexDirection: 'column'
    },
    middle: {
        justifyContent: 'space-around',
        marginLeft: 15,
    },
    rightSide: {
        alignItems: 'flex-end',
        width: 160
    }

})