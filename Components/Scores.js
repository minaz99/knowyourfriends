import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
const Scores = (props) => {
  const [scoresClicked, setScoresClicked] = useState(false);
  return scoresClicked ? (
    <View className="rounded-t-lg bg-white/80 p-4 space-y-3">
      <TouchableOpacity onPress={() => setScoresClicked(false)}>
        <Text className="text-slate-600 font-bold text-lg text-center tracking-widest">
          Scores ↓
        </Text>
        <Text className="text-slate-600 font-medium text-md text-center tracking-widest">
          Round {props.round}
        </Text>
      </TouchableOpacity>
      {props.scores.map((player) => {
        return (
          <View
            key={player.id}
            className="rounded-2xl flex-row p-2 bg-slate-600"
          >
            <Text className="text-white text-lg tracking-widest font-bold flex-1">
              #{player.username}
            </Text>
            <Text className="text-white text-lg tracking-widest font-bold">
              {player.score}
            </Text>
          </View>
        );
      })}
    </View>
  ) : (
    <TouchableOpacity
      onPress={() => setScoresClicked(true)}
      className="bg-white p-4 rounded-t-lg"
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
