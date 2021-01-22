import { useRoute } from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, ImageBackground, StyleSheet } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import BG from '../assets/images/BG.png'
import InputBox from '../components/InputBox/index';
import { API, graphqlOperation } from 'aws-amplify';
import { messagesByChatRoom } from '../src/graphql/queries';
import { onCreateMessage } from '../src/graphql/subscriptions';



export default function ChatDetailScreen() {
    const [messages, setMessages] = useState([])
    const route = useRoute()
    const fetchMessages = async () => {
       const messageData = await API.graphql(graphqlOperation(messagesByChatRoom, {
           chatRoomID: route.params.id,
           sortDirection: 'DESC'
       } ))
       setMessages(messageData.data.messagesByChatRoom.items)
   }
    useEffect(() => {
        fetchMessages()
    }, [])

    useEffect(() => {
        const sub = API.graphql(graphqlOperation(onCreateMessage)).subscribe({
            next: (messageData : any) => {
                const newMessage = messageData.value.data.onCreateMessage
                if(newMessage.chatRoomID !== route.params.id){
                    return
                } else {
                    fetchMessages()
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
                showsVerticalScrollIndicator={false}
                inverted
            />
        <InputBox chatRoomID={route.params.id} />
        </ImageBackground>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  });
