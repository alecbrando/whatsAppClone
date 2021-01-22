import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ContactListItem from '../components/ContactListItem';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { listUsers } from '../src/graphql/queries';



export default function ContactsScreen() {
  const [contacts, setContacts] = useState([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await API.graphql(graphqlOperation(listUsers))
        const userInfo = await Auth.currentAuthenticatedUser()
        setContacts(userData.data.listUsers.items.filter(user => user.id !== userInfo.attributes.sub))
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])


  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={({item}) => <ContactListItem user={item} />}
        keyExtractor={(item) => item.id}
      />
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
