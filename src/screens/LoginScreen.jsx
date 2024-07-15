
import { useState, useEffect } from "react"
import { View, TouchableOpacity, StatusBar, Keyboard, Text, Image, ActivityIndicator, Linking } from 'react-native';
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


    return (
        <View style={tw`h-full w-full`}>
            <StatusBar
                translucent={false}
                backgroundColor={'#000000'}
                barStyle={'default'}
            />
            <View style={tw`h-[75px] w-full flex-row items-center justify-between px-2`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={36} color={'#9c1d21'} />
                </TouchableOpacity>
                <Text style={tw`text-[17px] font-bold text-[#9c1d21]`}>Đăng nhập</Text>
            </View>
            <View style={tw`flex-1 h-full items-center justify-start`}>
                <View style={tw`w-full h-[200px] flex items-center justify-center`}>
                    <View style={tw`flex justify-center items-center`}>
                        <View style={tw`rounded-5 flex justify-center items-center`}>
                            <Image source={{ uri: `http://118.70.118.186:8070/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem&time=${Math.random()}` }}
                                style={tw`w-[200px] h-full`}
                                resizeMode='contain' />
                        </View>
                    </View>
                </View>
                <View style={tw`bg-white h-[55%] h-full px-3 py-5 rounded-t-10`}>
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

                    <View style={tw`w-full flex-row justify-between items-center h-10 mt-7`}>
                        <View style={tw`w-full pr-1 h-full`}>
                            <TouchableOpacity style={tw`h-full bg-[#9c1d21] flex-row justify-center items-center rounded-15`}
                            >
                                <Text style={tw`text-white font-bold text-[15px] py-2 px-2`}>Đăng nhập</Text>
                                {isSpinLoading &&
                                    <ActivityIndicator color="#ffffff" size={20} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={tw`w-full flex-row items-center justify-center py-5`}>
                        <TouchableOpacity onPress={() => {
                            Linking.openURL('https://thegoldcinema.com/web/reset_password');
                        }}>
                            <Text style={tw`text-[#000000] text-[15px]`}>Quên mật khẩu?</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={tw`text-[#000000] text-[15px] text-center italic`}>Hoặc</Text>

                    <View style={tw`w-full flex-row justify-between items-center h-10 mt-7`}>
                        <View style={tw`w-full pr-1 h-full`}>
                            <TouchableOpacity style={tw`h-full bg-[#ffffff] border border-[#9c9c9c] flex-row justify-center items-center rounded-15`}
                            >
                                <Text style={tw`text-[#9c9c9c] text-[15px] py-2 px-2`}>Đăng ký tài khoản</Text>
                                {isSpinLoading &&
                                    <ActivityIndicator color="#ffffff" size={20} />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
        // <ImageBackground source={{ uri: 'http://118.70.118.186:8070/web/api/v1/get_background_app?image_type=bg_login' }}  style={tw`h-full w-full`}>
        //     <StatusBar
        //         translucent={false}
        //         backgroundColor={'#000000'}
        //         barStyle={'default'}
        //     />
        //     <View style={tw`h-[75px] w-full flex-row items-center justify-between px-2`}>
        //         <TouchableOpacity onPress={() => navigation.goBack()}>
        //             <MaterialIcons name="arrow-back" size={36} color={'#9c1d21'} />
        //         </TouchableOpacity>
        //         <Text style={tw`text-[17px] font-bold text-[#9c1d21]`}>Đăng nhập</Text>
        //     </View>
        //     <View style={tw`flex-1 h-full items-center justify-start`}>
        //         <View style={tw`w-full h-[150px] flex items-center justify-center`}>
        //             <View style={tw`flex justify-center items-center`}>
        //                 <View style={tw`rounded-5 flex justify-center items-center`}>
        //                     <Image source={{uri: `http://118.70.118.186:8070/web/api/v1/get_background_app?image_type=img_app&model=dm.diadiem&time=${Math.random()}`}} style={tw`w-[100px] h-[100px]`} 
        //                     resizeMode='contain' />
        //                 </View>
        //             </View>
        //         </View>
        //         <View style={tw`bg-white h-[55%] h-full px-3 py-5 rounded-t-10 ${mt15}`}>
        //             {/* Email */}
        //             <UserTextInputChat
        //                 placeholder="Tài khoản"
        //                 iconInput="email"
        //                 isPass={false}
        //                 setStateValue={setEmail}
        //             />

        //             {/* Password */}
        //             <UserTextInputChat
        //                 placeholder="Mật khẩu"
        //                 isPass={true}
        //                 iconInput="lock"
        //                 setStateValue={setPassword}
        //             />

        //             <View style={tw`w-full flex-row justify-between items-center h-13.5`}>
        //                 <View style={tw`w-full pr-1 h-full`}>
        //                     <TouchableOpacity style={tw`h-full bg-[#9c1d21] flex-row justify-center items-center rounded-15`}
        //                         >
        //                         <Text style={tw`text-white font-bold text-[15px] py-2 px-2`}>Đăng nhập</Text>
        //                         {isSpinLoading &&
        //                             <ActivityIndicator color="#ffffff" size={20} />
        //                         }
        //                     </TouchableOpacity>
        //                 </View>
        //             </View>
        //             <View style={tw`w-full flex-row items-center justify-center py-5`}>
        //                 <Text style={tw`text-[#000000] text-[15px]`}>Bạn chưa có tài khoản?</Text>
        //                 <TouchableOpacity>
        //                     <Text style={tw`pl-1 text-[#9c1d21] text-[15px]`}>Liên hệ</Text>
        //                 </TouchableOpacity>
        //             </View>
        //         </View>
        //     </View>
        // </ImageBackground>
    )
}

export default LoginScreen