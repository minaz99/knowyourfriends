import { Text, SafeAreaView } from "react-native";
import React, { useLayoutEffect } from "react";
const Loading = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });
  const getGameDetails = async () => {
    var loadingJobID;
    loadingJobID = setTimeout(async () => {
      clearTimeout(loadingJobID);
      navigation.navigate("Game", route.params);
    }, 1500);
    return (
      <SafeAreaView
        style={{ backgroundColor: "#92BDB5" }}
        className="h-full flex relative  space-y-6"
      >
        <Text className="text-lg text-white font-bold text-center m-auto tracking-widest">
          Loading...
        </Text>
      </SafeAreaView>
    );
  };
};

export default Loading;
