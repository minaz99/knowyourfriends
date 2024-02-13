import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts, Inter_600SemiBold } from "@expo-google-fonts/inter";
import QuestionOptionsCircle from "../Components/QuestionOptionsCircle";

const Main = () => {
  let [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
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
  });
  const navigation = useNavigation();
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
      <SafeAreaView className="h-full">
        <Text
          style={styles.title}
          numberOfLines={1}
          className=" my-6 underline  text-center text-slate-600"
        >
          Do you know your friends
        </Text>

        <QuestionOptionsCircle style={styles.question} images={images} />
        <View className="m-auto space-y-3 mx-auto">
          <TouchableOpacity
            style={{ backgroundColor: "#506864" }}
            className="rounded-lg p-6"
            onPress={() => navigation.navigate("Home")}
          >
            <Text className="text-white text-md tracking-widest font-bold text-center">
              PLAY
            </Text>
          </TouchableOpacity>
          <LinearGradient
            className="rounded-full"
            colors={["#ff758c", "#ff7eb3"]}
          >
            <TouchableOpacity className=" p-6">
              <Text className="text-white  text-md tracking-widest font-bold text-center">
                GAME RULES
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Main;
