import { View, Text } from "react-native";
import React from "react";
import Circle from "./Circle";
import QuestionCircle from "./QuestionCircle";

const QuestionOptionsCircle = (props) => {
  return (
    <View className="p-4">
      <View className="mx-auto">
        <Circle image={props.images.flight} />
      </View>
      <View className="justify-around flex-row ">
        <Circle
          image={props.images.chocolate}
          className="w-12  bg-red-300 rounded-full h-12"
        />
        <View></View>
        <Circle
          image={props.images.burger}
          className="w-12 bg-red-300 rounded-full h-12"
        />
      </View>
      <View className="flex-row  justify-around items-center">
        <View className="">
          <Circle image={props.images.vacation} />
        </View>
        <QuestionCircle
          image1={props.images.sunset}
          image2={props.images.sunrise}
          style={props.style}
          question={"Which do you prefer to watch"}
        />
        <View className="">
          <Circle image={props.images.coffee} />
        </View>
      </View>
      <View className="justify-around flex-row ">
        <Circle
          image={props.images.landscape}
          className="w-12 bg-red-300 rounded-full h-12"
        />
        <View></View>
        <Circle
          image={props.images.scream}
          className="w-12 bg-red-300 rounded-full h-12"
        />
      </View>
      <View className="mx-auto">
        <Circle
          image={props.images.rain}
          className="w-12 bg-red-300 rounded-full h-12 mx-auto"
        />
      </View>
    </View>
  );
};

export default QuestionOptionsCircle;
