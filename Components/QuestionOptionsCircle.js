import { View, Text, Animated, StyleSheet, Easing } from "react-native";
import React, { useEffect, useState } from "react";
import Circle from "./Circle";
import QuestionCircle from "./QuestionCircle";
import ImagesAndQuestions from "./ImagesAndQuestions";
const QuestionOptionsCircle = (props) => {
  const [questionInView, setQuestionInView] = useState(ImagesAndQuestions.view);
  const [circle1, setCircle1] = useState(ImagesAndQuestions.gift);
  const [circle2, setCircle2] = useState(ImagesAndQuestions.icecream);
  const [circle3, setCircle3] = useState(ImagesAndQuestions.movie);
  const [circle4, setCircle4] = useState(ImagesAndQuestions.relaxing);
  const [circle5, setCircle5] = useState(ImagesAndQuestions.speed);
  const [circle6, setCircle6] = useState(ImagesAndQuestions.touching);
  const [circle7, setCircle7] = useState(ImagesAndQuestions.travel);
  const [circle8, setCircle8] = useState(ImagesAndQuestions.weather);

  const onClickCircle = (circleObj, questionObj, circleNumber) => {
    switch (circleNumber) {
      case 1:
        setCircle1(questionObj);
        break;
      case 2:
        setCircle2(questionObj);
        break;
      case 3:
        setCircle3(questionObj);
        break;
      case 4:
        setCircle4(questionObj);
        break;
      case 5:
        setCircle5(questionObj);
        break;
      case 6:
        setCircle6(questionObj);
        break;
      case 7:
        setCircle7(questionObj);
        break;
      case 8:
        setCircle8(questionObj);
        break;
      default:
        alert("error");
    }
    setQuestionInView(circleObj);
    props.startAnimation();
  };

  return (
    <View className="p-4">
      <Animated.View style={[props.opacityStyle, props.animatedStyles]}>
        <View className="mx-auto ">
          <Circle
            circleNumber={1}
            onClickCircle={onClickCircle}
            data={circle1}
            dataInView={questionInView}
            playSound={props.playSound}
          />
        </View>
        <View className="justify-around flex-row ">
          <View className="">
            <Circle
              circleNumber={2}
              onClickCircle={onClickCircle}
              data={circle2}
              dataInView={questionInView}
              className="w-12bg-red-300 rounded-full h-12"
              playSound={props.playSound}
            />
          </View>
          <View></View>
          <View className="">
            <Circle
              circleNumber={3}
              onClickCircle={onClickCircle}
              data={circle3}
              dataInView={questionInView}
              className="w-12 bg-red-300 rounded-full h-12"
              playSound={props.playSound}
            />
          </View>
        </View>
      </Animated.View>
      <View className="flex-row  justify-evenly items-center">
        <Animated.View
          className="mr-4"
          style={[props.opacityStyle, props.animatedStyles]}
        >
          <Circle
            circleNumber={4}
            onClickCircle={onClickCircle}
            data={circle4}
            dataInView={questionInView}
            playSound={props.playSound}
          />
        </Animated.View>
        <QuestionCircle
          opacityStyle={props.opacityStyle}
          animatedStyles={props.animatedStyles}
          data={questionInView}
          startAnimation={props.startAnimation}
        />
        <Animated.View
          className="ml-4"
          style={[props.opacityStyle, props.animatedStyles]}
        >
          <Circle
            circleNumber={5}
            onClickCircle={onClickCircle}
            data={circle5}
            dataInView={questionInView}
            playSound={props.playSound}
          />
        </Animated.View>
      </View>
      <Animated.View style={[props.opacityStyle, props.animatedStyles]}>
        <View className="justify-around flex-row ">
          <View className="">
            <Circle
              circleNumber={6}
              onClickCircle={onClickCircle}
              data={circle6}
              dataInView={questionInView}
              className="w-12 bg-red-300 rounded-full h-12"
              playSound={props.playSound}
            />
          </View>
          <View></View>
          <View className="">
            <Circle
              circleNumber={7}
              onClickCircle={onClickCircle}
              data={circle7}
              dataInView={questionInView}
              className="w-12 bg-red-300 rounded-full h-12"
              playSound={props.playSound}
            />
          </View>
        </View>
        <View className="mx-auto">
          <Circle
            circleNumber={8}
            onClickCircle={onClickCircle}
            data={circle8}
            dataInView={questionInView}
            className="w-12 bg-red-300 rounded-full h-12 mx-auto"
            playSound={props.playSound}
          />
        </View>
      </Animated.View>
    </View>
  );
};

export default QuestionOptionsCircle;
