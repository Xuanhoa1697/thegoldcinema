import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Agenda } from 'react-native-calendars';
import tw from "twrnc";
import axios from 'axios';

const timeToString = () => {
  var today = new Date();
  var date = today.getFullYear().toString().padStart(2, '0') + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
  var time = today.getHours().toString().padStart(2, '0') + ':' + today.getMinutes().toString().padStart(2, '0') + ':' + today.getSeconds().toString().padStart(2, '0');
  return date + ' ' + time
};

const dateToString = () => {
  var today = new Date();
  var date = today.getFullYear().toString().padStart(2, '0') + '-' + (today.getMonth() + 1).toString().padStart(2, '0') + '-' + today.getDate().toString().padStart(2, '0');
  return date
};

const DetaiCinemaScreen = ({ navigation, route }) => {
  const movieid = route.params.movieid
  const movieName = route.params.movieName
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(dateToString);

  useEffect(() => {
    (async () => {
      get_list_cinema_with_date()
    })();
  }, []);

  const get_list_cinema_with_date = async () => {
    try {

      let data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
          "phim_id": movieid,
          'time': dateToString()
        }
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        mode: 'no-cors',
        url: `http://118.70.118.186:8070/web/api/v1/get_list_cinema_with_date`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: data
      };

      let response = await axios.request(config);
      const datas = await JSON.parse(JSON.stringify(response.data)).result;
      setItems(datas.result);

    } catch (error) {
      console.error(
        ' Something went wrong in getPopularMoviesList Function',
        error,
      );
    }
  }

  const renderList = ({ items }) => {    
    setTimeout(() => {
      setLoading(false)
    }, 1000)
    if (!items[date]) {
      return <View>
        <Text style={tw`text-center text-[#000000] mt-5`}>Không có lịch chiếu</Text>
      </View>
    }

    const checkLogin = (item) => {
      console.log(item);
    }
    return (
      <View style={tw`px-3`}>
        {Object.keys(items[date]).map((cinemaName, key) => (
          <View style={tw`mt-5 w-full`}>
            <View style={tw`flex-row items-center justify-between`} key={key} >
              <View style={tw`flex-row items-center justify-start`}>
                <Text style={tw`text-[16px] text-[#9c1d21] font-semibold`}>{items[date][cinemaName]['marap']}</Text>
                <Text style={tw`text-[16px] text-[#000000] font-semibold ml-1`}>{cinemaName}</Text>
              </View>
              <AntDesign name='heart' size={22} color={key == 0 ? '#9c1d21' : '#9c9c9c'} />
            </View>
            <Text style={tw`text-[15px] text-[#9c9c9c]`}>{items[date][cinemaName]['diachi']}</Text>
            <View style={tw`flex-row items-center justify-start mt-3 `}>
            {items[date][cinemaName]['danhsachphim'].map((item, index) => (
              <TouchableOpacity style={tw`flex-row items-center justify-between mr-2 
                rounded-2 border border-[#9c9c9c] px-2 py-1`} key={index}
                onPress={() => checkLogin(item)}>
                  <View style={tw`flex-row items-center justify-start`}>
                    <Text style={tw`text-start text-[16px] text-[#9c9c9c]`}>{item.giobatdau}</Text>
                  </View>
                </TouchableOpacity>
            ))}
          </View>
        </View>
        ))}
      </View>
    )
  };

  return (
    <View style={tw`h-full w-full`}>
      <StatusBar
        translucent={false}
        backgroundColor={'#000000'}
        barStyle={'default'}
      />
      <View style={tw`h-full w-full`}>
        <View style={tw`h-[75px] w-full flex-row items-center justify-center px-2 border-b border-gray-300`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw`absolute left-2`}>
            <MaterialIcons name="arrow-back" size={36} color={'#9c1d21'} />
          </TouchableOpacity>
          <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[17px] font-bold text-black ml-2`}>{movieName.toUpperCase()}</Text>
        </View>
        {loading && <View style={tw`h-full w-full absolute z-10 top-[180px] flex items-center justify-start`}>
          <ActivityIndicator size="30" color="#9c1d21" style={tw`mt-[50%]`} />
        </View>}
        <Agenda
          items={items}
          markingType='dot'
          // loadItemsForMonth={get_list_cinema_with_date}
          selected={timeToString()}
          showClosingKnob={true}
          hideExtraDays={true}
          renderList={renderList}
          onDayPress={(days) => {
            setLoading(true)
            setDate(days.dateString)
          }}
          initialNumToRender={10}
          initialScrollIndex={2}
          headerStyle={{ backgroundColor: '#9c1d21' }}
          showsHorizontalScrollIndicator={true}
          minDate={dateToString()}
          theme={{
            agendaDayTextColor: '#9c1d21',
            agendaDayNumColor: '#9c1d21',
            agendaKnobColor: '#9c1d21',
            selectedDayBackgroundColor: '#9c1d21',
            selectedDotColor: '#ffffff',
            selectedDayTextColor: '#ffffff',
            agendaTodayColor: '#9c1d21',
            backgroundColor: '#000000',
            calendarBackground: '#000000',
          }}
        />
      </View>
    </View>
  );
};

export default DetaiCinemaScreen;
