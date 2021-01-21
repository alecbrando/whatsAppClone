import { useNavigation } from '@react-navigation/native'
import { Auth } from 'aws-amplify'
import moment from 'moment'
import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import {ChatRoom} from '../../types'

export type ChatListProps = {
    chatRoom: ChatRoom
}

export default function ChatListItem(props: ChatListProps) {
    const [chatUser, setUser] = useState(null)
    const { chatRoom } = props
    const navigatation = useNavigation()

    useEffect(() => {
        const currentUser = async() => {
            const userInfo = await Auth.currentAuthenticatedUser()
            if(user.id === userInfo.attributes.sub){
                setUser(chatRoom.chatRoomUsers.items[0].user)
            } else {
                setUser(chatRoom.chatRoomUsers.items[1].user)
            }
        }
        currentUser()
    }, [])

    const handlePress = () => {
        navigatation.navigate('ChatDetailScreen', { 
            id: chatRoom.id,
            name: chatUser.name
         })
    }



    return (
        <TouchableWithoutFeedback onPress={() => handlePress()}>
        <View style={styles.container}>
            <View style={styles.leftSide}>
                <Image style={styles.avatar} source={{uri: chatUser.imageUri}} />
            </View>
            <View style={styles.middle}>
            <Text style={styles.name}>{chatUser.name}</Text>
            {/* <Text numberOfLines={1} style={styles.content}>{chatRoom.lastMessage.content}</Text> */}
            </View>
            <View style={styles.rightSide}>
            {/* <Text style={{color: 'grey'}}>{moment(chatRoom.lastMessage.createdAt).fromNow()}</Text> */}
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
        height: 55,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.5)'
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