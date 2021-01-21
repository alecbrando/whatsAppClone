import { useNavigation } from '@react-navigation/native'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import moment from 'moment'
import React from 'react'
import {StyleSheet, View, Text, Image, TouchableWithoutFeedback} from 'react-native'
import { User} from '../../types'
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations';


export type ContactListProps = {
    user: User
}

export default function ContactListItem(props: ContactListProps) {
    const {user} = props
    const navigatation = useNavigation()
    const handlePress = async () => {
        try {
            //creating chat room
            const userInfo = await Auth.currentAuthenticatedUser({ bypassCache: true })

            const newChatRoomData = await API.graphql(graphqlOperation(
                createChatRoom,
                { input : {} }
                ))
            

            const newChat = newChatRoomData.data.createChatRoom

            //adding user to chat room
            await API.graphql(graphqlOperation(
                createChatRoomUser,
                { input: {  
                    userID: user.id ,
                    chatRoomID: newChat.id,
                }}
            ))
            
            await API.graphql(graphqlOperation(
                createChatRoomUser,
                { input: {  
                    userID: userInfo.attributes.sub,
                    chatRoomID: newChat.id,
                }}
            ))

            // add authenticated user to the chat room
            navigatation.navigate('ChatDetailScreen', { 
                id: newChat.id,
                name: user.name
             })
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <TouchableWithoutFeedback onPress={() => handlePress()}>
        <View style={styles.container}>
            <View style={styles.leftSide}>
                <Image style={styles.avatar} source={{uri: user.imageUri}} />
            </View>
            <View style={styles.middle}>
            <Text style={styles.name}>{user.name}</Text>
            <Text numberOfLines={1} style={styles.status}>Status: {user.status}</Text>
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
    status: {

    }

})