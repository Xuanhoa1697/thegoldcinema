import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { baseImagePath, movieCastDetails, movieDetails } from '../api/apicalls';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import AppHeader from '../components/AppHeader';
import LinearGradient from 'react-native-linear-gradient';
import CustomIcon from '../components/CustomIcon';
import CategoryHeader from '../components/CategoryHeader';
import CastCard from '../components/CastCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import tw from "twrnc";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";

// const getMovieDetails = async (movieid: number) => {
//   try {
//     let response = await fetch(movieDetails(movieid));
//     let json = await response.json();
//     return json;
//   } catch (error) {
//     console.error('Something Went wrong in getMoviesDetails Function', error);
//   }
// };

// const getMovieCastDetails = async (movieid: number) => {
//   try {
//     let response = await fetch(movieCastDetails(movieid));
//     let json = await response.json();
//     return json;
//   } catch (error) {
//     console.error(
//       'Something Went wrong in getMovieCastDetails Function',
//       error,
//     );
//   }
// };

const MovieDetailsScreen = ({ navigation, route }: any) => {
  const movie = route.params.movie
  const [numberOfLines, setNumberOfLines] = useState(3)
  console.log(movie);

  useEffect(() => {
    // (async () => {
    //   const tempMovieData = await getMovieDetails(route.params.movieid);
    //   setMovieData(tempMovieData);
    // })();

    // (async () => {
    //   const tempMovieCastData = await getMovieCastDetails(route.params.movieid);
    //   setmovieCastData(tempMovieCastData.cast);
    // })();
  }, []);

  // if (
  //   movieData == undefined &&
  //   movieData == null &&
  //   movieCastData == undefined &&
  //   movieCastData == null
  // ) {
  //   return (
  //     <ScrollView
  //       style={styles.container}
  //       contentContainerStyle={styles.scrollViewContainer}
  //       bounces={false}
  //       showsVerticalScrollIndicator={false}>
  //       <View style={styles.appHeaderContainer}>
  //         <AppHeader
  //           name="close"
  //           header={''}
  //           action={() => navigation.goBack()}
  //         />
  //       </View>
  //       <View style={styles.loadingContainer}>
  //         <ActivityIndicator size={'large'} color={COLORS.Orange} />
  //       </View>
  //     </ScrollView>
  //   );
  // }

  const checkLogin = async () => {
    const email_user = await AsyncStorage.getItem('email_user');
    const password_user = await AsyncStorage.getItem('password_user');
    
    if (!email_user || !password_user) {
      navigation.navigate('LoginScreen');
    }else{
      navigation.navigate('DetaiCinemaScreen', {
        movieid: movie?.id,
        movieName: movie?.name,
      })
    }
  }

  return (
    <ScrollView
      style={styles.container}
      bounces={false}
      showsVerticalScrollIndicator={false}>
      <StatusBar
        translucent={false}
        backgroundColor={'#000000'}
        barStyle={'default'}
      />

      <View>
        <ImageBackground
          source={{
            uri: `http://118.70.118.186:8070/web/api/v1/get_background_app?image_type=hinhanh&model=dm.phim&res_id=${movie.id}`,
          }}
          style={styles.imageBG}
          resizeMode='cover'>
          <LinearGradient
            style={tw`h-full flex items-center justify-center`}
            colors={[COLORS.BlackRGB10, COLORS.Black]}
          >
            {movie?.trailer && <TouchableOpacity style={tw`mb-10`} onPress={() => navigation.push('TrailerScreen', { trailer: movie?.trailer })}>
              <AntDesign name="play" size={40} color={'#ffffff'} />
            </TouchableOpacity>}
            <View style={tw`absolute left-3 top-5`}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={33} color={'#ffffff'} />
              </TouchableOpacity>
            </View>
            <View style={tw`absolute bottom-0 left-33`}>
              <Text style={tw`mt-15 mb-5 text-white font-semibold text-[18px] text-center`} >{movie?.name.toUpperCase()}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
        <Image
          source={{ uri: `http://118.70.118.186:8070/web/api/v1/get_background_app?image_type=hinhanh&model=dm.phim&res_id=${movie.id}` }}
          style={styles.cardImage}
        />
      </View>

      <View style={tw`ml-33`}>
        <View style={styles.timeContainer}>
          <View style={tw`flex-row border border-gray-400 py-0.6 px-0.6 rounded-1 px-1`}>
            <CustomIcon name="clock" style={styles.clockIcon} />
            <Text style={tw`text-[#9c9c9c]`}>
              {Math.floor(movie?.time / 60)} giờ{' '}
              {Math.floor(movie?.time % 60)} phút
            </Text>
          </View>
          <View style={tw`flex-row border border-gray-400 py-0.6 px-0.7 rounded-1 ml-3`}>
            <EvilIcons name="calendar" size={28} color={COLORS.Black} />
            <Text style={tw`text-[#9c9c9c]`}>
              {movie?.date_start.replaceAll('-', '/')}
            </Text>
          </View>
        </View>
        <View style={tw`flex-row mt-2`}>
          <CustomIcon name="star" style={styles.starIcon} />
          <Text style={styles.runtimeText}>{movie?.rate}</Text>
          <Text style={tw`text-[14px] text-[#9d2126] ml-5`}>⛔ {movie?.old_limit}+</Text>
          
        </View>
      </View>

      <View style={tw`mt-5 mx-4`}>
        <Text ellipsizeMode='tail' numberOfLines={numberOfLines} style={styles.descriptionText}>{movie?.content.replaceAll('<p>', '').replaceAll('</p>', '')}</Text>
        {numberOfLines == 3 && <TouchableOpacity onPress={() => setNumberOfLines(100)}>
          <Text style={tw`text-[#9d2126]`}>Xem thêm</Text>
        </TouchableOpacity>}
        <View style={tw`flex-row mt-3`}>
          <Text style={tw`text-[14px] text-[#000000] font-semibold w-[20%]`}>Thể loại</Text>
          <Text style={tw`text-[14px] text-[#000000] ml-15 px-2`}>{movie?.type}</Text>
        </View>
        <View style={tw`flex-row mt-2`}>
          <Text style={tw`text-[14px] text-[#000000] font-semibold w-[20%]`}>Đạo diễn</Text>
          <Text style={tw`text-[14px] text-[#000000] ml-15 px-2`}>{movie?.daoien}</Text>
        </View>
        <View style={tw`flex-row mt-2`}>
          <Text style={tw`text-[14px] text-[#000000] font-semibold w-[20%]`}>Diễn viên</Text>
          <Text style={tw`text-[14px] text-[#000000] ml-15 px-2`}>{movie?.dienvien}</Text>
        </View>
        <View style={tw`flex-row mt-2`}>
          <Text style={tw`text-[14px] text-[#000000] font-semibold w-[20%]`}>Ngôn ngữ</Text>
          <Text style={tw`text-[14px] text-[#000000] ml-15 px-2`}>{movie?.lang}</Text>
        </View>
      </View>

      <View>
        <View style={tw`px-3`}>
          <TouchableOpacity
            style={tw`bg-[#9d2126] rounded-5 text-white w-full text-center py-2.5 my-5`}
            onPress={checkLogin}>
            <Text style={tw`text-white w-full text-center`}>Đặt Vé</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: COLORS.White,
  },
  loadingContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  imageBG: {
    width: '100%',
    aspectRatio: 3072 / 2000,
  },
  linearGradient: {
    height: '100%',
  },
  cardImage: {
    width: '25%',
    aspectRatio: 200 / 300,
    position: 'absolute',
    top: 200,
    left: 10,
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: COLORS.White,
  },
  clockIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Black,
    marginRight: SPACING.space_8,
  },
  timeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: SPACING.space_15,
  },
  runtimeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_24,
    color: COLORS.Black,
    marginHorizontal: SPACING.space_36,
    textAlign: 'center',
  },
  genreContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: SPACING.space_20,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  genreBox: {
    borderColor: COLORS.WhiteRGBA50,
    borderWidth: 1,
    paddingHorizontal: SPACING.space_10,
    paddingVertical: SPACING.space_4,
    borderRadius: BORDERRADIUS.radius_25,
  },
  genreText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_10,
    color: COLORS.WhiteRGBA75,
  },
  tagline: {
    fontFamily: FONTFAMILY.poppins_thin,
    fontSize: FONTSIZE.size_14,
    fontStyle: 'italic',
    color: COLORS.White,
    marginHorizontal: SPACING.space_36,
    marginVertical: SPACING.space_15,
    textAlign: 'center',
  },
  infoContainer: {
    marginHorizontal: SPACING.space_24,
  },
  rateContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  starIcon: {
    fontSize: FONTSIZE.size_20,
    color: COLORS.Yellow,
  },
  descriptionText: {
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
  },
  containerGap24: {
    gap: SPACING.space_24,
  },
  buttonBG: {
    alignItems: 'center',
    marginVertical: SPACING.space_24,
  },
  buttonText: {
    borderRadius: BORDERRADIUS.radius_25 * 2,
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_10,
    backgroundColor: COLORS.Orange,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
});

export default MovieDetailsScreen;
