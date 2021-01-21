import { useRoute } from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, ImageBackground } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import Chats from '../data/Chats';
import BG from '../assets/images/BG.png'
import InputBox from '../components/InputBox/index';
import { API, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from '../src/graphql/queries';



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
