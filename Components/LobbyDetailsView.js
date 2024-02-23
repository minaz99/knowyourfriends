import { View, Text, Animated, Easing, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { Styles } from "../styles/Styles";
import { LinearGradient } from "expo-linear-gradient";
const LobbyDetailsView = (props) => {
  let yValueCreateJoin = new Animated.Value(-100);
  let yValue = new Animated.Value(0);
  let opacityAnimation = new Animated.Value(0);
  startAnimation = () => {
    Animated.timing(yValue, {
      toValue: -300,
      duration: 2000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      //easing: Easing.bounce,
    }).start();
  };
  const AS = {
    animatedStyles: {
      transform: [
        {
          translateY: yValue,
        },
      ],
    },

    opacityStyle: { opacity: opacityAnimation },
  };
  useEffect(() => {
    startAnimation();
  }, []);
  return (
    <LinearGradient
      className="  h-52 rounded-t-full  p-6 inset-x-0 bottom-0 absolute"
      colors={["#c71d6f", "#d09693"]}
    >
      <TouchableOpacity className="  h-52 rounded-t-lg  p-8 inset-x-0 bottom-0 absolute">
        <View className="space-y-3 items-center m-auto bottom-14 inset-x-0 absolute ">
          <View className="flex-row space-x-2">
            <Text className="text-white " style={Styles.headlines}>
              Game ID:
            </Text>
            <Text className="text-green-200 " style={Styles.headlines}>
              {props.id}
            </Text>
          </View>
          <View className="flex-row text-slate-600 space-x-2">
            <Text className="text-white " style={Styles.headlines}>
              Password:
            </Text>
            <Text className="text-green-200 " style={Styles.headlines}>
              {props.password}
            </Text>
          </View>
          <View className="flex-row text-slate-600 space-x-2">
            <Text style={Styles.headlines} className="text-white">
              Players joined:
            </Text>
            <Text className="text-green-200 " style={Styles.headlines}>
              {props.playersJoined}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default LobbyDetailsView;
