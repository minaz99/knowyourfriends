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
import { SelectList } from "react-native-dropdown-select-list";
import { Styles } from "../styles/Styles";
const Create = ({ navigation, route }) => {
  const { title, headlines, inlines } = route.params;
  let yValueCreateJoin = new Animated.Value(-100);
  let yValue = new Animated.Value(-120);
  let opacityAnimation = new Animated.Value(0);
  startAnimation = () => {
    Animated.timing(yValue, {
      toValue: 0,
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
  const [players, setPlayers] = useState("");
  const [rounds, setRounds] = useState("");
  const [password, setPassword] = useState("");
  const [language, setLanguage] = useState("");
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
              <View className="m-auto overflow-x-scroll">
                <TextInput
                  placeholderTextColor={"#0f172a"}
                  placeholder="Nickname"
                  style={[
                    username !== ""
                      ? Styles.filledInputText
                      : Styles.emptyInputText,
                    headlines,
                  ]}
                  className="text-lg w-44  text-center text-slate-600 "
                  onChangeText={setUsername}
                ></TextInput>
              </View>
            </View>
            <View className="space-y-2 ">
              <Text
                style={[headlines]}
                className="text-white text-center font-bold text-lg tracking-widest"
              >
                Language
              </Text>

              <View className="m-auto">
                <SelectList
                  data={["English", "Egyptian"]}
                  placeholder="Language"
                  setSelected={setLanguage}
                  search={false}
                  maxHeight={100}
                  boxStyles={[
                    language !== ""
                      ? Styles.filledInputText
                      : Styles.emptyInputText,
                    {
                      width: 180,
                    },
                  ]}
                  inputStyles={[
                    Styles.headlines,
                    language !== ""
                      ? { color: "#475569" }
                      : { color: "#0f172a" },
                  ]}
                  dropdownTextStyles={[Styles.inlines, { color: "#475569" }]}
                  dropdownStyles={{ borderRadius: 20 }}
                />
              </View>
            </View>
            <View className="space-y-2">
              <Text
                style={[headlines]}
                className="text-white text-center font-bold text-lg tracking-widest"
              >
                Players
              </Text>
              <View className="m-auto">
                <TextInput
                  placeholder="0"
                  placeholderTextColor={"#0f172a"}
                  style={[
                    players !== ""
                      ? Styles.filledInputText
                      : Styles.emptyInputText,
                    headlines,
                  ]}
                  className="text-lg w-44 text-center text-slate-600"
                  onChangeText={setPlayers}
                  keyboardType="numeric"
                ></TextInput>
              </View>
            </View>

            <View className="space-y-2">
              <Text
                style={[headlines]}
                className="text-white text-center font-bold text-lg tracking-widest"
              >
                Rounds
              </Text>
              <View className="m-auto">
                <TextInput
                  placeholder="Max 100"
                  placeholderTextColor={"#0f172a"}
                  style={[
                    rounds !== ""
                      ? Styles.filledInputText
                      : Styles.emptyInputText,
                    headlines,
                  ]}
                  className="text-lg w-44 text-center text-slate-600"
                  onChangeText={setRounds}
                  keyboardType="numeric"
                ></TextInput>
              </View>
            </View>
            <View className="space-y-2">
              <Text
                style={[/*{ color: "#DEEBE9" },*/ headlines]}
                className="text-white text-center font-bold text-lg tracking-widest"
              >
                Game Password
              </Text>
              <View className="m-auto">
                <TextInput
                  placeholderTextColor={"#0f172a"}
                  placeholder="Password"
                  style={[
                    password !== ""
                      ? Styles.filledInputText
                      : Styles.emptyInputText,
                    headlines,
                  ]}
                  className="text-lg w-44 text-center text-slate-600"
                  onChangeText={setPassword}
                ></TextInput>
              </View>
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
