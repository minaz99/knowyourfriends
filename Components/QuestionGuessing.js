import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Styles } from "../styles/Styles";
const QuestionGuessing = (props) => {
  const questionFormatter = (question) => {
    let situation = question.split(":")[0];
    situation = situation.concat(" . . . .");
    const a1 = question.split(":")[1].split("||")[0];
    const a2 = question.split(":")[1].split("||")[1];
    return { situation: situation, a1: a1, a2: a2 };
  };
  //const gradientA2 = ["#ff758c", "#ff7eb3"];
  const chooseAnswer = (answer) => {
    props.socket.emit("guessed", {
      answer: answer,
      gameID: props.gameID,
      points: props.points,
      playerID: props.playerID,
    });
  };

  return (
    <LinearGradient
      className="rounded-3xl bg-white/60 p-2  "
      colors={["#c1dfc4", "#ace0f9"]}
    >
      <View className="rounded-3xl bg-white/60 p-2 mx-auto">
        <View className="p-4">
          <Text
            numberOfLines={3}
            style={[
              Styles.inlines,
              props.language === "Egyptian" ? { fontWeight: "bold" } : "",
            ]}
            className="text-slate-600 "
          >
            {questionFormatter(props.question).situation}
          </Text>
        </View>
        {props.isGuessing ? (
          <View className="space-y-2  p-4">
            <LinearGradient className="p-1.5 rounded-full" colors={props.a1}>
              <TouchableOpacity
                onPress={() => chooseAnswer(1)}
                className="p-2 bg-white rounded-full"
              >
                <Text
                  numberOfLines={3}
                  adjustsFontSizeToFit={true}
                  style={[
                    Styles.inlines,
                    props.language === "Egyptian" ? { fontWeight: "bold" } : "",
                  ]}
                  className="text-slate-600 text-center "
                >
                  {questionFormatter(props.question).a1}
                </Text>
              </TouchableOpacity>
            </LinearGradient>

            {/*<Text className="text-slate-600 text-lg font-bold mx-auto">OR</Text>*/}
            <LinearGradient className="p-1.5 rounded-full" colors={props.a2}>
              <TouchableOpacity
                onPress={() => chooseAnswer(2)}
                className="p-2 bg-white rounded-full"
              >
                <Text
                  numberOfLines={3}
                  adjustsFontSizeToFit={true}
                  style={[
                    Styles.inlines,
                    props.language === "Egyptian" ? { fontWeight: "bold" } : "",
                  ]}
                  className="text-slate-600 text-center "
                >
                  {questionFormatter(props.question).a2}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        ) : (
          <View className="space-y-2 p-4">
            <LinearGradient className="p-1.5 rounded-full" colors={props.a1}>
              <TouchableOpacity
                className="p-2 bg-white rounded-full"
                //style={{ backgroundColor: props.a2 }}
                disabled
              >
                <Text
                  numberOfLines={3}
                  adjustsFontSizeToFit={true}
                  style={[
                    Styles.inlines,
                    props.language === "Egyptian" ? { fontWeight: "bold" } : "",
                  ]}
                  className="text-slate-600 text-center "
                >
                  {questionFormatter(props.question).a1}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            {/*<Text style={Styles.inlines} className="text-slate-600 mx-auto">
            OR
      </Text>*/}
            <LinearGradient className="p-1.5 rounded-full" colors={props.a2}>
              <TouchableOpacity
                className="p-2 bg-white rounded-full"
                //style={{ backgroundColor: props.a2 }}
                disabled
              >
                <Text
                  numberOfLines={3}
                  adjustsFontSizeToFit={true}
                  style={[
                    Styles.inlines,
                    props.language === "Egyptian" ? { fontWeight: "bold" } : "",
                  ]}
                  className="text-slate-600 text-center "
                >
                  {questionFormatter(props.question).a2}
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        )}
      </View>
    </LinearGradient>
  );
};

export default QuestionGuessing;
