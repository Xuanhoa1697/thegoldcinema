import * as React from 'react';
import {Text, View, StyleSheet, StatusBar, Image, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';

const UserAccountScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <StatusBar
        translucent={false}
        backgroundColor={'#000000'}
        barStyle={'default'}
      />
      <View style={tw`h-[75px] w-full flex-row items-center justify-center px-2 border-b border-gray-300`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute left-2`}>
            <MaterialIcons name="arrow-back" size={36} color={'#9c1d21'} />
          </TouchableOpacity>
        </View>

      <View style={styles.profileContainer}>
        <SettingComponent
          icon="user"
          heading="Account"
          subheading="Edit Profile"
          subtitle="Change Password"
        />
        <SettingComponent
          icon="setting"
          heading="Settings"
          subheading="Theme"
          subtitle="Permissions"
        />
        <SettingComponent
          icon="dollar"
          heading="Offers & Refferrals"
          subheading="Offer"
          subtitle="Refferrals"
        />
        <SettingComponent
          icon="info"
          heading="About"
          subheading="About Movies"
          subtitle="more"
        />
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
    padding: SPACING.space_36,
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
