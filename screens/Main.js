import { View, Text, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import Card from "../Components/Card";
const Main = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  const images = {
    burger: require("../src/burger.png"),
    pizza: require("../src/pizza.png"),
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#92BDB5" }} className="h-full ">
      <Text className="p-12 text-center font-bold text-xl tracking-widest text-white">
        Do you know your friends
      </Text>

      <View className="flex-row space-x-6 mx-auto">
        <Card color="#9F92BD" option={"Burger"} image={images.burger} />
        <Text className="font-bold  m-auto pr-4 text-white text-lg tracking-widest">
          OR
        </Text>
        <Card color="#BD929A" option={"Pizza"} image={images.pizza} />
      </View>
      <View className="space-y-3 my-24 mx-auto">
        <TouchableOpacity
          style={{ backgroundColor: "#506864" }}
          className="rounded-lg p-6"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-white text-md tracking-widest font-bold text-center">
            PLAY
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ backgroundColor: "#AFBD92" }}
          className="rounded-lg p-6 "
        >
          <Text className="text-white text-md tracking-widest font-bold text-center">
            GAME RULES
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Main;
