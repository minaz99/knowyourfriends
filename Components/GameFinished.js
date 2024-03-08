import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Styles } from "../styles/Styles";
import { useNavigation } from "@react-navigation/native";
import Sounds from "./Sounds";
const GameFinished = (props) => {
  const navigation = useNavigation();
  Sounds.playEndOfGameSound(props.gameMusic, props.bgMusic);
  return (
    <View className="rounded-3xl h-full bg-black/60  p-8  space-y-3">
      {/*<Text className="text-slate-600 font-bold text-lg text-center tracking-widest">
        Scores ↓
      </Text>
      <Text className="text-slate-600 font-medium text-md text-center tracking-widest">
        Round {props.round}
  </Text>*/}
      {props.scores.map((player, index) => {
        return index === 0 ? (
          <LinearGradient
            className="rounded-2xl"
            colors={["#f6d365", "#FACC6B"]}
            key={player.id}
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
            key={player.id}
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
            key={player.id}
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
            key={player.id}
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
      <Text className="text-lg text-center text-white tracking-widest font-bold">
        Game Finished
      </Text>
      <LinearGradient
        className="w-fit  mx-auto p-1.5 bg-blue-200 rounded-full "
        colors={["#c1dfc4", "#ace0f9"]}
      >
        <TouchableOpacity
          className="mx-auto rounded-full bg-white  /80 p-3"
          onPress={() => navigation.navigate("Main")}
        >
          <Text style={Styles.inlines} className="text-slate-600">
            Play again
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default GameFinished;
