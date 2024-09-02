
import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import WebView from 'react-native-webview';
import tw from "twrnc";

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
                <Text style={tw`text-[12px] font-bold text-[#9c1d21]`}>Bài viết</Text>
            </View>
            <WebView
                source={{ uri: 'http://125.253.121.150:8069/blog/blog-cua-chung-toi-1/post/huong-dan-at-ve-truoc-va-kiem-tra-ve-a-at-tren-website-2' }}
                originWhitelist={['*']}
                startInLoadingState={true}
                style={tw`h-full w-full`}
                cacheEnabled={false}/>
        </View>
    );
};

export default BlogPost;
