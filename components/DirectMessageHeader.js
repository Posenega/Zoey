import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import ArrowButton from './Icons/ArrowButton';
import MenuButton from './Icons/MenuButton';

export default function DirectMessageHeader(props) {
  const navigation = props.navigation;
  return (
    <View style={styles.header}>
      <View style={{ marginRight: 10 }}>
        <ArrowButton
          SvgStyle={{ transform: [{ rotateY: '180deg' }] }}
          style={{ marginRight: 20 }}
          onPress={() => navigation.goBack()}
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
        <Text style={styles.reveiverName}>Ghady Youssef</Text>
        <Text style={styles.status}>Online</Text>
      </View>
      <View style={styles.menu}>
        <MenuButton />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    borderRadius: 60,
    height: 70,
    width: 70,
    overflow: 'hidden',
  },
  reveiverInfo: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
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
