import {
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  Platform,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PlayersJoined from "../Components/PlayersJoined";
import { LinearGradient } from "expo-linear-gradient";
import { Styles } from "../styles/Styles";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
import * as Progress from "react-native-progress";
import LobbyDetailsView from "../Components/LobbyDetailsView";
import Sounds from "../Components/Sounds";
const Lobby = ({ navigation, route }) => {
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  });
  const { gameID, player, socket, password, bgMusic } = route.params;

  const [playersJoined, setPlayersJoined] = useState("");
  const [players, setPlayers] = useState([]);
  const [language, setLanguage] = useState("");
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
    socket.on("join", ({ playersJoinedStr, players, language }) => {
      Sounds.playJoinedLobbySound();
      setPlayers(players);
      setPlayersJoined(playersJoinedStr);
      setLanguage(language);
    });
    socket.on("start game", ({ gameDetails, currentStage }) => {
      navigation.navigate("Game", {
        gameID,
        gameDetails,
        currentStage,
        player,
        socket,
        bgMusic,
        language,
      });
    });
    startAnimation();
  });

  return (
    <LinearGradient colors={["#df89b5", "#bfd9fe"]}>
      <SafeAreaView
        style={Platform.OS === "ios" ? Styles.lobbyIOS : Styles.lobbyAnd}
        className="h-full "
      >
        <View className="">
          <TouchableOpacity onPress={() => navigation.goBack()} className="">
            <ArrowLeftCircleIcon color={"#475569"} height={32} width={32} />
          </TouchableOpacity>
          <Text
            style={[Styles.title /*AS.animatedStyles, AS.opacityStyle*/]}
            className="text-slate-600  text-center text-2xl font-bold tracking-widest"
          >
            Lobby
          </Text>
        </View>
        <View
          //  style={[AS.opacityStyle, AS.animatedStyles]}
          className="space-y-3 relative "
        >
          <PlayersJoined players={players} />
          <View className="space-x-6 flex-row items-center mx-auto ">
            <Text
              style={Styles.headlines}
              className="text-center text-white text-lg font-bold tracking-widest"
            >
              Waiting for players
            </Text>

            <Progress.Circle
              animated={true}
              borderWidth={3}
              size={30}
              indeterminate={true}
              color="white"
              showsText={true}
            />
          </View>
        </View>

        <LobbyDetailsView
          password={password}
          id={gameID}
          playersJoined={playersJoined}
          language={language}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Lobby;
