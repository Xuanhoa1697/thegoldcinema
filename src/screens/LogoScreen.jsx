
import { useState, useEffect } from "react"
import { View, TouchableOpacity, StatusBar, Alert, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import tw from "twrnc";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';


const LogoScreens = () => {
    const Navigation = useNavigation();

    useEffect(() => {
        async function fetchMyAPI() {
            setTimeout(() => {
                Navigation.navigate('SplashScreen')
            }, 2000)
        }
      
        fetchMyAPI()
    }, []);

    return (
        <View style={tw`h-full w-full flex items-center justify-center`}>
            <StatusBar
                translucent={true}
                backgroundColor={'transparent'}
                barStyle="white-content"
            />
            <Image 
                source={{ uri: `http://192.168.1.218:8069/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem&time=${Math.random()}`  }}
                style={tw`h-[75px] w-[60%]`} />
        </View>

    );
}

export default LogoScreens