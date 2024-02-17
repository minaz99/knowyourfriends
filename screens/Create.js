import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
const Create = ({ navigation, route }) => {
  const { title, headlines, inlines } = route.params;
  let yValueCreateJoin = new Animated.Value(-100);
  let yValue = new Animated.Value(-120);
  let opacityAnimation = new Animated.Value(0);
  startAnimation = () => {
    Animated.timing(yValue, {
      toValue: 0,
      duration: 1750,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 1500,
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
  const AS = {
    animatedStyles: {
      transform: [
        {
          translateY: yValue,
        },
      ],
    },
    animatedStylesBtns: {
      transform: [
        {
          translateY: yValueCreateJoin,
        },
      ],
    },
    opacityStyle: { opacity: opacityAnimation },
  };
  useEffect(() => {
    startAnimation();
  }, []);
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
    <LinearGradient colors={["#df89b5", "#bfd9fe"]}>
      <SafeAreaView className="h-full ">
        <View className="">
          <Animated.View style={[AS.opacityStyle, AS.animatedStyles]}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="p-6"
            >
              <ArrowLeftCircleIcon color={"#475569"} height={32} width={32} />
            </TouchableOpacity>
          </Animated.View>
          <Animated.Text
            style={[title, AS.animatedStyles, AS.opacityStyle]}
            numberOfLines={1}
            className=" text-center  text-slate-600"
          >
            CREATE GAME
          </Animated.Text>

          <Animated.View
            style={[AS.opacityAnimation, AS.animatedStyles]}
            className="space-y-4 items-center  p-8"
          >
            <View className="space-y-2">
              <Text
                style={[headlines]}
                className="text-white text-center font-bold text-lg tracking-widest"
              >
                Username
              </Text>

              <TextInput
                placeholder="Nickname"
                style={[
                  { backgroundColor: "#FED7AA", borderRadius: 20, height: 40 },
                  inlines,
                ]}
                className="text-lg w-44 overflow-x-scroll text-center text-slate-600/90 "
                onChangeText={setUsername}
              ></TextInput>
            </View>
            <View className="space-y-2">
              <Text
                style={[headlines]}
                className="text-white text-center font-bold text-lg tracking-widest"
              >
                Players
              </Text>
              <TextInput
                placeholder="0"
                style={[
                  {
                    backgroundColor: "#FED7AA",
                    borderRadius: 20,
                    height: 40,
                  },
                ]}
                className="text-lg w-44 text-center text-slate-600/90"
                onChangeText={setPlayers}
                keyboardType="numeric"
              ></TextInput>
            </View>
            <View className="space-y-2">
              <Text
                style={[headlines]}
                className="text-white text-center font-bold text-lg tracking-widest"
              >
                Rounds
              </Text>
              <TextInput
                placeholder="Max 100"
                style={[
                  {
                    backgroundColor: "#FED7AA",
                    borderRadius: 20,
                    height: 40,
                  },
                  inlines,
                ]}
                className="text-lg w-44 text-center text-slate-600/90"
                onChangeText={setRounds}
                keyboardType="numeric"
              ></TextInput>
            </View>
            <View className="space-y-2">
              <Text
                style={[/*{ color: "#DEEBE9" },*/ headlines]}
                className="text-white text-center font-bold text-lg tracking-widest"
              >
                Game Password
              </Text>
              <TextInput
                placeholder="Password"
                style={[
                  {
                    backgroundColor: "#FED7AA",
                    borderRadius: 20,
                    height: 40,
                  },
                  inlines,
                ]}
                className="text-lg w-44 text-center text-slate-600/90"
                onChangeText={setPassword}
              ></TextInput>
            </View>
          </Animated.View>
          <Animated.View style={[AS.animatedStylesBtns, AS.opacityStyle]}>
            <TouchableOpacity
              style={{ backgroundColor: "#9F92BD" }}
              className="rounded-3xl w-2/4 p-6 mx-auto "
              onPress={async () => await createGame()}
            >
              <Text
                style={inlines}
                className="text-white text-md tracking-widest font-bold text-center"
              >
                CREATE
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Create;
