import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
const Card = (props) => {
  return (
    <TouchableOpacity
      style={{ backgroundColor: props.color }}
      className="items-center rounded-lg h-40 w-fit  p-6"
    >
      <Text className="tracking-widest text-center font-bold text-lg text-white">
        {props.option}
      </Text>
      <View className="pt-4">
        <Image source={props.image} className="h-14 w-14"></Image>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
