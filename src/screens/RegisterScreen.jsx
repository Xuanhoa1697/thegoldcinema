
import { useState, useEffect } from "react"
import { View, TouchableOpacity, StatusBar, Keyboard, Text, Image, ActivityIndicator, Platform, ToastAndroid, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinearGradient from 'react-native-linear-gradient';
import UserTextInputChat from "../components/UserTextInputChat";


const RegisterScreen = ({ navigation }) => {
    const Navigation = useNavigation();
    const [hidenLogo, setHidenLogo] = useState('');
    const [mt15, setMt15] = useState('');
    const [isSpinLoading, setIsSpinLoading] = useState(false);
    const [name, setName] = useState(null);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);

    useEffect(() => {

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

    const actionRegister = async () => {
        if (!name || !phoneNumber || !email || !password || !confirmPassword) {
            return handleShowNotification('Vui lòng điền đầy đủ thông tin');
        }

        if (password !== confirmPassword) {
            return handleShowNotification('Xác nhận mật khẩu không đúng');
        }

        try {
            Keyboard.dismiss()
            setIsSpinLoading(true)
            let data = JSON.stringify({
                "jsonrpc": "2.0",
                "method": "call",
                "params": {
                    "email": email,
                    'name': name,
                    'password': password,
                    'phone': phoneNumber
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                mode: 'no-cors',
                url: `http://125.253.121.150:8069/web/api/v1/register`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                data: data
            };

            let response = await axios.request(config);
            const datas = await JSON.parse(JSON.stringify(response.data)).result;
            console.log(datas);
            if (datas.status == 500) {
                return handleShowNotification(datas.msg);
            }
            if (datas.status == 200) {
                handleShowNotification(datas.msg);
            }
            setTimeout(() => {
                setIsSpinLoading(false);
                Navigation.navigate('LoginScreen');
            }, 1000);

        } catch (error) {
            setIsSpinLoading(false);
            console.error(
                ' Something went wrong in getPopularMoviesList Function',
                error,
            );
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
                <Text style={tw`text-[12px] font-bold text-[#ffffff]`}>Đăng ký</Text>
            </View>
            <ScrollView style={tw`h-full w-full bg-white`}>
                <View style={tw`flex-1 h-full items-center justify-start`}>
                    <View style={tw`w-full h-[200px] flex items-center justify-center`}>
                        <View style={tw`flex justify-center items-center`}>
                            <View style={tw`rounded-5 flex justify-center items-center`}>
                                <Image source={{ uri: `http://125.253.121.150:8069/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem` }}
                                    style={tw`w-[200px] h-full`}
                                    resizeMode='contain' />
                            </View>
                        </View>
                    </View>
                    <View style={tw`h-full px-3`}>
                        <UserTextInputChat
                            placeholder="Tên"
                            iconInput="email"
                            isPass={false}
                            setStateValue={setName}
                        />
                        <UserTextInputChat
                            placeholder="Số điện thoại"
                            iconInput="email"
                            isPass={false}
                            setStateValue={setPhoneNumber}
                            typeInput='phone-pad'
                        />
                        {/* Email */}
                        <UserTextInputChat
                            placeholder="Email"
                            iconInput="email"
                            isPass={false}
                            setStateValue={setEmail}
                            typeInput='email-address'
                        />

                        {/* Password */}
                        <UserTextInputChat
                            placeholder="Mật khẩu"
                            isPass={true}
                            iconInput="lock"
                            setStateValue={setPassword}
                        />

                        <UserTextInputChat
                            placeholder="Nhập lại mật khẩu"
                            isPass={true}
                            iconInput="lock"
                            setStateValue={setConfirmPassword}
                        />

                        <View style={tw`w-full flex-row justify-between items-center h-10 mt-10`}>
                            <View style={tw`w-full pr-1 h-full`}>
                                <TouchableOpacity style={tw`h-full bg-[#9c1d21] flex-row justify-center items-center rounded-15`}
                                    onPress={actionRegister}>
                                    <Text style={tw`text-white font-bold text-[12px] py-2 px-2`}>Đăng ký</Text>
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

export default RegisterScreen