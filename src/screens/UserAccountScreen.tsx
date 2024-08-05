import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, Linking } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserAccountScreen = ({ navigation }: any) => {

  const logoutApp = async () => {
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
        backgroundColor={'#000000'}
        barStyle={'default'}
      />
      <View style={tw`h-[75px] w-full flex-row items-center justify-between px-2`}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={36} color={'#9c1d21'} />
        </TouchableOpacity>
        <Text style={tw`text-[17px] font-bold text-[#9c1d21]`}>Tài khoản</Text>
      </View>

      <View style={styles.profileContainer}>
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
          icon="setting"
          heading="Hỗ trợ"
          subheading="Hướng dẫn thanh toán, thông tin công ty"
          handleAction={handleUser}
          keyData="support"
        />
        <TouchableOpacity style={tw`w-full`}
          onPress={logoutApp}>
          <Text style={tw`text-white font-bold bg-[#9C1D21] text-center text-[14px] px-8 py-2 rounded-15`}>Đăng xuất</Text>
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
