import React, { useState, useRef, useCallback } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AppHeader from '../components/AppHeader';
import CustomIcon from '../components/CustomIcon';
import EncryptedStorage from 'react-native-encrypted-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useIsFocused } from "@react-navigation/native";
import tw from "twrnc";
import axios from 'axios';
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PanGestureHandler,
  State,
  GestureDetector,
  Gesture
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

const timeArray: string[] = [
  '10:30',
  '12:30',
  '14:30',
  '15:00',
  '19:30',
  '21:00',
];

const generateDate = () => {
  const date = new Date();
  let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let weekdays = [];
  for (let i = 0; i < 7; i++) {
    let tempDate = {
      date: new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDate(),
      day: weekday[new Date(date.getTime() + i * 24 * 60 * 60 * 1000).getDay()],
    };
    weekdays.push(tempDate);
  }
  return weekdays;
};

const generateSeats = () => {
  let numRow = 8;
  let numColumn = 8;
  let rowArray = [];
  let start = 1;
  let reachnine = false;

  for (let i = 0; i < numRow; i++) {
    let columnArray = [];
    for (let j = 0; j < numColumn; j++) {
      let seatObject = {
        number: start,
        taken: Boolean(Math.round(Math.random())),
        selected: false,
      };
      columnArray.push(seatObject);
      start++;
    }
    rowArray.push(columnArray);
  }
  return rowArray;
};

const { width, height } = Dimensions.get('window');

