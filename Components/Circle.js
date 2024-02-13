import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
const Circle = (props) => {
  return (
    <LinearGradient
      className="rounded-full  w-12 h-12"
      colors={["#a8edea", "#fed6e3"]}
    >
      <View className="m-auto ">
        <Image source={props.image} className="h-6 w-6"></Image>
      </View>
    </LinearGradient>
  );
};

export default Circle;
