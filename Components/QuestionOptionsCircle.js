import { View, Text, Animated, StyleSheet, Easing } from "react-native";
import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import QuestionCircle from "./QuestionCircle";
import Images from "./Images";
const QuestionOptionsCircle = (props) => {
  let xValue = new Animated.Value(0);
  let yValue = new Animated.Value(-200);
  let opacityAnimation = new Animated.Value(0);
  const opacityStyle = { opacity: opacityAnimation };
  startAnimation = () => {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      //easing: Easing.linear,
    }).start();
    Animated.timing(yValue, {
      toValue: 0,
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };
  const animatedStyles = {
    transform: [
      {
        translateY: yValue,
      },
    ],
  };
  useEffect(() => {
    startAnimation();
  });
  return (
    <Animated.View style={[opacityStyle, animatedStyles]} className="p-4">
      <Animated.View className="mx-auto ">
        <Circle image={Images.flight} />
      </Animated.View>
      <View className="justify-around flex-row ">
        <View className="">
          <Circle
            image={Images.chocolate}
            className="w-12  bg-red-300 rounded-full h-12"
          />
        </View>
        <View></View>
        <View className="">
          <Circle
            image={Images.burger}
            className="w-12 bg-red-300 rounded-full h-12"
          />
        </View>
      </View>
      <View className="flex-row  justify-around items-center">
        <View className="">
          <Circle image={Images.vacation} />
        </View>
        <QuestionCircle
          image1={Images.sunset}
          image2={Images.sunrise}
          style={props.style}
          question={"Which do you prefer to watch"}
        />
        <View className="">
          <Circle image={Images.coffee} />
        </View>
      </View>
      <View className="justify-around flex-row ">
        <View className="">
          <Circle
            image={Images.landscape}
            className="w-12 bg-red-300 rounded-full h-12"
          />
        </View>
        <View></View>
        <View className="">
          <Circle
            image={Images.scream}
            className="w-12 bg-red-300 rounded-full h-12"
          />
        </View>
      </View>
      <View className="mx-auto">
        <Circle
          image={Images.rain}
          className="w-12 bg-red-300 rounded-full h-12 mx-auto"
        />
      </View>
    </Animated.View>
  );
};

export default QuestionOptionsCircle;
