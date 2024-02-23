import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import QuestionGuessing from "./QuestionGuessing";
import { LinearGradient } from "expo-linear-gradient";
import { Styles } from "../styles/Styles";
const Guessing = (props) => {
  const [a1, setA1] = useState(props.gradientA1);
  const [a2, setA2] = useState(props.gradientA2);
  //const correctAnswer = "#15803D";
  const correctAnswer = ["#0ba360", "#3cba92"];
  const wrongAnswer = ["#c71d6f", "#d09693"];
  //const wrongAnswer = "#AD4C4A";
  const [points, setPoints] = useState(0);
  const [guessed, setGuessed] = useState(null);

  const guessNext = () => {
    props.socket.emit("next to guess", props.gameID);
    setGuessed(null);
  };

  const chooseAnswer = (answer) => {
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
        if (result) setA1(correctAnswer);
        else {
          setA1(wrongAnswer);
          setA2(correctAnswer);
        }
      }
      if (answer === 2) {
        if (result) setA2(correctAnswer);
        else {
          setA2(wrongAnswer);
          setA1(correctAnswer);
        }
      }
    });
  }, []);
  return (
    <View className=" flex rounded-t-2xl">
      {/*<LinearGradient
        //className="rounded-full"
        colors={["#c1dfc4", "#ace0f9"]}
        className="w-fit mx-auto p-1.5x bg-blue-200 rounded-2xl"
      >*/}
      <View className="flex-row items-center mx-auto m-auto mt-4 ">
        <LinearGradient
          //className="rounded-full"
          colors={["#a18cd1", "#2a5298"]}
          //className="w-fit mx-auto p-2 bg-blue-200 rounded-full"
          className="p-2 bg-blue-200 rounded-l-2xl"
        >
          <View>
            <Text className="text-white text-lg font-bold tracking-widest text-center">
              #{props.gameDetails.playerGuessing.username}
            </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          //colors={["#fbc2eb", "#a6c1ee"]}
          colors={["#fdfbfb", "#ebedee"]}
          className="p-2"
        >
          <View>
            <Text className="text-slate-600 text-lg font-bold tracking-widest text-center">
              →
            </Text>
          </View>
        </LinearGradient>
        <LinearGradient
          //colors={["#e0c3fc", "#8ec5fc"]}
          colors={["#fbc2eb", "#a6c1ee"]}
          className="p-2 bg-blue-200 rounded-r-2xl"
        >
          <View /*className="p-2 rounded-l-2xl bg-white"*/>
            <Text className="tracking-widest text-slate-600 font-bold text-lg text-center">
              #{props.gameDetails.playerBeingGuessed.username}
            </Text>
          </View>
        </LinearGradient>
      </View>

      {/*</LinearGradient>*/}

      <View className="mt-4">
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
            //gradientA1={props.gradientA1}
            //gradientA2={props.gradientA2}
          />
        </View>
        <LinearGradient
          //className="rounded-full"
          colors={["#c1dfc4", "#ace0f9"]}
          className="w-fit mx-auto p-1.5  bg-blue-200 rounded-full"
        >
          <View className="rounded-full bg-white p-2">
            <Text
              style={Styles.headlines}
              //className="text-slate-600 text-lg font-bold tracking-widest text-center"
              className="text-slate-600/90 "
            >
              Guessed: {props.gameDetails.gameData.playersguessed}/
              {props.gameDetails.gameData.noofplayers}{" "}
            </Text>
          </View>
        </LinearGradient>

        <View className="py-3">
          <Text
            style={Styles.title}
            className="text-white text-lg font-bold tracking-widest text-center"
          >
            +{points} pts
          </Text>
        </View>
        {guessed !== null &&
        props.playerID === props.gameDetails.playerGuessing.id ? (
          <LinearGradient
            //className="rounded-full"
            colors={["#c1dfc4", "#ace0f9"]}
            className="w-fit mx-auto p-1.5 bg-blue-200 rounded-full"
          >
            <TouchableOpacity
              onPress={guessNext}
              className="mx-auto rounded-full bg-black/80 p-2"
            >
              <Text
                style={Styles.inlinesForDropDown}
                className="text-white text-md font-medium tracking-widest text-center"
              >
                Guess next player →
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default Guessing;
