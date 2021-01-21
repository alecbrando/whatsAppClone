import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ChatListItem from '../components/ChatListItem';
import ChatRooms from '../data/ChatRooms'
import NewMessage from '../components/NewMessage/index';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { getUser } from './queries';

export default function ChatScreen() {
  const [chatRooms, setChatRooms] = useState([])

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userInfo = await Auth.currentAuthenticatedUser()
        const userData = await API.graphql(graphqlOperation(
          getUser, { id: userInfo.attributes.sub }
        ))

        setChatRooms(userData.data.getUser.chatRoomUser.items)
      } catch (error) {
        
      }
        // const chatRooms = await API.graphql(graphqlOperation())
    }
    fetchChats()
  }, [])

  console.log(chatRooms)

  return (
    <View style={styles.container}>
      <FlatList
        data={ChatRooms}
        renderItem={({item}) => <ChatListItem chatRoom={item} />}
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
