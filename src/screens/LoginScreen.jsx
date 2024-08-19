
import { useState, useEffect } from "react"
import { View, TouchableOpacity, StatusBar, Keyboard, Text, Image, ActivityIndicator, Linking, Platform, ToastAndroid, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import UserTextInputChat from "../components/UserTextInputChat";

const LoginScreen = ({ navigation }) => {
    const Navigation = useNavigation();
    const [hidenLogo, setHidenLogo] = useState('');
    const [mt15, setMt15] = useState('');
    const [isSpinLoading, setIsSpinLoading] = useState(false);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        async function fetchMyAPI() {
            // setTimeout(() => {
            //     Navigation.navigate('SplashScreen')
            // }, 2000)
        }

        fetchMyAPI()

    }, []);

    const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => {
            setHidenLogo('hidden');
            setMt15('mt-15');
        }
    );

    const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => {
            setHidenLogo('');
            setMt15('');
        }
    );

    const actionLogin = async () => {
        if (!email || !password) {
            return handleShowNotification('Vui lòng điền đầy đủ thông tin');
        }
        try {
            Keyboard.dismiss()
            setIsSpinLoading(true)
            let data = JSON.stringify({
                "jsonrpc": "2.0",
                "method": "call",
                "params": {
                    'email': email,
                    'password': password
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                mode: 'no-cors',
                url: `http://125.253.121.150:8069/web/api/v1/login`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                data: data
            };

            let response = await axios.request(config);
            const datas = await JSON.parse(JSON.stringify(response.data)).result;
            console.log(datas);
            setIsSpinLoading(false)
            if (datas.status != 200) {
                return handleShowNotification(datas.msg);
            }
            await saveToLocal(datas);
            Navigation.navigate('HomeScreen');

        } catch (error) {
            console.error(
                ' Something went wrong in Login Function',
                error,
            );
        }
    }

    const saveToLocal = async (datas) => {
        try {
            const user_info = await AsyncStorage.setItem('user_info', JSON.stringify(datas));
        } catch (e) {
            console.log(e);
        }
    }

    const handleShowNotification = (text) => {
        if (Platform.OS === 'android') {
            ToastAndroid.show(text, ToastAndroid.SHORT)
        } else {
            Alert.alert('Thông báo', text);
        }
    };

    return (
        <View style={tw`h-full w-full`}>
            <StatusBar
                translucent={false}
                backgroundColor={'#9c1d21'}
                barStyle={'light-content'}
            />
            <View style={tw`h-[55px] w-full flex-row items-center justify-between px-2 bg-[#9c1d21]`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={25} color={'#ffffff'} />
                </TouchableOpacity>
                <Text style={tw`text-[12px] font-bold text-[#ffffff]`}>Đăng nhập</Text>
            </View>
            <ScrollView style={tw`h-full w-full bg-white`}>
                <View style={tw`flex h-full items-center justify-start`}>
                    <View style={tw`w-full h-[200px] flex items-center justify-center`}>
                        <View style={tw`flex justify-center items-center`}>
                            <View style={tw`rounded-5 flex justify-center items-center`}>
                                <Image source={{ uri: `http://125.253.121.150:8069/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem` }}
                                    style={tw`w-[200px] h-full`}
                                    resizeMode='contain' />
                            </View>
                        </View>
                    </View>
                    <View style={tw`h-full h-full px-3 pb-15`}>
                        {/* Email */}
                        <UserTextInputChat
                            placeholder="Tài khoản"
                            iconInput="email"
                            isPass={false}
                            setStateValue={setEmail}
                        />

                        {/* Password */}
                        <UserTextInputChat
                            placeholder="Mật khẩu"
                            isPass={true}
                            iconInput="lock"
                            setStateValue={setPassword}
                        />

                        <View style={tw`w-full flex-row justify-between items-center h-10 mt-10`}>
                            <View style={tw`w-full pr-1 h-full`}>
                                <TouchableOpacity style={tw`h-full bg-[#9c1d21] flex-row justify-center items-center rounded-15`}
                                    onPress={actionLogin}>
                                    <Text style={tw`text-white text-[12px] py-2 px-2`}>Đăng nhập</Text>
                                    {isSpinLoading &&
                                        <ActivityIndicator color="#ffffff" size={20} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={tw`w-full flex-row items-center justify-center mt-5 mb-3`}>
                            <TouchableOpacity onPress={() => {
                                Linking.openURL('https://thegoldcinema.com/web/reset_password');
                            }}>
                                <Text style={tw`text-[#000000] text-[12px]`}>Quên mật khẩu?</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={tw`text-[#000000] text-[12px] text-center italic`}>Hoặc</Text>

                        <View style={tw`w-full flex-row justify-between items-center h-10 mt-4`}>
                            <View style={tw`w-full pr-1 h-full`}>
                                <TouchableOpacity style={tw`h-full bg-[#ffffff] border border-[#9c9c9c] flex-row justify-center items-center rounded-15`}
                                    onPress={() => navigation.navigate('RegisterScreen')}>
                                    <Text style={tw`text-[#9c9c9c] text-[12px] py-2 px-2`}>Đăng ký tài khoản</Text>
                                    {isSpinLoading &&
                                        <ActivityIndicator color="#ffffff" size={20} />
                                    }
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default LoginScreen