import React, { useEffect } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SharedStyles from '../constants/SharedStyles';
import SettingsButton from '../components/Icons/SettingsButton';
import ArrowButton from '../components/Icons/ArrowButton';
import Logout from '../components/Icons/LogoutButton';
import SettingContainer from '../components/SettingContainer';
import ProfileButton from '../components/Icons/ProfileButton';
import ShowValueInput from '../components/Icons/ShowValueInput';
import LockIcon from '../components/Icons/LockIcon';
import NotificationIcon from '../components/Icons/NotificationIcon';
import { logout } from '../store/actions/auth';
import IconPlaceholder from '../components/IconPlaceholder';

export default function SettingsScreen(props) {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);

  // useEffect(() => {
  //   dispatch(getUser(userId));
  // }, []);

  const firstName = useSelector((state) => state.auth.firstName);
  const lastName = useSelector((state) => state.auth.lastName);
  const imageUrl = useSelector((state) => state.auth.imageUrl);

  return (
    <View style={SharedStyles.screen}>
      <View style={styles.header}>
        <View style={styles.topHeader}>
          <View style={{ marginRight: 10 }}>
            <ArrowButton
              onPress={() => {
                props.navigation.goBack();
              }}
              back
              size={24}
              color='#2b2b2b'
            />
          </View>
          <Text style={styles.topHeaderText}>Settings</Text>
        </View>
        <View style={styles.headerContent}>
          <View style={styles.imageContainer}>
            {imageUrl ? (
              <Image
                style={styles.image}
                source={{
                  uri: `${axios.defaults.baseURL}/${imageUrl}`,
                }}
              />
            ) : (
              <IconPlaceholder size={60} iconSize={50} />
            )}
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.welcome}>Welcome</Text>
            <Text style={styles.userName}>
              {firstName} {lastName}
            </Text>
          </View>
          <TouchableWithoutFeedback
            onPress={() => dispatch(logout())}>
            <View style={styles.SignOut}>
              <Logout />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={styles.body}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('account');
          }}>
          <SettingContainer
            style={styles.firstContainer}
            icon={<ProfileButton size={20} color='#2b2b2b' />}>
            Account
          </SettingContainer>
        </TouchableOpacity>
        <SettingContainer
          icon={<LockIcon size={20} color='#2b2b2b' />}>
          Privacy
        </SettingContainer>
        <SettingContainer
          icon={<ShowValueInput size={20} color='#2b2b2b' />}>
          Appearance
        </SettingContainer>
        <SettingContainer
          icon={<NotificationIcon size={20} color='#2b2b2b' />}>
          Notifications
        </SettingContainer>
      </View>
      <View style={styles.footer}>
        <Text style={styles.textFooter}>© BookApp 2021</Text>
        <Text style={styles.textFooter}>version 1.0.0</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: '10%',
    flex: 1,
    width: '100%',
  },
  topHeader: {
    flexDirection: 'row',
    height: 55,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  topHeaderText: {
    fontFamily: 'rubik-bold',
    fontSize: 18,
  },
  headerContent: {
    flex: 1,
    width: '100%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#d9d9d9',
    flexDirection: 'row',
  },
  imageContainer: {
    justifyContent: 'center',
  },
  image: {
    height: 60,
    width: 60,
    borderRadius: 60,
  },
  userInfo: {
    flexDirection: 'column',
    padding: 10,
    flex: 6,
    justifyContent: 'center',
  },
  welcome: {
    color: '#999999',
    fontSize: 12,
  },
  userName: {
    fontSize: 16,
    fontFamily: 'rubik-medium',
    color: '#2b2b2b',
  },
  SignOut: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    width: '100%',
  },
  body: {
    flex: 3.5,
  },
  firstContainer: {
    marginTop: 30,
  },
  footer: {
    flex: 0.6,
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFooter: {
    color: '#999999',
    fontSize: 10,
    marginVertical: 4,
  },
});
