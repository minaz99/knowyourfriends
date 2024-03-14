import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Platform,
  StatusBar,
  ScrollView,
  Linking,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { CreditsSection } from "../Components/Creditslinks";
import { Styles } from "../styles/Styles";
import { SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeftCircleIcon } from "react-native-heroicons/outline";
const Credits = ({ navigation }) => {
  let yValueCreateJoin = new Animated.Value(-100);
  let yValue = new Animated.Value(-120);
  let opacityAnimation = new Animated.Value(0);
  startAnimation = async () => {
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
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);
  return (
    <LinearGradient colors={["#df89b5", "#bfd9fe"]}>
      <SafeAreaView className="h-full p-6">
        <Animated.View style={[AS.opacityStyle, AS.animatedStyles]}>
          <TouchableOpacity
            style={Platform.OS === "ios" ? Styles.createJoinStyleIOS : ""}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <ArrowLeftCircleIcon color={"#475569"} height={32} width={32} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.Text
          style={[Styles.title, AS.animatedStyles, AS.opacityStyle]}
          numberOfLines={1}
          className=" text-center  text-slate-600"
        >
          CREDITS
        </Animated.Text>
        <Animated.View
          style={[AS.opacityAnimation, AS.animatedStyles]}
          className="space-y-4   p-8"
        >
          <Text className="text-white " style={Styles.inlines}>
            Icons:
          </Text>
          <ScrollView
            className="overflow-y-scroll space-y-2 mb-12"
            showsVerticalScrollIndicator={false}
          >
            {CreditsSection.map((credit, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity
                    onPress={() => Linking.openURL(credit.link)}
                  >
                    <Text
                      className="text-slate-600"
                      style={Styles.inlines}
                      numberOfLines={2}
                    >
                      {credit.text}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Credits;
