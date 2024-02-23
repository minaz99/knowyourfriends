import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
const Question = (props) => {
  const questionFormatter = (question) => {
    let situation = question.split(":")[0];
    situation = situation.concat(" . . . . . . .");
    const a1 = question.split(":")[1].split("||")[0];
    const a2 = question.split(":")[1].split("||")[1];
    return { situation: situation, a1: a1, a2: a2 };
  };

  return (
    <View className="space-y-6 mx-auto">
      <View className="bg-slate-600 p-2 rounded-2xl">
        <Text className="text-white tracking-widest text-lg font-medium">
          {questionFormatter(props.question).situation}
        </Text>
      </View>
      {props.isSelecting ? (
        <View className="space-y-3 p-4">
          <TouchableOpacity
            onPress={() => props.chooseAnswer(1)}
            //className="p-2 rounded-2xl"
            //style={{ backgroundColor: props.a1Color }}
          >
            <LinearGradient
              className="p-2 rounded-2xl"
              colors={["#1e3c72", "#2a5298"]}
            >
              <Text className="text-white text-center tracking-widest font-medium text-lg">
                {questionFormatter(props.question).a1}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold mx-auto">OR</Text>
          <TouchableOpacity
            onPress={() => props.chooseAnswer(2)}
            className="p-2 rounded-2xl"
            style={{ backgroundColor: props.a2Color }}
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
            style={{ backgroundColor: props.a1Color }}
            disabled
          >
            <Text className="text-white text-center tracking-widest font-medium text-lg">
              {questionFormatter(props.question).a1}
            </Text>
          </TouchableOpacity>
          <Text className="text-white text-lg font-bold mx-auto">OR</Text>
          <TouchableOpacity
            className="p-2 rounded-2xl"
            style={{ backgroundColor: props.a2Color }}
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

export default Question;
