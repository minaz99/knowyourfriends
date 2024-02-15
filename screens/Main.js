import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
//import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import QuestionOptionsCircle from "../Components/QuestionOptionsCircle";

const Main = ({ navigation }) => {
  let yValueCreateJoin = new Animated.Value(-100);
  let yValue = new Animated.Value(-120);
  let opacityAnimation = new Animated.Value(0);
  const opacityStyle = { opacity: opacityAnimation };
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
      //easing: Easing.bounce,
    }).start();
    Animated.timing(yValueCreateJoin, {
      toValue: 0,
      duration: 1500,
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
  const animatedStylesBtns = {
    transform: [
      {
        translateY: yValueCreateJoin,
      },
    ],
  };
  startAnimation();
  let [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_700Bold,
  });
  /*if (!fontsLoaded && !fontError) {
    return null;
  }*/
  const styles = StyleSheet.create({
    title: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 20,
      letterSpacing: 5,
    },
    question: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 11,
      letterSpacing: 3,
    },
    headlines: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 17,
      letterSpacing: 4,
    },
    inlines: {
      fontFamily: "Inter_600SemiBold",
      fontSize: 15,
      letterSpacing: 3,
    },
  });
  //const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const images = {
    burger: require("../src/burger.png"),
    sunset: require("../src/sunset-.png"),
    sunrise: require("../src/sunrise.png"),
    chocolate: require("../src/chocolate.png"),
    coffee: require("../src/coffee-beans.png"),
    comedy: require("../src/comedy.png"),
    flight: require("../src/flight.png"),
    landscape: require("../src/landscape.png"),
    pizza: require("../src/pizza.png"),
    rain: require("../src/rain.png"),
    scream: require("../src/scream.png"),
    tea: require("../src/tea-bag.png"),
    train: require("../src/train.png"),
    vacation: require("../src/vacations.png"),
  };
  return (
    <LinearGradient colors={["#df89b5", "#bfd9fe"]}>
      <SafeAreaView className="h-full  ">
        <View className="space-y-6">
          <Animated.Text
            style={[styles.title, animatedStyles]}
            numberOfLines={2}
            className=" text-center mt-6 text-slate-600"
          >
            Do you know your friends
          </Animated.Text>

          <View>
            <QuestionOptionsCircle style={styles.question} images={images} />
          </View>
        </View>
        <View className="m-auto space-y-6 mx-auto">
          <Animated.View
            style={[opacityStyle, animatedStyles, animatedStylesBtns]}
            className="flex-row"
          >
            <LinearGradient
              className="rounded-l-full"
              colors={["#1e3c72", "#2a5298"]}
            >
              <TouchableOpacity
                className="p-6"
                onPress={() =>
                  navigation.navigate("Create", {
                    title: styles.title,
                    headlines: styles.headlines,
                    inlines: styles.inlines,
                  })
                }
              >
                <Text className="text-white text-md tracking-widest font-bold text-center">
                  CREATE
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              className="rounded-r-full"
              colors={["#ff758c", "#ff7eb3"]}
            >
              <TouchableOpacity
                className=" p-6"
                onPress={() => navigation.navigate("Join")}
              >
                <Text className="text-white text-md tracking-widest font-bold text-center">
                  JOIN
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
          <Animated.View
            style={[opacityStyle, animatedStyles, animatedStylesBtns]}
          >
            <LinearGradient
              className="rounded-full"
              colors={["#fdfbfb", "#ebedee"]}
            >
              <TouchableOpacity className=" p-6">
                <Text className="text-slate-600  text-md tracking-widest font-bold text-center">
                  GAME RULES
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Main;
