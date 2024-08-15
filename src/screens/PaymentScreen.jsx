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
    ActivityIndicator
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { SelectCountry } from 'react-native-element-dropdown';
import tw from "twrnc";
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const PaymentScreen = ({ navigation, route }) => {
    const detail = route.params.detailId;
    const seats = route.params.seats;
    const banggia = route.params.data.banggia;
    const defaultBanggia = banggia.length > 0 ? banggia[0]["dm_loaive_id"] : 0;
    const defaultDongia = banggia.length > 0 ? banggia[0]["dongia"] : 0;
    const [selectedBanggia, setSelectedBanggia] = useState({});

    useEffect(() => {
        (async () => {
            let seats_data_default = {
                ...selectedBanggia,
            }
            Object.keys(seats).map((item) => {
                seats_data_default[[item]] = defaultDongia
            })
            setSelectedBanggia(seats_data_default);
        })();
      }, []);
    const renderItem = ({ item }) => {
        return (
            <View style={tw``}>
                <View style={tw`w-full`}>
                    <Text style={tw`text-[14px] text-[#404040]`}>{item.dm_loaighe_name}</Text>
                </View>
            </View>
        )
    }

    const onChange = (item, key) => {
        setSelectedBanggia({
            ...selectedBanggia,
            [key]: item.dongia || 0,
        });
        console.log(selectedBanggia);
    }

    return (
        <View style={tw`h-full w-full`}>
            <StatusBar
                translucent={false}
                backgroundColor={'#000000'}
                barStyle={'default'}
            />
            <View style={tw`h-[75px] w-full flex-row items-center justify-start px-2 border-b border-gray-300 absolute z-1 bg-white`}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={tw``}>
                    <MaterialIcons name="arrow-back" size={30} color={'#9c1d21'} />
                </TouchableOpacity>
                <View style={tw`flex items-start justify-center ml-2`}>
                    <View style={tw`flex-row items-start justify-center`}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[15px] font-bold text-[#9c1d21]`}>{detail.marap}</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[15px] font-bold text-black ml-1`}>{detail.rapphim.toUpperCase()}</Text>
                    </View>
                    <View style={tw`flex-row items-start justify-center`}>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[14px] text-[#9c9c9c]`}>{detail.phong},</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[14px] text-[#9c9c9c] ml-1`}>{detail.ngaychieu.split("-")[2]}{detail.ngaychieu.split("-")[1]}/{detail.ngaychieu.split("-")[0]},</Text>
                        <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[14px] text-[#9c9c9c] ml-1`}>{detail.giobatdau} ~ {detail.ketthuc}</Text>
                    </View>
                </View>
            </View>
            <View style={tw`w-full mt-[75px]`}>
                <ScrollView style={tw`w-full px-2`}>
                    {Object.keys(seats).map((item) => {
                        return (
                            <View key={item} style={tw`w-full h-[65px] flex-row items-center justify-between px-3 mt-2 bg-[#ffffff] rounded`}>
                                <View style={tw`flex-row items-center justify-between`}>
                                    <View style={[tw`w-10 h-10 bg-white flex justify-center items-center bg-[#3a78c3] rounded`]}>
                                        <Text style={tw`text-[11px] text-center text-white`}>{item.split("_")[0]}{item.split("_")[1]}</Text>
                                    </View>
                                    <SelectCountry
                                        style={tw`w-[120px] border-b-[0.5px] ml-3 border-b-[#7a7a7a]`}
                                        selectedTextStyle={tw`text-[14px] text-[#404040]`}
                                        placeholderStyle={tw`text-[14px]`}
                                        value={defaultBanggia}
                                        data={banggia}
                                        valueField="dm_loaive_id"
                                        labelField="dm_loaive_name"
                                        placeholder={'Loại vé'}
                                        onChange={e => {
                                            onChange(e, item)
                                        }}
                                        renderItem={renderItem}
                                    />
                                </View>
                                <Text style={tw`text-[#9C1D21] font-bold text-[14px]`}>{(selectedBanggia[item] || defaultDongia).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Text>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
            <View style={tw`h-[75px] w-full flex-row items-center justify-between px-2 absolute z-1 bottom-0 bg-white`}>
                <View style={tw`flex items-start justify-start w-full`}>
                    <Text ellipsizeMode='tail' numberOfLines={1} style={tw`font-bold text-[14px] text-black`}>{detail.phim.toUpperCase()}</Text>
                    <View style={tw`flex-row items-center justify-between w-full`}>
                        <Text style={tw`text-[#9C1D21] font-bold text-[14px]`}>{Object.values(selectedBanggia).reduce((a, b) => a + b, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('QrScreen')}>
                            <Text style={tw`text-white font-bold bg-[#9C1D21] text-[14px] px-8 py-2 rounded-15`}>Đặt vé</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    );
};

export default PaymentScreen;
