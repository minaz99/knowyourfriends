import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Question from "./Question";
const Selection = (props) => {
  const colorAnswerSelected = "#3A4C48";
  const [a1Color, setA1Color] = useState(props.a1Color);
  const [a2Color, setA2Color] = useState(props.a2Color);
  const [selected, setSelected] = useState(false);
  const chooseAnswer = (answer) => {
    setSelected(true);
    if (answer === 1) {
      setA1Color(colorAnswerSelected);
      setA2Color(props.a2Color);
      props.socket.emit("selected", {
        gameID: props.gameID,
        playerID: props.playerID,
        answer: 1,
      });
    } else if (answer === 2) {
      setA2Color(colorAnswerSelected);
      setA1Color(props.a1Color);
      props.socket.emit("selected", {
        gameID: props.gameID,
        playerID: props.playerID,
        answer: 2,
      });
    }
  };
  const randomAnswer = () => {
    let randomAns = Math.floor(Math.random() * 2) + 1;
    chooseAnswer(randomAns);
  };

  useEffect(() => {
    if (props.gameDetails.gameData.hostid === props.playerID) {
      console.log("selection started");
      props.socket.emit("selection started", props.gameID);
    }

    props.socket.on("selection time up", () => {
      if (props.playerID !== props.gameDetails.playerGuessing.id && !selected)
        randomAnswer();
    });

    props.socket.on("selection finished", () => {
      setA1Color(props.a1Color);
      setA2Color(props.a2Color);
      setSelected(false);
    });
  }, []);

  return (
    <View>
      <View className="space-y-3">
        <View className="p-4 mx-auto">
          <View className="p-2 rounded-lg bg-white">
            <Text className="tracking-widest text-slate-600 font-bold text-lg text-center">
              Selection phase
            </Text>
          </View>
        </View>
        <View className=" p-4">
          <Question
            question={props.gameDetails.question}
            isSelecting={
              props.playerID !== props.gameDetails.playerGuessing.id
                ? true
                : false
            }
            a1Color={a1Color}
            a2Color={a2Color}
            chooseAnswer={chooseAnswer}
          />
        </View>
        <View className="mx-auto bg-white p-4 rounded-2xl">
          <Text className="text-slate-600 tracking-widest font-bold text-md">
            Players Selected: {props.gameDetails.gameData.playersselectedanswer}{" "}
            / {props.gameDetails.gameData.noofplayers}
          </Text>
        </View>
        {props.playerID !== props.gameDetails.playerGuessing.id ? (
          <Text></Text>
        ) : (
          <Text className="pt-6 tracking-widest text-slate-600 font-bold text-md text-center">
            Your turn to guess, wait for players to finish selecting
          </Text>
        )}
      </View>
    </View>
  );
};

export default Selection;
