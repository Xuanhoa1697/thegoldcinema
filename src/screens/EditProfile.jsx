import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = ({ navigation }) => {

    return (
        <View style={tw`w-full h-full`}>
            <StatusBar
                translucent={false}
                backgroundColor={'#000000'}
                barStyle={'default'}
            />
            <View style={tw`h-[75px] w-full flex-row items-center justify-between px-2`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={36} color={'#9c1d21'} />
                </TouchableOpacity>
                <Text style={tw`text-[17px] font-bold text-[#9c1d21]`}>Thông tin tài khoản</Text>
            </View>
            <View style={tw`px-4 mt-5`}>
                <TextInput
                    style={tw`border-b border-[#9C9C9C] py-3`}
                    placeholder='Họ tên *' />
                <TextInput 
                    style={tw`border-b border-[#9C9C9C] py-3`}
                    placeholder='Số điện thoại *' />
                <TextInput 
                    style={tw`border-b border-[#9C9C9C] py-3`}
                    placeholder='Email *' />
                
                <Text style={tw`text-[14px] text-[#9C9C9C] mt-5`}>* Thông tin bắt buộc</Text>
                <TouchableOpacity style={tw`w-full mt-5`} >
                    <Text style={tw`text-white font-bold bg-[#9C1D21] text-center text-[14px] px-8 py-2 rounded-15`}>Cập nhật</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfile;
