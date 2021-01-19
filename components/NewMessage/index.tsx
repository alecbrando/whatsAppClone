import React from 'react'
import {View, StyleSheet} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function NewMessage() {
    const navigation = useNavigation()
    const handlePress = () => {
        navigation.navigate('Contacts')
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => handlePress()}>
            <MaterialCommunityIcons name="message-reply-text" size={28} color={'white'} />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0C6157',
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        position: 'absolute',
        bottom: 20,
        right: 20
    }
})
