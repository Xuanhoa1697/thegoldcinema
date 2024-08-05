
import { useState, useEffect } from "react"
import { View, TouchableOpacity, StatusBar, Alert, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from "twrnc";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';


const SplashScreen = ({ route }) => {
    const Navigation = useNavigation();
    const isFocused = useIsFocused();
    

    useEffect(() => {
        setTimeout(() => {
            Navigation.navigate('HomeScreen')
        }, 4000)
    }, []);

    return (
        <View style={tw`h-full w-full`}>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle="white-content"
            />
            <ImageBackground blurRadius={7} 
                source={{ uri: `http://192.168.0.104:8069/web/api/v1/get_background_app?image_type=img_app&model=dm.diadiem&time=${Math.random()}` }} 
                resizeMode="cover" style={tw`h-full w-full flex items-center justify-center `}>
                    <Image 
                        source={{ uri: `http://192.168.0.104:8069/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem&time=${Math.random()}`}}
                        resizeMode="contain"
                        style={tw`h-[70px] w-[60%]`} />
                    <ActivityIndicator size="50" color="#ffffff" />
            </ImageBackground>
        </View>

    );
}

export default SplashScreen