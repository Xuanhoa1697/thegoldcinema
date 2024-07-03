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
  Animated
} from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import InputHeader from '../components/InputHeader';
import CategoryHeader from '../components/CategoryHeader';
import SubMovieCard from '../components/SubMovieCard';
import MovieCard from '../components/MovieCard';
import axios from 'axios';
import tw from "twrnc";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Carousel from "react-native-snap-carousel";
import CustomIcon from '../components/CustomIcon';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');
const SPACING1 = 10;
const ITEM_SIZE1 = Platform.OS === 'ios' ? width * 0.72 : width * 0.74;
const EMPTY_ITEM_SIZE = (width - ITEM_SIZE1) / 2;
const BACKDROP_HEIGHT = height * 0.65;

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
      url: `http://118.70.118.186:8070/web/api/v1/get_list_cinema`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: data
    };

    let response = await axios.request(config);
    const datas = await JSON.parse(JSON.stringify(response.data)).result;
    return datas
    // let response = await fetch(nowPlayingMovies);
    // let json = await response.json();
    // return json;
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
      url: `http://118.70.118.186:8070/web/api/v1/get_list_cinema`,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      data: data
    };

    let response = await axios.request(config);
    const datas = await JSON.parse(JSON.stringify(response.data)).result;
    // console.log('đangchieu', datas);

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
      url: `http://118.70.118.186:8070/web/api/v1/get_list_cinema`,
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

