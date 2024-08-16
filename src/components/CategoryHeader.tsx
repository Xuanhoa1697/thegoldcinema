import React from 'react';
import {Text, StyleSheet} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import tw from "twrnc";

const CategoryHeader = (props: any) => {
  return <Text style={[styles.text, tw`text-[13.5px]`]}>{props.title}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.Black,
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_12,
    paddingTop: SPACING.space_10,
  },
});

export default CategoryHeader;
