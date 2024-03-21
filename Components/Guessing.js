import { View, Text, TouchableOpacity, Vibration } from "react-native";
import React, { useState, useEffect } from "react";
import QuestionGuessing from "./QuestionGuessing";
import { LinearGradient } from "expo-linear-gradient";
import { Styles } from "../styles/Styles";
import Sounds from "./Sounds";
const Guessing = (props) => {
  const [a1, setA1] = useState(props.gradientA1);
  const [a2, setA2] = useState(props.gradientA2);
  const correctAnswer = ["#0ba360", "#3cba92"];
  const wrongAnswer = ["#c71d6f", "#d09693"];
  const [points, setPoints] = useState(0);
  const [guessed, setGuessed] = useState(null);
  let nextGuessRef;
  const guessNext = () => {
    Sounds.playButtonClickSound();
    props.socket.emit("next to guess", props.gameID);
    setGuessed(null);
  };

  const chooseAnswer = (answer) => {
    nextGuessRef.scrollToEnd({ animated: true });
    props.socket.emit("guessed", {
      answer: answer,
      gameID: props.gameID,
      points: points,
      playerID: props.playerID,
    });
  };
  const randomGuess = () => {
    let randomAns = Math.floor(Math.random() * 2) + 1;
    chooseAnswer(randomAns);
  };

  useEffect(() => {
    if (props.gameDetails.gameData.hostid === props.playerID)
      props.socket.emit("guessing started", props.gameID);

    if (props.gameDetails.playerGuessing.id === props.playerID)
      Vibration.vibrate(250);

    props.socket.on("guessing time up", () => {
      if (props.playerID === props.gameDetails.playerGuessing.id && !guessed) {
        console.log(
          `Timer is up hurry up ${props.playerID} now and guess again`
        );
        randomGuess();
      }
    });

    props.socket.on("guessing finished", () => {
      setPoints(0);
      setGuessed(null);
    });
    props.socket.on("started next round", () => {
      setA1(props.gradientA1);
      setA2(props.gradientA2);
      props.socket.emit("guessing started", props.gameID);
    });
    props.socket.on("result", ({ answer, result, points }) => {
      setPoints(points);
      setGuessed(result);
      if (answer === 1) {
        if (result) {
          Sounds.playCorrectGuessSound();
          setA1(correctAnswer);
        } else {
          Sounds.playWrongGuessSound();
          setA1(wrongAnswer);
          setA2(correctAnswer);
        }
      }
      if (answer === 2) {
        if (result) {
          Sounds.playCorrectGuessSound();
          setA2(correctAnswer);
        } else {
          Sounds.playWrongGuessSound();
          setA2(wrongAnswer);
          setA1(correctAnswer);
        }
      }
    });
  }, []);
  return (
    <View className="space-y-3 ">
      <View className="flex-row items-center mx-auto m-auto mt-4 ">
        <LinearGradient
          colors={["#a18cd1", "#2a5298"]}
          className="p-2 bg-blue-200 rounded-l-2xl"
        >
          <View>
            <Text className="text-white text-lg font-bold tracking-widest text-center">
              #{props.gameDetails.playerGuessing.username}
            </Text>
          </View>
        </LinearGradient>
        <LinearGradient colors={["#fdfbfb", "#ebedee"]} className="p-2">
          <View>
            <Text className="text-slate-600 text-lg font-bold tracking-widest text-center">
              →
            </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          colors={["#fbc2eb", "#a6c1ee"]}
          className="p-2 bg-blue-200 rounded-r-2xl"
        >
          <View>
            <Text className="tracking-widest text-slate-600 font-bold text-lg text-center">
              #{props.gameDetails.playerBeingGuessed.username}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <View className="p-4 m-auto">
        <QuestionGuessing
          isGuessing={
            props.playerID === props.gameDetails.playerGuessing.id
              ? true
              : false
          }
          gameID={props.gameID}
          question={props.gameDetails.question}
          playerID={props.playerID}
          socket={props.socket}
          a1={a1}
          a2={a2}
          points={points}
          language={props.language}
        />
      </View>
      <LinearGradient
        colors={["#c1dfc4", "#ace0f9"]}
        className="w-fit mx-auto p-1.5  bg-blue-200 rounded-full"
      >
        <View className="rounded-full bg-white p-2">
          <Text style={Styles.headlines} className="text-slate-600/90 ">
            Guessed: {props.gameDetails.gameData.playersguessed}/
            {props.gameDetails.gameData.noofplayers}
          </Text>
        </View>
      </LinearGradient>
      <View className="mx-auto space-x-2 flex-row">
        <LinearGradient
          colors={["#c1dfc4", "#ace0f9"]}
          className="rounded-full  mx-auto  p-1.5"
        >
          <View className="rounded-full m-auto text-center bg-white p-3">
            <Text
              style={[Styles.inlinesForDropDown]}
              className="text-center   text-slate-600"
            >
              +{points} pts
            </Text>
          </View>
        </LinearGradient>
        {guessed !== null &&
        props.playerID === props.gameDetails.playerGuessing.id ? (
          <LinearGradient
            colors={["#c1dfc4", "#ace0f9"]}
            className="w-fit  mx-auto p-1.5 bg-blue-200 rounded-full "
          >
            <TouchableOpacity
              onPress={guessNext}
              className="mx-auto rounded-full bg-black/80 p-3"
            >
              <Text
                style={Styles.inlinesForDropDown}
                className="text-white text-md font-medium tracking-widest text-center"
              >
                next →
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <View></View>
        )}
      </View>
      {props.playerID === props.gameDetails.playerGuessing.id ? (
        <View className="mx-auto">
          <Text className="text-slate-600" style={Styles.inlinesForDropDown}>
            You are now guessing
          </Text>
        </View>
      ) : (
        <View className="mx-auto">
          <Text className="text-slate-600" style={Styles.inlinesForDropDown}>
            {props.gameDetails.playerGuessing.username} is now guessing
          </Text>
        </View>
      )}
    </View>
  );
};

export default Guessing;