const HomeScreen = ({ navigation }: any) => {
  const [nowPlayingMoviesList, setNowPlayingMoviesList] = useState<any>(undefined);
  const [popularMoviesList, setPopularMoviesList] = useState<any>(undefined);
  const [upcomingMoviesList, setUpcomingMoviesList] = useState<any>(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingItem, setRefreshingItem] = useState(``);
  const [bgContent, setBgContent] = useState({});
  const scrollY = useRef(new Animated.Value(0)).current;
  const HEADER_HEIGHT = 80;

  useEffect(() => {
    (async () => {
      let tempNowPlaying = await getNowPlayingMoviesList();
      setNowPlayingMoviesList(tempNowPlaying.result);
      setBgContent(tempNowPlaying.result[0]);

      let tempPopular = await getPopularMoviesList();
      setPopularMoviesList(tempPopular.result);

      let tempUpcoming = await getUpcomingMoviesList();
      setUpcomingMoviesList(tempUpcoming.result);
    })();
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

    setRefreshingItem(`&${Math.random()}`);
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
    nowPlayingMoviesList == undefined &&
    nowPlayingMoviesList == null &&
    popularMoviesList == undefined &&
    popularMoviesList == null &&
    upcomingMoviesList == undefined &&
    upcomingMoviesList == null
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
          <Image style={tw`h-[55px] w-[100px]`}
            source={{ uri: `http://118.70.118.186:8070/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem` }}
            resizeMode='contain' />
        </View>

        <View style={tw`w-[30%] flex-row justify-end items-center`}>
          <TouchableOpacity onPress={() => navigation.navigate('TicketScreen')}>
            <MaterialCommunityIcons name="ticket-confirmation-outline" style={tw`mr-4`} size={36} color={'#9d2126'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserAccountScreen')}>
            <MaterialCommunityIcons name="format-list-bulleted" size={40} color={'#9d2126'} />
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView style={tw`h-full w-full`}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
            progressViewOffset={50}
            tintColor={COLORS.Orange} />
        }
      >
        <ImageBackground
          source={{ uri: `http://118.70.118.186:8070${bgContent?.image}` }}
          resizeMode="cover"
          style={tw`w-full`}
          blurRadius={10}>
          <View style={tw`flex-row items-start justify-between pt-4`}>
            <View style={tw`w-[30%] flex-row justify-start items-center`}>
              {/* <Entypo name="github" size={33} color={'#9c1d21'} /> */}
            </View>
            <View style={tw`w-[40%] flex-row justify-center items-center`}>
              <Image style={tw`h-[55px] w-[100px]`}
                source={{ uri: `http://118.70.118.186:8070/web/api/v1/get_background_app?image_type=logo&model=dm.diadiem` }}
                resizeMode='contain' />
            </View>

            <View style={tw`w-[30%] flex-row justify-end items-center`}>
              <TouchableOpacity onPress={() => navigation.navigate('TicketScreen')}>
                <MaterialCommunityIcons name="ticket-confirmation-outline" style={tw`mr-4`} size={36} color={'#ffffff'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('UserAccountScreen')}>
                <MaterialCommunityIcons name="format-list-bulleted" size={40} color={'#ffffff'} />
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
              renderItem={({ item, index }) => (
                <MovieCard
                  shoudlMarginatedAtEnd={true}
                  cardFunction={() => {
                    navigation.push('MovieDetails', { movieid: item.id });
                  }}
                  cardWidth={width * 0.7}
                  isFirst={index == 0 ? true : false}
                  isLast={index == nowPlayingMoviesList?.length - 1 ? true : false}
                  title={item.name}
                  imagePath={`http://118.70.118.186:8070${item.image}${refreshingItem}`}
                  // genre={item.genre_ids.slice(1, 4)}
                  vote_average={item.rate}
                  vote_count={item.rate}
                />
              )}
              firstItem={1}
              inactiveSlideScale={0.9}
              inactiveSlideOpacity={0.7}
              sliderWidth={width}
              itemWidth={width * 0.75}
              slideStyle={{ display: "flex", alignItems: "center" }}
            />
            <View style={tw`w-full flex-row justify-between px-4 items-center mt-7`}>
              <View style={tw``}>
                <Text numberOfLines={1} ellipsizeMode='tail' style={tw`text-[16px] font-bold text-white`}>{bgContent?.name}</Text>
                <View style={tw`flex-row items-center align-items-center mt-3`}>
                  <CustomIcon name="star" size={20} color={'#f5d53e'} />
                  <Text style={tw`text-[14px] text-white`}>{bgContent?.rate}</Text>
                  
                  <Text style={tw`text-[14px] text-white ml-5`}>⛔{bgContent?.old_limit}+</Text>
                  <Text style={tw`text-[14px] text-white ml-5 border border-[#f5d53e] rounded-[30px] px-2`}>{bgContent?.type}</Text>
                </View>
              </View>
              <TouchableOpacity style={tw`rounded-[30px] bg-[#9c1d21] px-4 py-1`}>
                <Text style={tw`text-[15px] font-bold text-white`}>ĐẶT VÉ</Text>
              </TouchableOpacity>
            </View>
          </LinearGradient>

        </ImageBackground>
        <View style={tw`bg-white`}>
          <CategoryHeader title={'Đang chiếu'} />
          <FlatList
            data={popularMoviesList}
            keyExtractor={(item: any) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.containerGap36}
            renderItem={({ item, index }) => (
              <SubMovieCard
                shoudlMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', { movieid: item.id });
                }}
                cardWidth={width / 3}
                isFirst={index == 0 ? true : false}
                isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                title={item.name}
                imagePath={`http://118.70.118.186:8070${item.image}${refreshingItem}`}
              />
            )}
          />
          <CategoryHeader title={'Sắp chiếu'} />
          <FlatList
            data={upcomingMoviesList}
            keyExtractor={(item: any) => item.id}
            horizontal
            bounces={false}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.containerGap36}
            renderItem={({ item, index }) => (
              <SubMovieCard
                shoudlMarginatedAtEnd={true}
                cardFunction={() => {
                  navigation.push('MovieDetails', { movieid: item.id });
                }}
                cardWidth={width / 3}
                isFirst={index == 0 ? true : false}
                isLast={index == upcomingMoviesList?.length - 1 ? true : false}
                title={item.name}
                imagePath={`http://118.70.118.186:8070${item.image}${refreshingItem}`}
              />
            )}
          />
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
    height: 80,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 1000,
  },
});

export default HomeScreen;
