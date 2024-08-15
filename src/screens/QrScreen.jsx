import React, { useState, useRef, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    StatusBar,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    ToastAndroid,
    ActivityIndicator,
    Image,
    Linking,
    PermissionsAndroid,
    Platform,
    Alert
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SelectCountry } from 'react-native-element-dropdown';
import tw from "twrnc";
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

const { width, height } = Dimensions.get('window');

const QrScreen = ({ navigation, route }) => {
    const tong_tien = route.params.tong_tien;
    const selectedBanggia = route.params.selectedBanggia;
    const datas = route.params.datas;
    console.log(tong_tien);
    
    const [bankingData, setBankingData] = useState([]);

    useEffect(() => {
        (async () => {
            await getBanking();
        })();
    }, []);

    const getBanking = async () => {
        try {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                mode: 'no-cors',
                url: 'https://api.vietqr.io/v2/banks',
                headers: {},
            };

            await axios.request(config)
                .then((response) => {
                    setBankingData(JSON.parse(JSON.stringify(response.data)).data);
                })
                .catch((error) => {
                    console.log(1, error);
                });


            // const datas = await JSON.parse(JSON.stringify(response.data)).result;
            // return datas
        } catch (error) {
            console.error(
                ' Something went wrong in get banking Function',
                error,
            );
        }
    }

    const onDeepLink = async (item) => {
        await checkPermission();
        Linking.openURL(`https://dl.vietqr.io/pay?app=${item.code.toLowerCase()}`);
    }

    const checkPermission = async () => {
        if (Platform.OS === 'ios') {
            downloadImage();
        }else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message: 'App needs access to your storage to download Photos',
                    },
                )
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    downloadImage();
                } else {
                    Alert.alert('Storage Permission Denied');
                }
            } catch (err){
                console.warn(err);
            }
        }
    }

    const downloadImage = async () => {
        let date = new Date();
        let image_Url = `https://img.vietqr.io/image/vietinbank-113366668888-qr_only.jpg?amount=1000000&addInfo=banhang&accountName=TestApp`;
        let ext = getExtention(image_Url);
        ext = "." + ext[0];

        const { config, fs } = RNFetchBlob

        let PictureDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: PictureDir + "/image_" + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
                description: 'Image'
            }
        }

        config(options).fetch('GET', image_Url).then((res) => {
            console.log('The image is saved to');
        })
    }

    const getExtention = (filename) => {
        return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined
    }


    return (
        <View style={tw`h-full w-full`}>
            <StatusBar
                translucent={false}
                backgroundColor={'#9c1d21'}
                barStyle={'light-content'}
            />
            <View style={tw`h-[75px] w-full flex-row items-center justify-start px-2 border-b border-gray-300 bg-[#9c1d21]`}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw``}>
                    <MaterialIcons name="arrow-back" size={29} color={'#ffffff'} />
                </TouchableOpacity>
                <View style={tw`flex items-start justify-center ml-2`}>
                    <View style={tw`flex-row items-start justify-center`}>
                        <Text style={tw`text-[15px] font-bold text-[#ffffff]`}>Thanh toán</Text>
                    </View>
                </View>
            </View>
            <View style={tw`flex-row items-center justify-between px-2 py-2 pr-4 border-b border-gray-300`}>
                <Image
                    source={{ uri: `http://125.253.121.150:8069/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem` }}
                    resizeMode="contain"
                    style={tw`h-[70px] w-[170px]`} />
                <View>
                    <Text style={tw`text-[14px] text-[#404040]`}>Số tiền thanh toán</Text>
                    <Text style={tw`text-[15px] font-bold text-[#9c1d21]`}>{tong_tien} VND</Text>
                </View>
            </View>
            <ScrollView>
                <View style={tw`flex items-center justify-center`}>
                    <Image
                        resizeMode="contain"
                        style={tw`h-60%] w-[50%]`}
                        source={{ uri: `https://img.vietqr.io/image/vietinbank-113366668888-qr_only.jpg?amount=1000000&addInfo=banhang&accountName=TestApp` }} />

                    <TouchableOpacity style={tw`mt-2 flex-row items-center justify-center`}
                        onPress={checkPermission}>
                        <MaterialIcons name="file-download" size={20} color={'#404040'} />
                        <Text style={tw`text-[#404040] text-center text-[14px]`}>Tải xuống</Text>
                    </TouchableOpacity>
                </View>
                <View style={tw`w-full flex-wrap px-2 border-b border-gray-300 flex-row items-center justify-start mt-10`}>
                    {bankingData.map((item, index) => {
                        return (
                            <View style={tw`w-1/4 p-1`} key={index}>
                                <TouchableOpacity key={index} style={tw`flex-row items-center justify-between border border-gray-300 h-[50px] bg-white`}
                                    onPress={() => onDeepLink(item)}>
                                <Image
                                    resizeMode="contain"
                                    style={tw`w-[100%] h-[40px]`}
                                    source={{ uri: item?.logo }} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}
                </View>
            </ScrollView>


        </View>
    );
};

export default QrScreen;
