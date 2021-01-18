import { useRoute } from '@react-navigation/native';
import React, {useEffect} from 'react'
import { View, Text, FlatList, ImageBackground } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import Chats from '../data/Chats';
import BG from '../assets/images/BG.png'

export default function ChatDetailScreen() {

    const route = useRoute()

    useEffect(() => {
        console.log(route.params)
    }, [])

    return (
        <ImageBackground style={{height: '100%', width: '100%'}} source={BG}>
            <FlatList
                data={Chats.messages}
                renderItem={({item}) => <ChatMessage messages={item} />}
                keyExtractor={(item) => item.id}
                inverted
            />
        </ImageBackground>
    )
}
