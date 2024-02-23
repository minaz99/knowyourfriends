import { View, Text, Animated } from "react-native";
import React, { useEffect } from "react";
import { Styles } from "../styles/Styles";
import { LinearGradient } from "expo-linear-gradient";
const PlayersJoined = (props) => {
  return (
    <View className=" p-6 content-start gap-4 grid-cols-4 flex-row">
      {props.players.length > 0 ? (
        props.players.map((player) => {
          return (
            <LinearGradient
              colors={["#f3e7e9", "#e3eeff"]}
              className="rounded-full  w-fit p-2"
              key={player.id}
            >
              <View
                key={player.id}
                // style={AS.opacityStyle}
                //className="rounded-full  w-fit p-2 bg-green-100"
              >
                <Text
                  style={Styles.inlines}
                  className="text-center font-bold text-slate-600"
                >
                  #{player.username}
                </Text>
              </View>
            </LinearGradient>
          );
        })
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default PlayersJoined;
