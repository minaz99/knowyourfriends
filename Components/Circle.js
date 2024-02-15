import { View, Text, Image, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const Circle = (props) => {
  let rotateAnimation = new Animated.Value(0);
  const [animationStopped, setAnimationStopped] = useState(false);
  const handleAnimation = () => {
    setAnimationStopped(false);
    Animated.timing(rotateAnimation, {
      toValue: 10000,
      duration: 40000,
      useNativeDriver: true,
    }).start(() => {
      rotateAnimation.setValue(0);
      setAnimationStopped(true);
    });
  };

  const interpolateRotating = rotateAnimation.interpolate({
    inputRange: [0, 2000],
    outputRange: ["0deg", "720deg"],
  });

  const animatedStyle = {
    transform: [
      {
        rotate: interpolateRotating,
      },
    ],
  };
  useEffect(() => {
    handleAnimation();
  }, [animationStopped]);
  return (
    <LinearGradient
      className="rounded-full  w-12 h-12"
      colors={["#a8edea", "#fed6e3"]}
    >
      <Animated.View className="m-auto " style={animatedStyle}>
        <Image source={props.image} className="h-6 w-6"></Image>
      </Animated.View>
    </LinearGradient>
  );
};

export default Circle;
