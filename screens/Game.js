import { View, Text, SafeAreaView, Platform } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Scores from "../Components/Scores";
import Guessing from "../Components/Guessing";
import Selection from "../Components/Selection";
import GameFinished from "../Components/GameFinished";
import { Styles } from "../styles/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";
const Game = ({ navigation, route }) => {
  const { gameID, gameDetails, player, socket, bgMusic } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });
  const [gameInfo, setGameInfo] = useState(gameDetails);
  const [timer, setTimer] = useState(60);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const colorA1 = "#ef4444";
  const colorA2 = "#f59e0b";
  const gradientA1 = ["#1e3c72", "#2a5298"];
  const gradientA2 = ["#ff758c", "#ff7eb3"];
  const gameMusic = React.useRef(new Audio.Sound());
  async function playBackgroundMusic() {
    console.log("Loading Music");
    await gameMusic.current.loadAsync(
      require("../assets/audio/MagicInTheAirGameMusic.mp3")
    );

    //console.log("Playing Sound");
    if (!isMusicPlaying) {
      await bgMusic.current.stopAsync();
      await gameMusic.current.playAsync();
      await gameMusic.current.setIsLoopingAsync(true);
      setIsMusicPlaying(true);
    }
  }
  playBackgroundMusic();
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
    <LinearGradient colors={["#df89b5", "#bfd9fe"]}>
      <SafeAreaView className="h-full flex relative  ">
        <View
          style={Platform.OS === "android" ? Styles.GameAnd : ""}
          className="flex-row justify-between p-4 "
        >
          <LinearGradient
            colors={["#c1dfc4", "#ace0f9"]}
            className="rounded-full  p-1.5"
          >
            <View className="rounded-full m-auto text-center bg-white p-3">
              <Text
                style={[Styles.inlinesForDropDown]}
                className="text-center   text-slate-600"
              >
                Time: {timer}
              </Text>
            </View>
          </LinearGradient>
          <LinearGradient
            //className="rounded-full"
            colors={["#c1dfc4", "#ace0f9"]}
            className="rounded-full  p-1.5"
          >
            <View className="rounded-full bg-white p-3">
              <Text
                className="text-slate-600"
                style={
                  Styles.inlinesForDropDown
                } /*className=" text-slate-600 tracking-widest font-bold text-lg"*/
              >
                #{player.username}
              </Text>
            </View>
          </LinearGradient>
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
            gradientA1={gradientA1}
            gradientA2={gradientA2}
          />
        ) : gameInfo.gameData.stage === "selection" ? (
          <Selection
            a1Color={colorA1}
            a2Color={colorA2}
            gameDetails={gameInfo}
            gameID={gameID}
            playerID={player.id}
            socket={socket}
            gradientA1={gradientA1}
            gradientA2={gradientA2}
          />
        ) : (
          <GameFinished
            scores={gameInfo.scores}
            gameMusic={gameMusic}
            bgMusic={bgMusic}
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
    </LinearGradient>
  );
};

export default Game;
