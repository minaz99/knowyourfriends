import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Question from "./Question";
import { Styles } from "../styles/Styles";
import { LinearGradient } from "expo-linear-gradient";
const Selection = (props) => {
  const colorAnswerSelected = ["#29323c", "#485563"];
  const [a1Color, setA1Color] = useState(props.gradientA1);
  const [a2Color, setA2Color] = useState(props.gradientA2);
  const [selected, setSelected] = useState(false);
  const chooseAnswer = (answer) => {
    setSelected(true);
    if (answer === 1) {
      setA1Color(colorAnswerSelected);
      setA2Color(props.gradientA2);
      props.socket.emit("selected", {
        gameID: props.gameID,
        playerID: props.playerID,
        answer: 1,
      });
    } else if (answer === 2) {
      setA2Color(colorAnswerSelected);
      setA1Color(props.gradientA1);
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
      setA1Color(props.gradientA1);
      setA2Color(props.gradientA2);
      setSelected(false);
    });
  }, []);

  return (
    <View>
      <View className="">
        <View className="p-4 mx-auto">
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
                Selection phase
              </Text>
            </View>
          </LinearGradient>
        </View>
        <View className=" p-4">
          <Question
            question={props.gameDetails.question}
            isSelecting={
              props.playerID !== props.gameDetails.playerGuessing.id
                ? true
                : false
            }
            a1={a1Color}
            a2={a2Color}
            chooseAnswer={chooseAnswer}
            language={props.language}
          />
        </View>
        <LinearGradient
          colors={["#c1dfc4", "#ace0f9"]}
          className="w-fit mx-auto p-1.5  bg-blue-200 rounded-full"
        >
          <View className="rounded-full bg-white p-2">
            <Text
              style={Styles.inlines}
              //className="text-slate-600 text-lg font-bold tracking-widest text-center"
              className="text-slate-600/90 "
            >
              Players Selected:{" "}
              {props.gameDetails.gameData.playersselectedanswer} /{" "}
              {props.gameDetails.gameData.noofplayers}
            </Text>
          </View>
        </LinearGradient>
        {props.playerID !== props.gameDetails.playerGuessing.id ? (
          <Text
            className="text-center p-4 text-slate-600"
            style={Styles.inlinesForDropDown}
          >
            You are now selecting
          </Text>
        ) : (
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={2}
            style={[Styles.GameAnd, Styles.inlinesForDropDown]}
            className="text-slate-600 text-center p-4"
          >
            Your turn to guess, wait for players to finish selecting
          </Text>
        )}
      </View>
    </View>
  );
};

export default Selection;
