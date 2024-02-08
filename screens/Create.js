import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import io from "socket.io-client";
const Create = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });
  const [username, setUsername] = useState("");
  const [players, setPlayers] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [password, setPassword] = useState("");
  const createGame = async () => {
    await axios
      .post("http://192.168.43.135:3003/game/create", {
        username: username,
        noOfPlayers: players,
        rounds: rounds,
        password: password,
      })
      .then((resp) => {
        let socket = io("http://192.168.43.135:3003");
        socket.emit("join", resp.data.gameID);
        navigation.navigate("Lobby", {
          player: resp.data.player,
          socket,
          gameID: resp.data.gameID,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#92BDB5" }} className="h-full ">
      <Text className="tracking-widest text-lg font-bold text-center mt-24 text-white">
        CREATE GAME
      </Text>
      <View className="space-y-4 items-center  p-8">
        <View>
          <Text
            style={{ color: "#DEEBE9" }}
            className="text-white text-center font-bold text-lg tracking-widest"
          >
            Username
          </Text>
          <TextInput
            placeholder="nickname"
            style={{
              backgroundColor: "#FED7AA",
              borderRadius: 20,
              height: 40,
            }}
            className="text-lg w-44 text-center"
            onChangeText={setUsername}
          ></TextInput>
        </View>
        <View>
          <Text
            style={{ color: "#DEEBE9" }}
            className="text-white text-center font-bold text-lg tracking-widest"
          >
            Players
          </Text>
          <TextInput
            placeholder="0"
            style={{
              backgroundColor: "#FED7AA",
              borderRadius: 20,
              height: 40,
            }}
            className="text-lg w-44 text-center"
            onChangeText={setPlayers}
            keyboardType="numeric"
          ></TextInput>
        </View>
        <View>
          <Text
            style={{ color: "#DEEBE9" }}
            className="text-white text-center font-bold text-lg tracking-widest"
          >
            Rounds
          </Text>
          <TextInput
            placeholder="Max 100"
            style={{
              backgroundColor: "#FED7AA",
              borderRadius: 20,
              height: 40,
            }}
            className="text-lg w-44 text-center"
            onChangeText={setRounds}
            keyboardType="numeric"
          ></TextInput>
        </View>
        <View>
          <Text
            style={{ color: "#DEEBE9" }}
            className="text-white text-center font-bold text-lg tracking-widest"
          >
            Game Password
          </Text>
          <TextInput
            placeholder="password"
            style={{
              backgroundColor: "#FED7AA",
              borderRadius: 20,
              height: 40,
            }}
            className="text-lg w-44 text-center"
            onChangeText={setPassword}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity
        style={{ backgroundColor: "#9F92BD" }}
        className="rounded-3xl w-2/4 p-6 mx-auto"
        onPress={async () => await createGame()}
      >
        <Text className="text-white text-md tracking-widest font-bold text-center">
          CREATE
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Create;
