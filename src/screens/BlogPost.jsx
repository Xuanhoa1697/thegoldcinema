
import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';

const BlogPost = ({ navigation }) => {
    
    return (
        <View style={tw`h-full w-full`}>
            <StatusBar
                translucent={false}
                backgroundColor={'#000000'}
                barStyle={'default'}
            />
            <View style={tw`h-[55px] w-full flex-row items-center justify-between px-2`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={25} color={'#9c1d21'} />
                </TouchableOpacity>
                <Text style={tw`text-[12px] font-bold text-[#9c1d21]`}>Danh sách rạp phim</Text>
            </View>
        </View>
    );
};

export default BlogPost;
