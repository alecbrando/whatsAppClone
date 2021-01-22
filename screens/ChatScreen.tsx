import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ChatListItem from '../components/ChatListItem';
import NewMessage from '../components/NewMessage/index';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser } from './queries';
import { onCreateChatRoom, onUpdateChatRoom } from '../src/graphql/subscriptions';

export default function ChatScreen() {
  const [chatRooms, setChatRooms] = useState([])

  const fetchChats = async () => {
    try {
      const userInfo = await Auth.currentAuthenticatedUser()
      const userData = await API.graphql(graphqlOperation(
        getUser, { id: userInfo.attributes.sub }
      ))

      setChatRooms(userData.data.getUser.chatRoomUser.items)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchChats()
  }, [])


  useEffect(() => {
      const sub = API.graphql(graphqlOperation(onUpdateChatRoom)).subscribe({
        next: (chatRoomData : object) => {
          const newChatRoom = chatRoomData.value.data.onUpdateChatRoom
          fetchChats()
        }
      })
      return function cleanup() {
        sub.unsubscribe()
    }
  }, [])


  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        renderItem={({item}) => <ChatListItem chatRoom={item.chatRoom} />}
        keyExtractor={(item) => item.id}
      />
        <NewMessage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 15,
    marginRight: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
