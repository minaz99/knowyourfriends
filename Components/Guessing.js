import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import QuestionGuessing from "./QuestionGuessing";
const Guessing = (props) => {
  const [a1, setA1] = useState(props.a1Color);
  const [a2, setA2] = useState(props.a2Color);
  const correctAnswer = "#15803D";
  const wrongAnswer = "#AD4C4A";
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
      setA1(props.a1Color);
      setA2(props.a2Color);
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
    <View className="h-full flex rounded-t-2xl text-white/60">
      <View className="flex-row items-center p-4 mx-auto">
        <View className="p-2 bg-lime-200 rounded-l-2xl">
          <Text className="text-slate-600 text-lg font-bold tracking-widest text-center">
            #{props.gameDetails.playerGuessing.username}
          </Text>
        </View>
        <View className="p-2 bg-slate-600">
          <Text className="text-white text-lg font-bold tracking-widest text-center">
            →
          </Text>
        </View>
        <View className="p-2 rounded-r-2xl bg-white">
          <Text className="tracking-widest text-slate-600 font-bold text-lg text-center">
            #{props.gameDetails.playerBeingGuessed.username}
          </Text>
        </View>
      </View>

      <View>
        <View className=" p-4">
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
          />
        </View>

        <View className="w-fit mx-auto p-2 bg-blue-200 rounded-2xl">
          <Text className="text-slate-600 text-lg font-bold tracking-widest text-center">
            Guessed: {props.gameDetails.gameData.playersguessed}/
            {props.gameDetails.gameData.noofplayers}{" "}
          </Text>
        </View>

        <View className="py-3">
          <Text className="text-white text-lg font-bold tracking-widest text-center">
            +{points} pts
          </Text>
        </View>
        {guessed !== null &&
        props.playerID === props.gameDetails.playerGuessing.id ? (
          <TouchableOpacity
            onPress={guessNext}
            className="mx-auto rounded-2xl bg-black p-2"
          >
            <Text className="text-white text-md font-medium tracking-widest text-center">
              Guess next player
            </Text>
          </TouchableOpacity>
        ) : (
          <View></View>
        )}
      </View>
    </View>
  );
};

export default Guessing;
