import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Styles } from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
const GameFinished = (props) => {
  const navigation = useNavigation();
  async function musicHandler() {
    await props.gameMusic.current.stopAsync();
    await props.bgMusic.current.playAsync();
  }
  musicHandler();
  return (
    <View className="rounded-t-lg bg-white h-screen p-4 space-y-3">
      <Text className="text-slate-600 font-bold text-lg text-center tracking-widest">
        Scores ↓
      </Text>
      <Text className="text-slate-600 font-medium text-md text-center tracking-widest">
        Round {props.round}
      </Text>
      {props.scores.map((player, index) => {
        return index === 0 ? (
          <LinearGradient
            className="rounded-2xl"
            colors={["#f6d365", "#FACC6B"]}
          >
            <View key={player.id} className="rounded-2xl flex-row p-2 ">
              <Text
                style={Styles.headlines}
                className="text-slate-600 text-lg tracking-widest font-bold flex-1"
              >
                #{player.username}
              </Text>
              <Text
                style={Styles.headlines}
                className="text-slate-600 text-lg tracking-widest font-bold"
              >
                {player.score}
              </Text>
            </View>
          </LinearGradient>
        ) : index === 1 ? (
          <LinearGradient
            className="rounded-2xl"
            colors={["#EDF1F4", "#C3CBDC"]}
          >
            <View key={player.id} className="  flex-row p-2 ">
              <Text
                style={Styles.headlines}
                className="text-slate-600 text-lg tracking-widest font-bold flex-1"
              >
                #{player.username}
              </Text>
              <Text
                style={Styles.headlines}
                className="text-slate-600 text-lg tracking-widest font-bold"
              >
                {player.score}
              </Text>
            </View>
          </LinearGradient>
        ) : index === 2 ? (
          <LinearGradient
            className="rounded-2xl"
            colors={["#c79081", "#dfa579"]}
          >
            <View key={player.id} className=" flex-row p-2 ">
              <Text
                style={Styles.headlines}
                className="text-slate-600 text-lg tracking-widest font-bold flex-1"
              >
                #{player.username}
              </Text>
              <Text
                style={Styles.headlines}
                className="text-slate-600 text-lg tracking-widest font-bold"
              >
                {player.score}
              </Text>
            </View>
          </LinearGradient>
        ) : (
          <LinearGradient
            className="rounded-2xl"
            colors={["#243949", "#517fa4"]}
          >
            <View
              key={player.id}
              className="rounded-2xl flex-row p-2 bg-slate-600"
            >
              <Text
                style={Styles.headlines}
                className="text-white text-lg tracking-widest font-bold flex-1"
              >
                #{player.username}
              </Text>
              <Text
                style={Styles.headlines}
                className="text-white text-lg tracking-widest font-bold"
              >
                {player.score}
              </Text>
            </View>
          </LinearGradient>
        );
      })}
      <Text className="text-lg text-center text-slate-600 tracking-widest font-bold">
        Game Finished
      </Text>
      <LinearGradient
        className="mx-auto p-2 rounded-2xl"
        colors={["#64b3f4", "#bfd9fe"]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Text style={Styles.headlines} className="text-slate-600">
            Play again
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default GameFinished;