const SeatBookingScreen = ({ navigation, route }: any) => {
  const detail = route.params.detailId;

  const isFocused = useIsFocused()

  const [dateArray, setDateArray] = useState<any[]>(generateDate());
  const [selectedDateIndex, setSelectedDateIndex] = useState<any>();
  const [price, setPrice] = useState<number>(0);
  const [twoDSeatArray, setTwoDSeatArray] = useState<any[][]>(generateSeats());
  const [selectedSeatArray, setSelectedSeatArray] = useState([]);
  const [selectedTimeIndex, setSelectedTimeIndex] = useState<any>();
  const [data, setData] = useState([]);
  const [rootData, setRootData] = useState([]);
  const [rowMap, setRowMap] = useState([]);
  const [columnMap, setColumnMap] = useState([]);
  const [customStyle, setCustomStyle] = useState({});
  const [bookedSeat, setBookedSeat] = useState([]);
  const [datvetruocList, setDatvetruocList] = useState([]);
  const [legendTtems, setLegendTtems] = useState([]);
  const [seats, setSeats] = useState([]);
  const scale = useSharedValue(0.65);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedScale = useSharedValue(0.65);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);
  const [loading, setLoading] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState({});
  const [secondsLeft, setSecondsLeft] = useState(60);

  React.useEffect(() => {
    (async () => {
      setSelectedSeats({})
      get_seat_map_cinema_home()
    })();
    // const intervalId = setInterval(() => {
    //   setSecondsLeft((prevSeconds) => prevSeconds - 1);
    // }, 1000);

    // return () => {
    //   clearInterval(intervalId);
    //   console.log('Function đã dừng do màn hình mất focus.');
    // };
  }, [isFocused]);

  // useFocusEffect(
  //   useCallback(() => {
  //   const intervalId = setInterval(() => {
  //     setSecondsLeft((prevSeconds) => prevSeconds - 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(intervalId);
  //     console.log('Function đã dừng do màn hình mất focus.');
  //   };
  //   }, [])
  // );


  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    // console.log(minutes, remainingSeconds);
    
    if (minutes === 0 && remainingSeconds === 0) {
      Alert.alert('Thông báo', 'Hết thời gian thanh toán. Vui lòng chọn lại?', [
        {
          text: 'XÁC NHẬN', onPress: () => {
            navigation.goBack();
          }
        },
      ]);
    }

    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const get_seat_map_cinema_home = async () => {
    try {
      setLoading(true)
      let data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
          'lichchieu_id': detail.id
        }
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        mode: 'no-cors',
        url: `https://thegoldcinema.com/web/api/v1/lichchieu/seatmap`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: data
      };

      let response = await axios.request(config);
      const datas = await JSON.parse(JSON.stringify(response.data)).result;
      // console.log(datas);
      
      setLoading(false)
      setRootData(datas.result);
      setData(datas.result.data);
      setRowMap(datas.result.rows_map);
      setColumnMap(datas.result.columns_map);
      setCustomStyle(JSON.parse(datas.result.custom_styles));
      setBookedSeat(datas.result.booked_seat);
      setDatvetruocList(datas.result.datvetruoc_list);
      setLegendTtems(datas.result.legend_items);
      setSeats(datas.result.seats);
    } catch (error) {
      setLoading(false)
      console.error(
        ' Something went wrong in getPopularMoviesList Function',
        error,
      );
    }
  };

  const toggleSeat = (seatId, is_ghedoi, dm_loaighe_id) => {    
    let data_seat = {
      ...selectedSeats,
      [seatId]: {
        'tinhtranng': selectedSeats.hasOwnProperty(seatId) ? !selectedSeats[seatId].tinhtranng : true,
        'dm_loaighe_id': dm_loaighe_id
      }
    }
    if (is_ghedoi) {
      let ghe_doi = seatId.split("_");
      
      if (Number(ghe_doi[1]) % 2 === 0) {
        ghe_doi = ghe_doi[0] + "_" + (Number(ghe_doi[1]) - 1);
      } else {
        ghe_doi = ghe_doi[0] + "_" + (Number(ghe_doi[1]) + 1);
      }
      data_seat[[ghe_doi]] = {
        'tinhtranng': data_seat.hasOwnProperty(ghe_doi) ? !data_seat[ghe_doi].tinhtranng : true,
        'dm_loaighe_id': dm_loaighe_id
      }
      
    }
    const filteredByValue = Object.fromEntries(
      Object.entries(data_seat).filter(([key, value]) => value.tinhtranng === true) )
      console.log(filteredByValue);
      
    setSelectedSeats(filteredByValue);
  };

  const handleShowNotification = (text) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(text, ToastAndroid.SHORT)
    } else {
      Alert.alert('Thông báo', text);
    }
  };

  const BookSeats = async () => {

    if (Object.keys(selectedSeats).length === 0) {
      return handleShowNotification('Vui lòng chọn ghế trước khi đặt vé');
    }
    if (Object.keys(selectedSeats).length > 6) {
      return handleShowNotification('Chỉ được phép đặt tối đa 6 ghế.');
    }
    navigation.navigate('PaymentScreen', {
      detailId: detail,
      seats: selectedSeats,
      data: rootData
    });
  };

  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      savedScale.value = scale.value;
    })
    .onUpdate((event) => {
      scale.value = savedScale.value * event.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) {
        scale.value = withTiming(0.6, { duration: 300 });
      }
    });

  const panGesture = Gesture.Pan()
    .onStart(() => {
      savedTranslateX.value = translateX.value;
      savedTranslateY.value = translateY.value;
    })
    .onUpdate((event) => {

      translateX.value = savedTranslateX.value + event.translationX;
      translateY.value = savedTranslateY.value + event.translationY;
    })
    .onEnd(() => {
      // Thêm hiệu ứng nảy (spring) khi gesture kết thúc
      translateX.value = translateX.value
      translateY.value = translateY.value
    })

  const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });


  return (
      <View style={tw`h-full w-full`}>
        <StatusBar
          translucent={false}
          backgroundColor={'#000000'}
          barStyle={'default'}
        />
        <View style={tw`h-[55px] w-full flex-row items-center justify-start px-2 border-b border-gray-300 absolute z-1 bg-white`}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={tw``}>
            <MaterialIcons name="arrow-back" size={25} color={'#9c1d21'} />
          </TouchableOpacity>
          <View style={tw`flex items-start justify-center ml-2`}>
            <View style={tw`flex-row items-start justify-center`}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[12px] font-bold text-[#9c1d21]`}>{detail.marap}</Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[12px] font-bold text-black ml-1`}>{detail.rapphim.toUpperCase()}</Text>
            </View>
            <View style={tw`flex-row items-start justify-center`}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[12px] text-[#9c9c9c]`}>{detail.phong},</Text>
              <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[12px] text-[#9c9c9c] ml-1`}>{detail.ngaychieu.split("-")[2]}/{detail.ngaychieu.split("-")[1]}/{detail.ngaychieu.split("-")[0]}</Text>
              {/* <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[14px] text-[#9c9c9c] ml-1`}>{detail.giobatdau} ~ {detail.ketthuc}</Text> */}
            </View>
          </View>
          {/* <Text style={tw`text-[12px] text-[#000000] absolute right-3`}>{formatTime(secondsLeft)}</Text> */}
        </View>
        <GestureHandlerRootView style={tw`h-full w-full bg-black`}>
          <GestureDetector gesture={composedGesture}>
            <Animated.View style={[styles.container, animatedStyle, tw``]}>
              <Text style={tw`text-[20px] text-[#ffffff] font-bold text-center mb-15`}>MÀN HÌNH</Text>
              <View style={[styles.containerGap20]}>
                {loading && <View style={tw`h-full w-full absolute z-10 top-[50%] flex items-center justify-start`}>
                  <ActivityIndicator size="30" color="#ffffff" style={tw``} />
                </View>}
                {rowMap?.map((item, index_row) => {
                  let data_item = data[index_row].split("");
                  return (
                    <View key={item} style={[styles.seatRow, { marginTop: -18 }]}>
                      {columnMap?.map((subitem, index) => {
                        if (subitem != "") {
                          let color = '';
                          let disableBooking = false
                          let is_ghedoi = false
                          let text_seats = 'a'
                          if (data_item.filter((i) => i === 'a').length > 0) {
                            color = '#3a78c3'
                          } else {
                            color = '#ee82ee';
                            is_ghedoi = true;
                            text_seats = 'b'
                          }

                          if (datvetruocList.includes(`${item}_${subitem}`)) {
                            color = '#008000'
                            disableBooking = true;
                          }

                          if (bookedSeat.includes(`${item}_${subitem}`)) {
                            color = '#472b34';
                            disableBooking = true
                          }
                          return (
                            <TouchableOpacity
                              key={`${item}_${subitem}`}
                              disabled={disableBooking}
                              style={[customStyle.hasOwnProperty(item + subitem) ? customStyle[item + subitem] : '']}
                              onPress={() => {
                                toggleSeat(`${item}_${subitem}`, is_ghedoi, seats[text_seats].dm_loaighe_id);
                              }}>
                              <View style={[tw`w-7 h-7 bg-white flex justify-center items-center bg-[${color}] 
                                  bg-[${(selectedSeats.hasOwnProperty(`${item}_${subitem}`) && selectedSeats[`${item}_${subitem}`].tinhtranng) ? '#e6cac4' : color}] 
                                `]}>
                                <Text style={tw`text-[11px] text-center text-white`}>{item + subitem}</Text>
                              </View>
                            </TouchableOpacity>
                          );
                        }

                      })}
                    </View>
                  );
                })}
              </View>
              <View style={[styles.seatRadioContainer, tw`mt-15`]}>
                {legendTtems.length > 0 && <View style={styles.radioContainer}>
                  <View style={[tw`w-4 h-4 bg-white flex justify-center items-center bg-[#e6cac4]`]}>

                  </View>
                  <Text style={tw`text-[12px] text-center text-white`}>Đang chọn</Text>
                </View>
                }
                {legendTtems?.map((item) => {
                  let color = '';
                  if (item[0] == 'a') {
                    color = '#3a78c3'
                  }
                  if (item[0] == 'b') {
                    color = '#ee82ee'
                  }
                  if (item[0] == 'g') {
                    color = '#008000'
                  }
                  if (item[0] == 'f') {
                    color = '#472b34'
                  }
                  return (
                    <View style={[styles.radioContainer, tw`ml-3`]} key={item[0]}>
                      <View style={[tw`w-4 h-4 bg-white flex justify-center items-center bg-[${color}]`]}>

                      </View>
                      <Text style={tw`text-[12px] text-center text-white`}>{item[2]}</Text>
                    </View>
                  )
                })}
              </View>
            </Animated.View>
          </GestureDetector>
        </GestureHandlerRootView>
        <View style={tw`h-[75px] w-full flex-row items-center justify-between px-2 absolute z-1 bottom-0 bg-white`}>
          <View style={tw`flex items-start justify-start w-full`}>
            <Text ellipsizeMode='tail' numberOfLines={1} style={tw`font-bold text-[12px] text-black`}>{detail.phim.toUpperCase()}</Text>
            <View style={tw`flex-row items-center justify-between w-full mt-2`}>
              <Text style={tw`text-[#4a4a4a] text-[12px]`}>{detail.giobatdau} ~ {detail.ketthuc}</Text>
              <TouchableOpacity onPress={BookSeats}>
                <Text style={tw`text-white font-bold bg-[#9C1D21] text-[12px] px-8 py-2 rounded-15`}>Đặt vé</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flex: 1,
    backgroundColor: COLORS.Black,
    // height: height - 150,
    // paddingTop: 75
  },
  ImageBG: {
    width: '100%',
    aspectRatio: 3072 / 1727,
  },
  linearGradient: {
    height: '100%',
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  screenText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA15,
  },
  seatContainer: {
    marginVertical: SPACING.space_20,
  },
  containerGap20: {
    gap: SPACING.space_20,
  },
  seatRow: {
    flexDirection: 'row',
    gap: SPACING.space_2,
    justifyContent: 'start',
  },
  seatIcon: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
  },
  seatRadioContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_36,
    marginBottom: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  radioContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  radioIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.White,
  },
  radioText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  dateContainer: {
    width: SPACING.space_10 * 7,
    height: SPACING.space_10 * 10,
    borderRadius: SPACING.space_10 * 10,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  dayText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.White,
  },
  OutterContainer: {
    marginVertical: SPACING.space_24,
  },
  timeContainer: {
    paddingVertical: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.WhiteRGBA50,
    paddingHorizontal: SPACING.space_20,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.DarkGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  buttonPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SPACING.space_24,
    paddingBottom: SPACING.space_24,
  },
  priceContainer: {
    alignItems: 'center',
  },
  totalPriceText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Grey,
  },
  price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    backgroundColor: COLORS.Orange,
  },
});

export default SeatBookingScreen;
