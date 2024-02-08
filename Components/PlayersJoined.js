import { View, Text } from "react-native";
import React from "react";

const PlayersJoined = (props) => {
  return (
    <View className=" p-6 content-start gap-4 grid-cols-4 flex-row">
      {props.players.length > 0 ? (
        props.players.map((player) => {
          return (
            <View
              key={player.id}
              style={{ backgroundColor: "#D9D9D9" }}
              className="rounded-full w-fit p-2 "
            >
              <Text className="text-center font-bold text-slate-600">
                #{player.username}
              </Text>
            </View>
          );
        })
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default PlayersJoined;
