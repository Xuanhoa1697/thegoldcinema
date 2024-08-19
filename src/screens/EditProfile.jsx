import { useEffect, useState } from 'react';
import { Text, View, Keyboard, StatusBar, TextInput, TouchableOpacity, Alert, Platform, ToastAndroid } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [name, setName] = useState('');
    const [user_id, setUser_id] = useState('');
    const [token, setToken] = useState('');
    useEffect(() => {
        (async () => {
            get_local_storage();
        })();
    }, []);

    const get_local_storage = async () => {
        const user_info = await AsyncStorage.getItem('user_info');
        const json_loads = JSON.parse(user_info);
        setEmail(json_loads.user_mail);
        setPhone(json_loads.phone);
        setName(json_loads.user);
        setUser_id(json_loads.user_id);
        setToken(json_loads.access_token);
        console.log(json_loads);
    }

    const updateProfile = async () => {
        try {
            Keyboard.dismiss()
            let data = JSON.stringify({
                "jsonrpc": "2.0",
                "method": "call",
                "params": {
                    'email': email,
                    'user_id': user_id,
                    'name': name,
                    'phone': phone
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                mode: 'no-cors',
                url: `http://125.253.121.150:8069/web/api/v1/user_update`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                data: data
            };

            let response = await axios.request(config);
            const datas = await JSON.parse(JSON.stringify(response.data)).result;
            console.log(datas);
            if (datas.status != 200) {
                return handleShowNotification(datas.msg);
            }
            await saveToLocal(datas.result);
            navigation.goBack();

        } catch (error) {
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

    const saveToLocal = async (data) => {
        const localStorage = JSON.parse(await AsyncStorage.getItem('user_info'));
        console.log(localStorage);
        localStorage.phone = data.phone;
        localStorage.user = data.name;
        localStorage.user_name = data.name;
        await AsyncStorage.setItem('user_info', JSON.stringify(localStorage));
    }

    const deleteUser = async () => {
        try {
            Keyboard.dismiss()
            let data = JSON.stringify({
                "jsonrpc": "2.0",
                "method": "call",
                "params": {
                    'user_id': user_id,
                    'access_token': token
                }
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                mode: 'no-cors',
                url: `http://125.253.121.150:8069/web/api/v1/user_delete`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                data: data
            };

            let response = await axios.request(config);
            const datas = await JSON.parse(JSON.stringify(response.data)).result;
            console.log(datas);
            if (datas.status != 200) {
                return handleShowNotification(datas.msg);
            }
            await AsyncStorage.removeItem('user_info');
            navigation.navigate('HomeScreen');

        } catch (error) {
            console.error(
                ' Something went wrong in getPopularMoviesList Function',
                error,
            );
        }
    }

    const removeUser = async () => {
        Alert.alert('Xóa tài khoản', 'Bạn thực sự muốn xóa tài khoản này. Việc này đồng nghĩa với việc bạn sẽ không thể sử dụng tài khoản này nữa?', [
            {
                text: 'Hủy bỏ',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'Đồng ý', onPress: () => {
                    deleteUser()
                }
            },
        ]);
    }

    return (
        <View style={tw`w-full h-full`}>
            <StatusBar
                translucent={false}
                backgroundColor={'#9C1D21'}
                barStyle={'light-content'}
            />
            <View style={tw`h-[55px] w-full flex-row items-center justify-between px-2 bg-[#9C1D21]`}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={25} color={'#ffffff'} />
                </TouchableOpacity>
                <Text style={tw`text-[12px] font-bold text-[#ffffff]`}>Thông tin tài khoản</Text>
            </View>
            <View style={tw`px-4 mt-5`}>
                <TextInput
                    style={tw`border-b border-[#9C9C9C] py-3 text-[12px]`}
                    placeholder='Họ tên *'
                    value={name}
                    onChange={(e) => setName(e.nativeEvent.text)}
                    selectTextOnFocus={false} />
                <TextInput
                    style={tw`border-b border-[#9C9C9C] py-3 text-[12px]`}
                    placeholder='Số điện thoại *'
                    value={phone || ''}
                    onChange={(e) => setPhone(e.nativeEvent.text)}
                    keyboardType='phone-pad'
                    selectTextOnFocus={false} />
                <TextInput
                    style={tw`border-b border-[#9C9C9C] py-3 text-[12px]`}
                    placeholder='Email *'
                    value={email}
                    onChange={(e) => setEmail(e.nativeEvent.text)}
                    editable={false}
                    selectTextOnFocus={false} />

                <Text style={tw`text-[12px] text-[#9C9C9C] mt-5`}>* Thông tin bắt buộc</Text>
                <TouchableOpacity style={tw`w-full mt-5`}
                    onPress={updateProfile}>
                    <Text style={tw`text-white bg-[#9C1D21] text-center text-[12px] px-8 py-2 rounded-15`}>Cập nhật</Text>
                </TouchableOpacity>
                <TouchableOpacity style={tw`mt-3`}
                    onPress={removeUser}>
                    <Text style={tw`text-[#9C9C9C] text-center text-[12px]`}>Xóa tài khoản</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default EditProfile;
