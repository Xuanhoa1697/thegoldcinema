import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  FlatList,
  RefreshControl,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Platform,
  Animated,
  BackHandler,
  Alert,
  Linking
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import tw from "twrnc";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entipo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Carousel from "react-native-snap-carousel";
import CustomIcon from '../components/CustomIcon';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get('window');
const ITEM_SIZE1 = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;

const getNowPlayingMoviesList = async () => {
  try {
    let data = JSON.stringify({
      "jsonrpc": "2.0",
      "method": "call",
      "params": {
        "using": true,
        "outstanding": [true],
        "status": ['dangchieu', 'sapchieu']
      }
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      mode: 'no-cors',
      url: `http://125.253.121.150:8069/web/api/v1/get_list_cinema`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: data
    };

    let response = await axios.request(config);
    const datas = await JSON.parse(JSON.stringify(response.data)).result;
    return datas
  } catch (error) {
    console.error(
      ' Something went wrong in getNowPlayingMoviesList Function',
      error,
    );
  }
};

const getUpcomingMoviesList = async () => {
  try {
    let data = JSON.stringify({
      "jsonrpc": "2.0",
      "method": "call",
      "params": {
        "using": true,
        "outstanding": [false, true],
        "status": ['sapchieu']
      }
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      mode: 'no-cors',
      url: `http://125.253.121.150:8069/web/api/v1/get_list_cinema`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: data
    };

    let response = await axios.request(config);
    const datas = await JSON.parse(JSON.stringify(response.data)).result;

    return datas
  } catch (error) {
    console.error(
      ' Something went wrong in getUpcomingMoviesList Function',
      error,
    );
  }
};

const getPopularMoviesList = async () => {
  try {
    let data = JSON.stringify({
      "jsonrpc": "2.0",
      "method": "call",
      "params": {
        "using": true,
        "outstanding": [false, true],
        "status": ['dangchieu']
      }
    });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      mode: 'no-cors',
      url: `http://125.253.121.150:8069/web/api/v1/get_list_cinema`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: data
    };

    let response = await axios.request(config);
    const datas = await JSON.parse(JSON.stringify(response.data)).result;
    return datas
  } catch (error) {
    console.error(
      ' Something went wrong in getPopularMoviesList Function',
      error,
    );
  }
};

const get_list_blog_post = async () => {
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
      url: `http://125.253.121.150:8069/web/api/v1/blogpost`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: data
    };

    let response = await axios.request(config);
    const datas = await JSON.parse(JSON.stringify(response.data)).result;
    return datas.data
  } catch (error) {

    console.error(
      ' Something went wrong in BlogPost Function',
      error,
    );

    return []
  }
};

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);
  const [blogPost, setBlogPost] = useState<any>(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingItem, setRefreshingItem] = useState(``);
  const [bgContent, setBgContent] = useState({});
  const scrollY = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const lastOffsetY = useRef(0);
  const scrollDirection = useRef('');
  const HEADER_HEIGHT = 75;

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList(tempNowPlaying.result);
      setBgContent(tempNowPlaying.result[0]);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.result);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcoming.result);

      let temp_blog = await get_list_blog_post();
      setBlogPost(temp_blog);
    })();
    const backAction = () => {
      Alert.alert('Đợi chút!', 'Bạn có muốn thoát khỏi ứng dụng?', [
        {
          text: 'HỦY',
          onPress: () => null,
          style: 'cancel',
        },
        { text: 'ĐÔNG Ý', onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  const onRefresh = async () => {
    // return
    setRefreshing(true);
    let tempNowPlaying = await getNowPlayingMoviesList();
    setNowPlayingMoviesList(tempNowPlaying.result);
    setBgContent(tempNowPlaying.result[0]);

    let tempPopular = await getPopularMoviesList();
    setPopularMoviesList(tempPopular.result);

    let tempUpcoming = await getUpcomingMoviesList();
    setUpcomingMoviesList(tempUpcoming.result);

    setRefreshingItem(`${Math.random()}`);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const searchMoviesFunction = () => {
    navigation.navigate('Search');
  };

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [-HEADER_HEIGHT, 0],
    extrapolate: 'clamp',
  });

  if (
    !nowPlayingMoviesList &&
    !popularMoviesList &&
    !upcomingMoviesList
  ) {
    return (
      <ScrollView
        style={styles.container}
        bounces={false}
        contentContainerStyle={styles.scrollViewContainer}>
        <StatusBar hidden />

        <View style={styles.InputHeaderContainer}>
          <InputHeader searchFunction={searchMoviesFunction} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size={'large'} color={COLORS.Orange} />
        </View>
      </ScrollView>
    );
  }

  const checkLogin = async () => {
    const user_info = await AsyncStorage.getItem('user_info');
    if (!user_info) {
      navigation.navigate('LoginScreen');
    } else {
      navigation.navigate('UserAccountScreen');
    }
  }

  return (
    <SafeAreaView style={tw`h-full w-full`}>
      {/* <StatusBar hidden /> */}
      <StatusBar
        translucent={false}
        backgroundColor={'#000000'}
        barStyle={'default'}
      />
      <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslate }] },
      tw`flex-row items-start justify-between pt-4`]}>
        <View style={tw`w-[30%] flex-row justify-start items-center`}>
          {/* <Entypo name="github" size={33} color={'#9c1d21'} /> */}
        </View>
        <View style={tw`w-[40%] flex-row justify-center items-center`}>
          <Image style={tw`h-[45px] w-[100px]`}
            source={{ uri: `http://125.253.121.150:8069/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem` }}
            resizeMode='contain' />
        </View>

        <View style={tw`w-[30%] flex-row justify-end items-center pr-2`}>
          <TouchableOpacity onPress={() => navigation.navigate('TicketScreen')}>
            <Image source={require('../assets/image/cash.png')} style={tw`h-[35px] w-[45px] mr-3`} />
            {/* <MaterialCommunityIcons name="ticket-confirmation-outline" style={tw`mr-3`} size={30} color={'#9d2126'} /> */}
          </TouchableOpacity>
          <TouchableOpacity onPress={checkLogin}>
            <MaterialCommunityIcons name="menu" size={35} color={'#9d2126'} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView style={tw`h-full w-full`}
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          {
            useNativeDriver: true,
            listener: event => {
              const offsetY = event.nativeEvent.contentOffset.y;
              scrollDirection.current =
                offsetY - lastOffsetY.current > 0 ? 'down' : 'up';
              lastOffsetY.current = offsetY;
            },
          },
        )}
        onScrollEndDrag={({ }) => {

          if (scrollDirection.current === 'down' && lastOffsetY.current < 50) {
            scrollViewRef.current?.scrollTo({ y: scrollDirection.current === 'down' ? 100 : 0, animated: true });
          }
          // else if (scrollDirection.current === 'down' && lastOffsetY.current > 100) {
          //   scrollViewRef.current?.scrollTo({ y: scrollDirection.current === 'down' ? lastOffsetY.current + 100 : 0, animated: true });
          // }
        }}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
            progressViewOffset={50}
            tintColor={COLORS.Orange} />
        }
      >
        <ImageBackground
          source={{ uri: `http://125.253.121.150:8069/web/api/v1/get_background_app?image_type=img_app&model=dm.diadiem` }}
          resizeMode="cover"
          style={tw`w-full`}
          blurRadius={3}>
          <View style={tw`flex-row items-start justify-between pt-4 h-[65px]`}>
            <View style={tw`w-[30%] flex-row justify-start items-center`}>
              {/* <Entypo name="github" size={33} color={'#9c1d21'} /> */}
            </View>
            <View style={tw`w-[40%] flex-row justify-center items-center`}>
              <Image style={tw`h-[45px] w-[100px]`}
                source={{ uri: `http://125.253.121.150:8069/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem` }}
                resizeMode='contain' />
            </View>

            <View style={tw`w-[30%] flex-row justify-end items-center pr-2`}>
              <TouchableOpacity onPress={() => navigation.navigate('TicketScreen')}>
                {/* <MaterialCommunityIcons name="ticket-confirmation-outline" style={tw`mr-3`} size={30} color={'#ffffff'} /> */}
                <Image source={require('../assets/image/cash.png')} style={tw`h-[35px] w-[45px] mr-3`} />
              </TouchableOpacity>
              <TouchableOpacity onPress={checkLogin}>
                <MaterialCommunityIcons name="menu" size={35} color={'#ffffff'} />
              </TouchableOpacity>
            </View>
          </View>
          <LinearGradient
            style={tw`pb-5`}
            colors={[COLORS.BlackRGB10, COLORS.Black]}
          >
            <Carousel
              onSnapToItem={(index) => {
                setBgContent(nowPlayingMoviesList[index]);
              }}
              data={nowPlayingMoviesList}
              autoplay={true}
              loop={true}
              enableSnap={true}
              autoplayInterval={5000}
              swipeThreshold={10}
              decelerationRate="fast"
              enableMomentum={false}
              lockScrollWhileSnapping={true}

              renderItem={({ item, index }) => (
                <MovieCard
                  shoudlMarginatedAtEnd={true}
                  cardFunction={() => {
                    navigation.push('MovieDetails', { movie: item });
                  }}
                  cardWidth={width * 0.6}
                  isFirst={index == 0 ? true : false}
                  isLast={index == nowPlayingMoviesList?.length - 1 ? true : false}
                  title={item.name}
                  imagePath={`http://125.253.121.150:8069${item.image}&time=${refreshingItem}`}
                  // genre={item.genre_ids.slice(1, 4)}
                  // vote_average={item.rate}
                  vote_count={item.nsx}
                />
              )}
              firstItem={0}
              inactiveSlideScale={0.65}
              // inactiveSlideShift={10}
              inactiveSlideOpacity={1}
              sliderWidth={width}
              itemWidth={width / 1.7}
              slideStyle={{ display: "flex", alignItems: "center" }}
            />
            <View style={tw`w-full flex-row justify-between px-4 items-center mt-7`}>
              <View style={tw`w-[70%]`}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[12px] font-bold text-white w-[100%]`}>{bgContent?.name}</Text>
                <View style={tw`flex-row items-center justify-start mt-3`}>
                  {bgContent?.type && <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[12px] text-white mr-2 text-center border border-[#f5d53e] rounded-[30px] px-2 w-[80px]`}>{bgContent?.type}</Text>}
                  <Text ellipsizeMode='tail' numberOfLines={1} style={tw`text-[12px] text-white w-[60%]`}>⛔{bgContent?.old_limit}</Text>

                </View>
              </View>
              <TouchableOpacity style={tw`rounded-[30px] bg-[#9c1d21] px-4 py-1`}
                onPress={() => navigation.push('MovieDetails', { movie: bgContent })}>
                <Text style={tw`text-[12px] text-white`}>ĐẶT VÉ</Text>
              </TouchableOpacity>

            </View>
          </LinearGradient>

        </ImageBackground>
        <View style={tw`h-[50px] pl-2 pr-4`}>
          <TouchableOpacity style={tw`flex-row justify-between items-center h-full`}
            onPress={() => navigation.navigate('CinemaHomeScreen')}>
            <Text style={tw`text-[12px] text-[#c9c9c9]`}>Tìm rạp gần bạn...</Text>
            <Feather name="send" size={18} color={'#c9c9c9'} />
          </TouchableOpacity>
        </View>
        <View style={tw`bg-white`}>
          {popularMoviesList && popularMoviesList.length > 0 && <CategoryHeader title={'Đang chiếu'} />}
          <Carousel
            data={popularMoviesList}
            loop={true}
            renderItem={({ item, index }) => (
              <SubMovieCard
                shoudlMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', { movie: item });
                }}
                cardWidth={width / 3.5}
                isFirst={index == 0 ? true : false}
                isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                title={item.name}
                imagePath={`http://125.253.121.150:8069${item.image}&time=${refreshingItem}`}
              />
            )}
            firstItem={1}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            sliderWidth={width}
            itemWidth={width / 3.7 + 16}
            slideStyle={{ display: "flex", alignItems: "center" }}
          />
          {upcomingMoviesList && upcomingMoviesList.length > 0 && <CategoryHeader title={'Sắp chiếu'} />}
          <Carousel
            data={upcomingMoviesList}
            loop={true}
            renderItem={({ item, index }) => (
              <SubMovieCard
                shoudlMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', { movie: item });
                }}
                cardWidth={width / 3.5}
                isFirst={index == 0 ? true : false}
                isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                title={item.name}
                imagePath={`http://125.253.121.150:8069${item.image}&time=${refreshingItem}`}
              />
            )}
            firstItem={1}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
            sliderWidth={width}
            itemWidth={width / 3.7 + 16}
            slideStyle={{ display: "flex", alignItems: "center" }}
          />
        </View>
        <View style={tw`w-full flex-row items-center justify-between mt-3 pr-2`}>
          <CategoryHeader title={'Bài viết'}/>
          <TouchableOpacity
            onPress={() => Linking.openURL('https://thegoldcinema.com/blog')}
            activeOpacity={1} style={tw`px-2 border border-[#9d2126] rounded-full`}>
            <Text style={tw`text-[12px] text-[#9d2126]`}>Tất cả</Text>
          </TouchableOpacity>
        </View>
        <View style={tw`w-full px-2`}>
          <TouchableOpacity activeOpacity={1} style={tw`h-[140px] w-[50%]`}>
              <Image resizeMode="cover" source={{uri: `https://thegoldcinema.com/web/image/12942/ob.jpg`}} style={tw`w-full rounded-1 h-[100px]`} />
              <Text numberOfLines={2} ellipsizeMode='tail' style={tw`text-[12px] text-black mt-1`}>Hướng dẫn đặt vé trước và kiểm tra vé đã đặt trên website</Text>
          </TouchableOpacity>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // backgroundColor: COLORS.Black,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.75)'
  },
  scrollViewContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  InputHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_28,
  },
  containerGap36: {
    gap: SPACING.space_36,
  },
  // loadingContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // container: {
  //   flex: 1,
  // },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  posterImage: {
    width: '100%',
    height: ITEM_SIZE1 * 1.2,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
  },
  linearGradient: {
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1000,
  },
});

export default HomeScreen;
