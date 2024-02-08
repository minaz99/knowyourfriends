import { View, Text } from "react-native";
import React from "react";

const GameFinished = (props) => {
  return (
    <View className="rounded-t-lg bg-white/40 h-screen p-4 space-y-3">
      <Text className="text-slate-600 font-bold text-lg text-center tracking-widest">
        Scores ↓
      </Text>
      <Text className="text-slate-600 font-medium text-md text-center tracking-widest">
        Round {props.round}
      </Text>
      {props.scores.map((player, index) => {
        return index === 0 ? (
          <View
            key={player.id}
            className="rounded-2xl flex-row p-2 bg-amber-400/90"
          >
            <Text className="text-slate-600 text-lg tracking-widest font-bold flex-1">
              #{player.username}
            </Text>
            <Text className="text-slate-600 text-lg tracking-widest font-bold">
              {player.score}
            </Text>
          </View>
        ) : index === 1 ? (
          <View
            key={player.id}
            className="rounded-2xl flex-row p-2 bg-neutral-600/90"
          >
            <Text className="text-white text-lg tracking-widest font-bold flex-1">
              #{player.username}
            </Text>
            <Text className="text-white text-lg tracking-widest font-bold">
              {player.score}
            </Text>
          </View>
        ) : index === 2 ? (
          <View
            key={player.id}
            className="rounded-2xl flex-row p-2 bg-amber-800/90"
          >
            <Text className="text-white text-lg tracking-widest font-bold flex-1">
              #{player.username}
            </Text>
            <Text className="text-white text-lg tracking-widest font-bold">
              {player.score}
            </Text>
          </View>
        ) : (
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
      <Text className="text-lg text-center text-slate-600 tracking-widest font-bold">
        Game Finished
      </Text>
    </View>
  );
};

export default GameFinished;
