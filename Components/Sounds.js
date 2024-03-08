import { Audio } from "expo-av";

const Sounds = {
  playButtonClickSound: async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/ButtonClick.mp3")
    );
    await sound.playAsync();
  },
  playCircleClickSound: async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/FieldClick.mp3")
    );
    await sound.playAsync();
  },
  playFieldClickSound: async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/FieldClick.mp3")
    );
    await sound.playAsync();
  },
  playEndOfGameSound: async function playEndOfGameSound(gameMusic, bgMusic) {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/EndOfGame.mp3")
    );
    await gameMusic.current
      .stopAsync()
      .catch((err) => err)
      .then(async () => await bgMusic.current.playAsync())
      .catch((err) => err)
      .finally(async () => {
        await sound.playAsync().catch((err) => err);
      });
  },
  playCorrectGuessSound: async function playCorrectGuessSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/CorrectGuess.mp3")
    );

    await sound.playAsync();
  },
  playWrongGuessSound: async function playWrongGuessSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/WrongGuess.mp3")
    );
    await sound.playAsync();
  },
  playSelectionSound: async function playSelectionSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/OptionSelection.mp3")
    );
    await sound.playAsync();
  },
  playJoinedLobbySound: async function playSelectionSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/JoinedLobby.mp3")
    );
    await sound.playAsync();
  },
  playTimeTickingSound: async function playTimeTickingSound() {
    const { sound } = await Audio.Sound.createAsync(
      require("../assets/audio/TimeTicking.mp3")
    );
    await sound.playAsync();
  },
  playGameMusic: async function playBackgroundMusic(gameMusic, bgMusic) {
    if (!gameMusic.current._loaded) {
      await gameMusic.current
        .loadAsync(require("../assets/audio/MagicInTheAirGameMusic.mp3"))
        .catch((err) => err)
        .then(async () => {
          await bgMusic.current
            .stopAsync()
            .catch((err) => err)
            .then(async () => {
              await gameMusic.current
                .playAsync()

                .catch((err) => err)
                .finally(
                  async () =>
                    await gameMusic.current
                      .setIsLoopingAsync(true)
                      .catch((err) => err)
                );
            });
        });
    }
  },
  playBackgroundMusic: async function playBackgroundMusic(bgMusic) {
    if (!bgMusic.current._loaded) {
      await bgMusic.current
        .loadAsync(require("../assets/audio/SwingBackgroundMusic.mp3"))
        .catch((err) => err)
        .then(
          async () =>
            await bgMusic.current
              .playAsync()
              .catch((err) => err)
              .finally(
                async () =>
                  await bgMusic.current
                    .setIsLoopingAsync(true)
                    .catch((err) => err)
              )
        );
    }
  },
};

export default Sounds;
