import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Card from "../Components/Card";
const Home = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });
  const images = {
    plane: require("../src/flight.png"),
    train: require("../src/train.png"),
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#92BDB5" }} className="h-full ">
      <Text className="p-12 text-center font-bold text-xl tracking-widest text-white">
        Do you know your friends
      </Text>
      <View className="flex-row space-x-6 mx-auto">
        <Card color="#506864" option={"Plane"} image={images.plane} />
        <Text className="font-bold  m-auto pr-4 text-white text-lg tracking-widest">
          OR
        </Text>
        <Card color="#506864" option={"Train"} image={images.train} />
      </View>
      <View className="space-y-6 my-24">
        <View className="flex-row space-x-3  mx-auto">
          <TouchableOpacity
            style={{ backgroundColor: "#9F92BD" }}
            className="rounded-full p-6"
            onPress={() => navigation.navigate("Create")}
          >
            <Text className="text-white text-md tracking-widest font-bold text-center">
              CREATE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "#BD929A" }}
            className="rounded-full p-6 "
            onPress={() => navigation.navigate("Join")}
          >
            <Text className="text-white text-md tracking-widest font-bold text-center">
              JOIN
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "#AFBD92" }}
          className="rounded-full p-6 w-fit mx-auto "
        >
          <Text className="text-white text-md tracking-widest font-bold text-center">
            GAME RULES
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;
