import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import SharedStyles from '../../constants/SharedStyles';
import { useHeaderHeight } from '@react-navigation/elements';
import MessageInfoContainer from '../../components/MessageInfoContainer';

export default function MessagesScreen(props) {
  const headerHeight = useHeaderHeight();
  return (
    <View
      style={{ ...SharedStyles.screen, paddingTop: headerHeight }}>
      <MessageInfoContainer
        navigation={props.navigation}
        name='Samir Jaja'
        imageUrl='https://vid.alarabiya.net/images/2019/09/02/aea0577a-2cde-4dcf-993a-7181f96b9050/aea0577a-2cde-4dcf-993a-7181f96b9050_16x9_600x338.jpg'
      />
      <MessageInfoContainer
        navigation={props.navigation}
        name='Samy Gemayel'
        imageUrl='https://www.dailystar.com.lb/dailystar/Pictures/2017/04/24/599456_img650x420_img650x420_crop.jpg'
      />
      <MessageInfoContainer
        navigation={props.navigation}
        name='Saad Hariri'
        imageUrl='https://i0.wp.com/www.middleeastmonitor.com/wp-content/uploads/2019/06/20190601_2_36717814_44977803.jpg?resize=1200%2C800&quality=85&strip=all&zoom=1&ssl=1'
      />
      <MessageInfoContainer
        navigation={props.navigation}
        name="Hassan Nasra'Allah"
        imageUrl='https://www.ynetnews.com/PicServer5/2018/12/03/8920434/89204333091958640360no.jpg'
      />
      <MessageInfoContainer
        navigation={props.navigation}
        name='Nabih Berri'
        imageUrl='https://fanack.com/wp-content/uploads/Lebanon-faces-Nabih-Berri-fanack-AFP1024PX/Lebanon-faces-Nabih-Berri-fanack-AFP1024PX.jpg'
      />
    </View>
  );
}

export const messageOptions = {
  headerTitle: 'Messages',
};
