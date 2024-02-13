import { View, Text, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
const QuestionCircle = (props) => {
  return (
    <LinearGradient
      className="rounded-full mx-auto w-56 h-56"
      colors={["#a8edea", "#fed6e3"]}
    >
      <View className="mx-auto space-y-4 m-auto p-3.5">
        <Text
          style={props.style}
          className="text-slate-600 p-2 capitalize font-medium"
        >
          {props.question} ....
        </Text>
        <View className="space-x-2 items-center mx-auto  flex-row">
          <Image
            source={props.image1}
            className="rounded-full h-16 w-16"
          ></Image>
          <Text style={props.style} className="text-slate-600 text-lg">
            OR
          </Text>
          <Image
            source={props.image2}
            className="h-16 w-16 rounded-full"
          ></Image>
        </View>
      </View>
    </LinearGradient>
  );
};

export default QuestionCircle;
