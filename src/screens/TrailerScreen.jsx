import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';
import YoutubePlayer from "react-native-youtube-iframe";

const TrailerScreen = ({ navigation, route }) => {
    const trailer = route.params.trailer
    console.log(trailer);
    return (
        <View style={tw`h-full w-full bg-black`}>
            <StatusBar
                translucent={false}
                backgroundColor={'#000000'}
                barStyle={'default'}
            />
            <View style={tw`absolute left-3 top-5 z-10`}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={33} color={'#ffffff'} />
              </TouchableOpacity>
            </View>
            <YoutubePlayer
                height={300}
                play={false}
                videoId={trailer}
            />
        </View>
    );
};

export default TrailerScreen;
