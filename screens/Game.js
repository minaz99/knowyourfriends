import { View, Text, SafeAreaView } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Scores from "../Components/Scores";
import Guessing from "../Components/Guessing";
import Selection from "../Components/Selection";
import GameFinished from "../Components/GameFinished";
const Game = ({ navigation, route }) => {
  const { gameID, gameDetails, player, socket } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });
  const [gameInfo, setGameInfo] = useState(gameDetails);
  const [timer, setTimer] = useState(60);
  const colorA1 = "#9F92BD";
  const colorA2 = "#BD929A";

  useEffect(() => {
    socket.on("start timer", () => {
      if (player.id === gameInfo.gameData.hostid) {
        console.log(`starting timer ${player.id}`);
        socket.emit("start timer", gameID);
      }
    });
    socket.on("stop timer", () => {
      if (player.id === gameInfo.gameData.hostid) socket.emit("stop timer");
    });

    socket.on("timer", (timer) => setTimer(timer));
    socket.on("updated", (gameDetails) => setGameInfo(gameDetails));
  }, []);
  return (
    <SafeAreaView
      style={{ backgroundColor: "#92BDB5" }}
      className="h-full flex relative  "
    >
      <View className="flex-row mt-8">
        <Text className="p-4 flex-1 text-slate-600 trackinhg-widest font-bold text-lg">
          {timer}
        </Text>
        <Text className="p-4 text-slate-600 tracking-widest font-bold text-lg">
          #{player.username}
        </Text>
      </View>
      {gameInfo.gameData.stage === "guessing" ? (
        <Guessing
          gameID={gameID}
          a1Color={colorA1}
          a2Color={colorA2}
          gameDetails={gameInfo}
          playerID={player.id}
          socket={socket}
          setTimer={setTimer}
        />
      ) : gameInfo.gameData.stage === "selection" ? (
        <Selection
          a1Color={colorA1}
          a2Color={colorA2}
          gameDetails={gameInfo}
          gameID={gameID}
          playerID={player.id}
          socket={socket}
        />
      ) : (
        <GameFinished
          scores={gameInfo.scores}
          round={`${gameInfo.gameData.currentround} / ${gameInfo.gameData.rounds}`}
        />
      )}
      {
        <View className="inset-x-0 bottom-0 absolute">
          {gameInfo.gameData.stage !== "game finished" ? (
            <Scores
              scores={gameInfo.scores}
              round={`${gameInfo.gameData.currentround} / ${gameInfo.gameData.rounds}`}
            />
          ) : (
            <View></View>
          )}
        </View>
      }
    </SafeAreaView>
  );
};

export default Game;
