import { View, Text, Image, Animated, Easing } from "react-native";
import React, { useEffect } from "react";
import { LinearGradient } from "expo-linear-gradient";
const QuestionCircle = (props) => {
  let yValue = new Animated.Value(-120);
  let opacityAnimation = new Animated.Value(0);
  startAnimation = () => {
    Animated.timing(yValue, {
      toValue: 0,
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
    }).start();
  };
  const animatedStyles = {
    transform: [
      {
        translateY: yValue,
      },
    ],
    opacity: opacityAnimation,
  };
  startAnimation();
  useEffect(() => {
    startAnimation();
  }, [props.data]);
  return (
    <Animated.View
      style={[props.opacityStyle, props.animatedStyles]}
      className=""
    >
      <LinearGradient
        className="rounded-full flex items-center justify-center p-2 text-center w-56 h-56  m-auto"
        colors={["#a8edea", "#fed6e3"]}
      >
        <Animated.View style={animatedStyles}>
          <Text
            style={props.style}
            className="text-slate-600 p-2 capitalize font-medium"
          >
            {props.data.question} ....
          </Text>
          <View className="space-x-2 items-center mx-auto  flex-row">
            <Image
              source={props.data.img1}
              className="rounded-full h-16 w-16"
            ></Image>
            <Text style={props.style} className="text-slate-600 text-lg">
              OR
            </Text>
            <Image
              source={props.data.img2}
              className="h-16 w-16 rounded-full"
            ></Image>
          </View>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
};

export default QuestionCircle;
