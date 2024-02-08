import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../Components/Card";
import PlayersJoined from "../Components/PlayersJoined";
const Lobby = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });
  const { gameID, player, socket } = route.params;
  const images = {
    coffee: require("../src/coffee-beans.png"),
    tea: require("../src/tea-bag.png"),
  };
  const [playersJoined, setPlayersJoined] = useState("");
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("join", ({ playersJoinedStr, players }) => {
      setPlayers(players);
      setPlayersJoined(playersJoinedStr);
    });
    socket.on("start game", ({ gameDetails, currentStage }) => {
      navigation.navigate("Game", {
        gameID,
        gameDetails,
        currentStage,
        player,
        socket,
      });
    });
  });

  return (
    <SafeAreaView style={{ backgroundColor: "#92BDB5" }} className="h-full ">
      <View className="flex-row">
        <Text className="flex-1"></Text>
        <Text className="p-4 text-slate-600 tracking-widest font-bold text-lg">
          #{player.username}
        </Text>
      </View>
      <Text className="my-8 text-white text-center text-2xl font-bold tracking-widest">
        Lobby
      </Text>
      <View className="space-y-3">
        <Text
          style={{ color: "#DEEBE9" }}
          className="text-center text-lg font-bold tracking-widest"
        >
          Waiting for players to join
        </Text>
        <Text
          style={{ color: "#DEEBE9" }}
          className="text-center text-lg font-bold tracking-widest"
        >
          Game ID: {gameID}
        </Text>
        <Text
          style={{ color: "#FDE68A" }}
          className="text-center text-lg font-bold tracking-widest"
        >
          Players joined: {playersJoined}
        </Text>
        <PlayersJoined players={players} />
      </View>
      <View className="flex-row space-x-6  mt-8 mx-auto">
        <Card color="#9F92BD" option={"Coffee"} image={images.coffee} />
        <Text className="font-bold  m-auto pr-4 text-white text-lg tracking-widest">
          OR
        </Text>
        <Card color="#BD929A" option={"Tea"} image={images.tea} />
      </View>
      <Text className="p-8 text-white text-lg tracking-widest">
        Something to think about while waiting...
      </Text>
    </SafeAreaView>
  );
};

export default Lobby;
