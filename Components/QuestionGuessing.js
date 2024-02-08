import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const QuestionGuessing = (props) => {
  const questionFormatter = (question) => {
    let situation = question.split(":")[0];
    situation = situation.concat(" . . . . . . .");
    const a1 = question.split(":")[1].split("||")[0];
    const a2 = question.split(":")[1].split("||")[1];
    return { situation: situation, a1: a1, a2: a2 };
  };

  const chooseAnswer = (answer) => {
    props.socket.emit("guessed", {
      answer: answer,
      gameID: props.gameID,
      points: props.points,
      playerID: props.playerID,
    });
  };

  return (
    <View className="space-y-6 mx-auto">
      <View className="bg-slate-600 p-2 rounded-2xl">
        <Text className="text-white tracking-widest text-lg font-medium">
          {questionFormatter(props.question).situation}
        </Text>
      </View>
      {props.isGuessing ? (
        <View className="space-y-3 p-4">
          <TouchableOpacity
            onPress={() => chooseAnswer(1)}
            className="p-2 rounded-2xl"
            style={{ backgroundColor: props.a1 }}
          >
            <Text className="text-white text-center tracking-widest font-medium text-lg">
              {questionFormatter(props.question).a1}
            </Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold mx-auto">OR</Text>
          <TouchableOpacity
            onPress={() => chooseAnswer(2)}
            className="p-2 rounded-2xl"
            style={{ backgroundColor: props.a2 }}
          >
            <Text className="text-white text-center tracking-widest font-medium text-lg">
              {questionFormatter(props.question).a2}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="space-y-3 p-4">
          <TouchableOpacity
            className="p-2 rounded-2xl"
            style={{ backgroundColor: props.a1 }}
            disabled
          >
            <Text className="text-white text-center tracking-widest font-medium text-lg">
              {questionFormatter(props.question).a1}
            </Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold mx-auto">OR</Text>
          <TouchableOpacity
            className="p-2 rounded-2xl"
            style={{ backgroundColor: props.a2 }}
            disabled
          >
            <Text className="text-white text-center tracking-widest font-medium text-lg">
              {questionFormatter(props.question).a2}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default QuestionGuessing;
