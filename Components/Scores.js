import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Styles } from "../styles/Styles";
const Scores = (props) => {
  const [scoresClicked, setScoresClicked] = useState(false);
  return scoresClicked ? (
    <View className="rounded-t-lg bg-white p-4 space-y-3">
      <TouchableOpacity onPress={() => setScoresClicked(false)}>
        <Text
          style={Styles.headlines}
          className="text-slate-600 font-bold text-lg text-center tracking-widest"
        >
          Scores ↓
        </Text>
        <Text
          style={Styles.inlines}
          className="text-slate-600 font-medium text-md text-center tracking-widest"
        >
          Round {props.round}
        </Text>
      </TouchableOpacity>
      {props.scores.map((player) => {
        return (
          <LinearGradient
            className="rounded-2xl"
            colors={["#f794a4", "#fdd6bd"]}
          >
            <View key={player.id} className="rounded-2xl flex-row p-2 ">
              <Text style={Styles.inlines} className="text-slate-600  flex-1">
                #{player.username}
              </Text>
              <Text style={Styles.headlines} className="text-slate-600">
                {player.score}
              </Text>
            </View>
          </LinearGradient>
        );
      })}
    </View>
  ) : (
    <TouchableOpacity
      onPress={() => setScoresClicked(true)}
      className="bg-white  items-center  p-4 rounded-t-lg"
    >
      <Text className="text-slate-600 font-bold text-lg text-center tracking-widest">
        Scores ↑
      </Text>
      <Text className="text-slate-600 font-medium text-md text-center tracking-widest">
        Round {props.round}
      </Text>
    </TouchableOpacity>
  );
};

export default Scores;
