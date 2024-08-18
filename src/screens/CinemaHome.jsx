import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';

const CinemaHomeScreen = ({ navigation }) => {
    const [datas, setDatas] = React.useState([{
        'name': 'Rạp chiếu phim The Gol Mart',
        'address': 'Dev'
    }]);
    React.useEffect(() => {
        (async () => {
            get_list_cinema_home()
        })();
    }, []);

    const get_list_cinema_home = async () => {
        try {
            let data = JSON.stringify({
                "jsonrpc": "2.0",
                "method": "call",
                "params": {}
            });
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                mode: 'no-cors',
                url: `http://125.253.121.150:8069/web/api/v1/get_list_cinema_home`,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                },
                data: data
            };

            let response = await axios.request(config);
            const datas = await JSON.parse(JSON.stringify(response.data)).result;
            console.log(datas);
            setDatas(datas.result);
        } catch (error) {
            console.error(
                ' Something went wrong in getPopularMoviesList Function',
                error,
            );
        }
    };
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
                <Text style={tw`text-[13.5px] font-bold text-[#9c1d21]`}>Danh sách rạp phim</Text>
            </View>
            <View style={tw`h-[1px] w-full bg-[#9c9c9c] opacity-50`}/>
            <TouchableOpacity style={tw`w-full border-b border-[#c9c9c9]`} onPress={() => navigation.goBack()}>
                {datas.length > 0 && datas.map((item, index) => {
                    return (<View key={index} style={tw`h-[75px] w-full flex-row items-center justify-between px-3`}>
                        <Text style={tw`text-[13.5px] font-semibold text-black`}>{item.name}</Text>
                        <Text ellipsizeMode='tail' numberOfLines={2} style={tw`text-[13.5px] text-[#9c1d21] w-[250px]`}>{item.address}</Text>
                    </View>)
                })}
            </TouchableOpacity>
        </View>
    );
};

export default CinemaHomeScreen;
