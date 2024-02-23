import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Platform,
  StatusBar,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
//import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import QuestionOptionsCircle from "../Components/QuestionOptionsCircle";
import { Styles } from "../styles/Styles";
const Main = ({ navigation }) => {
  const fonts = StyleSheet.create({
    InterSemi: {
      fontFamily: "Inter_600SemiBold",
    },
  });
  let yValueCreateJoin = new Animated.Value(-100);
  let yValue = new Animated.Value(-120);
  let opacityAnimation = new Animated.Value(0);
  startAnimation = () => {
    Animated.timing(yValue, {
      toValue: 0,
      duration: 2500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: true,
      //easing: Easing.bounce,
    }).start();
    Animated.timing(yValueCreateJoin, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  };
  const AS = {
    animatedStyles: {
      transform: [
        {
          translateY: yValue,
        },
      ],
    },
    animatedStylesBtns: {
      transform: [
        {
          translateY: yValueCreateJoin,
        },
      ],
    },
    opacityStyle: { opacity: opacityAnimation },
  };

  startAnimation();
  let [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  return (
    <LinearGradient colors={["#df89b5", "#bfd9fe"]}>
      <SafeAreaView
        className="h-full"
        style={Platform.OS === "ios" ? "" : Styles.mainStyleAnd}
      >
        <StatusBar hidden={true} />
        <View className="space-y-6 ">
          <Animated.Text
            style={[Styles.title, AS.animatedStyles, fonts.InterSemi]}
            numberOfLines={1}
            className=" text-center p-2  text-slate-600"
            adjustsFontSizeToFit={true}
          >
            Do you know your friends
          </Animated.Text>

          <View>
            <QuestionOptionsCircle
              animatedStyles={AS.animatedStyles}
              opacityStyle={AS.opacityStyle}
              style={Styles.question}
              startAnimation={startAnimation}
            />
          </View>
        </View>
        <View className="m-auto space-y-6 mx-auto">
          <Animated.View
            style={[AS.opacityStyle, AS.animatedStyles, AS.animatedStylesBtns]}
            className="flex-row"
          >
            <LinearGradient
              className="rounded-l-full"
              colors={["#1e3c72", "#2a5298"]}
            >
              <TouchableOpacity
                className="p-6"
                onPress={() => navigation.navigate("Create")}
              >
                <Text className="text-white text-md tracking-widest font-bold text-center">
                  CREATE
                </Text>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              className="rounded-r-full"
              colors={["#ff758c", "#ff7eb3"]}
            >
              <TouchableOpacity
                className=" p-6"
                onPress={() => navigation.navigate("Join")}
              >
                <Text className="text-white text-md tracking-widest font-bold text-center">
                  JOIN
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
          <Animated.View
            style={[AS.opacityStyle, AS.animatedStyles, AS.animatedStylesBtns]}
          >
            <LinearGradient
              className="rounded-full"
              colors={["#fdfbfb", "#ebedee"]}
            >
              <TouchableOpacity className=" p-6">
                <Text className="text-slate-600  text-md tracking-widest font-bold text-center">
                  GAME RULES
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Main;
