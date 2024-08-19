import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Modal,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Platform,
  ScrollView,
  Image
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from "twrnc";
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import CustomIcon from '../components/CustomIcon';
// import { ScrollView } from 'react-native-gesture-handler';

const TicketScreen = ({ navigation, route }: any) => {
  const [ticketData, setTicketData] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [order, setOrder] = useState({});

  useEffect(() => {
    (async () => {
      try {
        let user_info = await AsyncStorage.getItem('user_info');
        get_ticket_cinema(user_info)
      } catch (error) {
        console.error('Something went wrong while getting Data', error);
      }
    })();
  }, []);

  const get_ticket_cinema = async (user_info) => {
    try {
      let data = JSON.stringify({
        "jsonrpc": "2.0",
        "method": "call",
        "params": {
          'user_id': JSON.parse(user_info).user_id,
        }
      });
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        mode: 'no-cors',
        url: `http://125.253.121.150:8069/web/api/v1/get_ticket`,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        data: data
      };

      let response = await axios.request(config);
      const datas = await JSON.parse(JSON.stringify(response.data));
      if (datas.result.status != 200) {
        return handleShowNotification(datas.result.msg)
      }
      setTicketData(datas.result.result);
    } catch (error) {
      handleShowNotification('Đã xảy ra lỗi. Vui lòng thử lại.')
      console.error(
        ' Something went wrong in getPopularMoviesList Function',
        error,
      );
    }
  };

  const handleShowNotification = (text) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(text, ToastAndroid.SHORT)
    } else {
      Alert.alert('Thông báo', text);
    }
  };

  const onShowTicketDetail = (item) => {
    // navigation.navigate('TicketDetailScreen', { item: item })
    setModalVisible(!modalVisible);
    setOrder(item)
    console.log(item);

  }

  return (
    <View style={[styles.container, tw`bg-[#c9c9c9]`]}>
      <StatusBar
        translucent={false}
        backgroundColor={'#9C1D21'}
        barStyle={'light-content'}
      />
      <View style={tw`h-[55px] w-full flex-row items-center justify-between px-2 bg-[#9c1d21]`}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <MaterialIcons name="arrow-back" size={25} color={'#ffffff'} />
        </TouchableOpacity>
        <Text style={tw`text-[12px] font-bold text-[#ffffff]`}>Vé của tôi</Text>
      </View>
      <Modal
        animationType='fade'
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={tw`bg-white w-full rounded-2 bg-[#ffffff] h-full`}>
          <View style={tw`h-[55px] w-full flex-row items-center justify-between px-2 bg-[#9c1d21]`}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <MaterialIcons name="arrow-back" size={25} color={'#ffffff'} />
            </TouchableOpacity>
            <Text style={tw`text-[12px] font-bold text-[#ffffff]`}>Thông tin vé phim</Text>
          </View>
          <ScrollView style={tw`p-3 mb-2`}>
            <Text ellipsizeMode='tail' numberOfLines={2} style={tw`text-[#000000] font-bold text-[12px]`}>{order.tenphim}</Text>

            <View style={tw`flex-row items-center justify-center mt-3`}>
              <QRCode
                value={order.name}
                size={80}
                color="black"
                backgroundColor="white"
              />
            </View>
            <View style={tw`flex items-start justify-center mt-3 w-full border-b border-dotted border-gray-300 pb-3`}>
              <Text style={tw`text-[#000000] text-[12px]`}>Vui lòng đưa mã số này đến quầy vé của The GoldMart để nhận vé của bạn.</Text>
            </View>

            <View style={tw`flex-row items-center justify-start mt-3`}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-1/5 font-bold`}>Mã vẽ:</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-4/5`}>{order.name}</Text>
            </View>
            <View style={tw`flex-row items-center justify-start`}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-1/5 font-bold`}>Ngày chiếu:</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-4/5`}>{order.batdau}</Text>
            </View>

            <View style={tw`flex-row items-center justify-start`}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-1/5 font-bold`}>Rạp phim:</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-4/5`}>{order.rapphim}</Text>
            </View>

            <View style={tw`flex-row items-center justify-start`}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-1/5 font-bold`}>Phòng:</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-4/5`}>{order.phong}</Text>
            </View>

            <View style={tw`flex-row items-center justify-start`}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-1/5 font-bold`}>Thanh toán:</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-4/5`}>{order.thanhtoan}</Text>
            </View>

            <View style={tw`flex-row items-center justify-start`}>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-1/5 font-bold`}>Trạng thái:</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[#000000] text-[12px] mt-1 w-4/5`}>{order.state != 'done' ? 'Chờ thanh toán' : 'Đã thanh toán'}</Text>
            </View>

            <View style={tw`w-full flex-row items-center justify-start mt-3 border-b border-gray-300 py-3`}>
              <View style={tw` w-1/3`}>
                <Text style={tw`text-[#000000] font-bold text-[12px]`}>Số ghế</Text>
              </View>
              <View style={tw` w-1/3`}>
                <Text style={tw`text-[#000000] font-bold text-[12px]`}>Loại vé</Text>
              </View>
              <View style={tw` w-1/3`}>
                <Text style={tw`text-[#000000] font-bold text-[12px]`}>Đơn giá</Text>
              </View>
            </View>
            {order && order.lines && order?.lines.map(line => {
              return (
                <View style={tw`w-full flex-row items-center justify-start mt-3 border-b border-gray-300 py-3`}>
                  <View style={tw` w-1/3`}>
                    <Text style={tw`text-[#000000] text-[12px]`}>{line.name}</Text>
                  </View>
                  <View style={tw` w-1/3`}>
                    <Text style={tw`text-[#000000] text-[12px]`}>{line.loaive}</Text>
                  </View>
                  <View style={tw` w-1/3`}>
                    <Text style={tw`text-[#000000] text-[12px]`}>{line.dongia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Text>
                  </View>
                </View>
              )
            })}
            <View style={tw`flex-row items-start justify-start mt-5 w-full`}>
              <Text style={tw`text-[#000000] font-bold text-[12px]`}>Tổng cộng: </Text>
              <Text style={tw`text-[#9c1d21] font-bold text-[12px]`}>{(order.tongtien || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Text>
            </View>


            <View style={tw`flex-1 items-start justify-center mt-3 w-full`}>
              <Text style={tw`text-[#000000] text-[12px]`}>{order.luu_y}</Text>
            </View>
            <View style={tw`flex items-center justify-center mt-3 w-full`}>
              <Image
                resizeMode="contain"
                style={tw`h-[150px] w-[150px]`}
                source={{ uri: order?.qr }} />
            </View>
          </ScrollView>

        </View>
      </Modal>

      <ScrollView style={tw`flex-1 px-2`}>
        {ticketData.length == 0 && <Text style={tw`text-center text-[#000000] mt-5`}>Không có dữ liệu</Text>}
        {ticketData?.map((item, index) => (
          <TouchableOpacity onPress={() => onShowTicketDetail(item)} key={index} style={tw`w-full mt-3 px-2 bg-[#ffffff]`}>
            <Svg height="100%" width="20" viewBox="5 0 30 200" style={tw`absolute left-0`}>
              <Path
                d="M0,0 Q20,5 0,10 Q20,15 0,20 Q20,25 0,30 Q20,35 0,40 Q20,45 0,50 Q20,55 0,60 Q20,65 0,70 Q20,75 0,80 
               Q20,85 0,90 Q20,95 0,100 Q20,105 0,110 Q20,115 0,120 Q20,125 0,130 Q20,135 0,140 Q20,145 0,150 
               Q20,155 0,160 Q20,165 0,170 Q20,175 0,180 Q20,185 0,190 Q20,195 0,200"
                fill="#c9c9c9"
              />
            </Svg>
            <View style={tw`flex-1 p-2`}>
              <View style={tw`h-[30px] w-[30px] rounded-full bg-[#c9c9c9] absolute top-[33px] right-[-20px]`} />
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[12px] text-[#000000] font-semibold w-[80%]`}>{item.tenphim}</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[12px] text-[#4c4c4c] w-[80%] mt-1`}>{item.rapphim}</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[12px] text-[#4c4c4c] w-[80%] mt-1`}>{item.date_order}</Text>
              <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[12px] font-bold text-[#9c1d21] w-[80%] mt-1`}>{(item.tongtien || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} đ</Text>
            </View>
            <Svg height="100%" width="20" viewBox="0 0 1 200" style={tw`absolute right-0`}>
              <Path
                d="M20,0 Q0,5 20,10 Q0,15 20,20 Q0,25 20,30 Q0,35 20,40 Q0,45 20,50 Q0,55 20,60 Q0,65 20,70 Q0,75 20,80 
               Q0,85 20,90 Q0,95 20,100 Q0,105 20,110 Q0,115 20,120 Q0,125 20,130 Q0,135 20,140 Q0,145 20,150 
               Q0,155 20,160 Q0,165 20,170 Q0,175 20,180 Q0,185 20,190 Q0,195 20,200"
                fill="#c9c9c9"
              />
            </Svg>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.White,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  ticketContainer: {
    flex: 1,
  },
  ticketBGImage: {
    alignSelf: 'center',
    width: 300,
    aspectRatio: 200 / 300,
    borderTopLeftRadius: BORDERRADIUS.radius_25,
    borderTopRightRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  linearGradient: {
    height: '70%',
  },
  linear: {
    borderTopColor: COLORS.Black,
    borderTopWidth: 3,
    width: 300,
    alignSelf: 'center',
    backgroundColor: COLORS.Orange,
    borderStyle: 'dashed',
  },
  ticketFooter: {
    backgroundColor: COLORS.Orange,
    width: 300,
    alignItems: 'center',
    paddingBottom: SPACING.space_36,
    alignSelf: 'center',
    borderBottomLeftRadius: BORDERRADIUS.radius_25,
    borderBottomRightRadius: BORDERRADIUS.radius_25,
  },
  ticketDateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  ticketSeatContainer: {
    flexDirection: 'row',
    gap: SPACING.space_36,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.space_10,
  },
  dateTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
  },
  subtitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  subheading: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.White,
    paddingBottom: SPACING.space_10,
  },
  barcodeImage: {
    height: 50,
    aspectRatio: 158 / 52,
  },
  blackCircle: {
    height: 80,
    width: 80,
    borderRadius: 80,
    backgroundColor: COLORS.White,
  },
});

export default TicketScreen;
