import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import ArrowButton from './Icons/ArrowButton';
import MenuButton from './Icons/MenuButton';

export default function DirectMessageHeader({
  username,
  navigation,
}) {
  return (
    <View style={styles.header}>
      <View style={{ marginRight: 10 }}>
        <ArrowButton
          SvgStyle={{ transform: [{ rotateY: '180deg' }] }}
          onPress={() => navigation.navigate('messages')}
          size={20}
          color='#2b2b2b'
        />
      </View>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <Image
            style={{ flex: 1 }}
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Images.app.jb.jpg/230px-Images.app.jb.jpg',
            }}
          />
        </View>
      </View>
      <View style={styles.reveiverInfo}>
        <Text style={styles.reveiverName}>{username}</Text>
        {/* <Text style={styles.status}>Online</Text> */}
      </View>
      <View style={styles.menu}>
        <MenuButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: '10%',
    paddingHorizontal: 18,
    flexDirection: 'row',
    width: '100%',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageContainer: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 60,
    height: 44,
    width: 44,
    overflow: 'hidden',
  },
  reveiverInfo: {
    flex: 3,
    height: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginLeft: 10,
  },
  menu: {
    flex: 1 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reveiverName: {
    fontSize: 14,
  },
  status: {
    fontSize: 12,
    color: '#999999',
  },
});
