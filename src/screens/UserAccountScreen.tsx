import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Linking, Alert } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserAccountScreen = ({ navigation }: any) => {

  const logoutApp = async () => {
    Alert.alert('Đăng xuất', 'Bạn có muốn đăng xuất?', [
      {
        text: 'Hủy bỏ',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Đồng ý', onPress: () => {
        logoutUser()
      }},
    ]);
  }

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('user_info');
      navigation.navigate('HomeScreen');
    } catch (e) {
      console.log(e);
    }
  }

  const handleUser = async (keyData) => {
    if (keyData === 'user') {
      navigation.navigate('EditProfile');
    }
    if (keyData === 'support') {
      Linking.openURL('https://thegoldcinema.com')
    }
  }
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={'#9C1D21'}
        barStyle={'light-content'}
      />
      <View style={tw`h-[55px] w-full flex-row items-center justify-between px-2 bg-[#9c1d21]`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={25} color={'#ffffff'} />
        </TouchableOpacity>
        <Text style={tw`text-[12px] font-bold text-[#ffffff]`}>Thông tin</Text>
      </View>

      <View style={[styles.profileContainer, tw`mt-8`]}>
        <SettingComponent
          icon="user"
          heading="Tài khoản"
          subheading="Chỉnh sửa thông tin"
          handleAction={handleUser}
          keyData="user"
        />

        <SettingComponent
          icon="setting"
          heading="Phiên bản"
          subheading="1.0.0"
          handleAction={handleUser}
          keyData="version"
        />

        <SettingComponent
          icon="info"
          heading="Hỗ trợ"
          subheading="Hướng dẫn, điều khoản sử dụng"
          handleAction={handleUser}
          keyData="support"
        />
        <TouchableOpacity style={tw`w-full`}
          onPress={logoutApp}>
          <Text style={tw`text-white bg-[#9C1D21] text-center text-[12px] px-8 py-3 rounded-15`}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.White,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  profileContainer: {
    alignItems: 'center',
    padding: SPACING.space_10,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.White,
  },
});

export default UserAccountScreen;
