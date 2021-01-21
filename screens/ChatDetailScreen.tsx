import { useRoute } from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, ImageBackground } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import Chats from '../data/Chats';
import BG from '../assets/images/BG.png'
import InputBox from '../components/InputBox/index';
import { API, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';



export default function ChatDetailScreen() {
    const [messages, setMessages] = useState([])
    const route = useRoute()
    useEffect(() => {
         const fetchMessages = async () => {
            const messageData = await API.graphql(graphqlOperation(messagesByChatRoom, {
                chatRoomID: route.params.id,
                sortDirection: 'ASC'
            } ))
            setMessages(messageData.data.messagesByChatRoom.items)
        }
        fetchMessages()
    }, [])

    useEffect(() => {
        const sub = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
            next: (messageData : any) => {
                const newMessage = messageData.value.data.onCreateMessage
                if(newMessage.chatRoomID !== route.params.id){
                    return
                } else {
                    console.log(messages)
                    setMessages([...messages, newMessage])
                }
            }
        })
        return function cleanup() {
            sub.unsubscribe()
        }
    }, [])


    

    return (
        <ImageBackground style={{height: '100%', width: '100%'}} source={BG}>
            <FlatList
                data={messages}
                renderItem={({item}) => <ChatMessage message={item} />}
                keyExtractor={(item) => item.id}
                // inverted
            />
        <InputBox chatRoomID={route.params.id} />
        </ImageBackground>
    )
}
