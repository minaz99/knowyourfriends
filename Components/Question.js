import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Styles } from "../styles/Styles";
import Sounds from "./Sounds";
const Question = (props) => {
  const questionFormatter = (question) => {
    let situation = question.split(":")[0];
    situation = situation.concat(" . . . .");
    const a1 = question.split(":")[1].split("||")[0];
    const a2 = question.split(":")[1].split("||")[1];
    return { situation: situation, a1: a1, a2: a2 };
  };

  return (
    <LinearGradient
      className="rounded-3xl bg-white/60 p-2  "
      colors={["#c1dfc4", "#ace0f9"]}
    >
      <View className="rounded-3xl bg-white/60 p-2 ">
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
        {props.isSelecting ? (
          <View className="space-y-2 p-4">
            <LinearGradient className="p-1.5 rounded-full" colors={props.a1}>
              <TouchableOpacity
                onPress={() => {
                  Sounds.playSelectionSound();
                  props.chooseAnswer(1);
                }}
                className="p-2 bg-white rounded-full"
              >
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
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
            {/* <Text className="text-white text-lg font-bold mx-auto">OR</Text>*/}
            <LinearGradient className="p-1.5 rounded-full" colors={props.a2}>
              <TouchableOpacity
                onPress={() => {
                  Sounds.playSelectionSound();
                  props.chooseAnswer(2);
                }}
                className="p-2 bg-white rounded-full"
              >
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={2}
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
              <TouchableOpacity className="p-2 bg-white rounded-full" disabled>
                <Text
                  numberOfLines={2}
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
            {/*<Text className="text-white text-lg font-bold mx-auto">OR</Text>*/}
            <LinearGradient className="p-1.5 rounded-full" colors={props.a2}>
              <TouchableOpacity className="p-2 bg-white rounded-full" disabled>
                <Text
                  numberOfLines={2}
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

export default Question;
