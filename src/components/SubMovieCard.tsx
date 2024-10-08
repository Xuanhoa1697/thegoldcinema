import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import tw from "twrnc";

const SubMovieCard = (props: any) => {
  return (
    <TouchableOpacity  activeOpacity={1} onPress={() => props.cardFunction()}>
      <View
        style={[
          styles.container,
          props.shouldMarginatedAround ? {margin: SPACING.space_12} : {},
          {maxWidth: props.cardWidth},
        ]}>
        <Image
          style={[styles.cardImage, {width: props.cardWidth}]}
          source={{uri: props.imagePath}}
          resizeMode='center'
        />
        <Text numberOfLines={1} style={[styles.textTitle, tw`text-[12px]`]}>
          {props.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    // flex: 1,
    orderRadius: 15,
    backgroundColor: COLORS.WhiteRGBA15,
  },
  cardImage: {
    aspectRatio: 2 / 3,
    borderRadius: BORDERRADIUS.radius_8,
  },
  textTitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
    textAlign: 'center',
    paddingVertical: SPACING.space_10,
  },
});

export default SubMovieCard;
