import { Audio } from "expo-av";

const Sounds = {
  buttonClickSound: async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/ButtonClick.mp3")
    );
    await sound.playAsync();
  },
  circleClickSound: async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/FieldClick.mp3")
    );
    await sound.playAsync();
  },
  fieldClickSound: async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/FieldClick.mp3")
    );
    await sound.playAsync();
  },
};

export default Sounds;
