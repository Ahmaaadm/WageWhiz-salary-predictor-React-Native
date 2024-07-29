// // src/utils/audioPlayer.js

// import { Audio } from 'expo-av';

// let sound = null;

// export const loadSound = async () => {
//   try {
//     if (sound) {
//       await sound.unloadAsync();
//       sound = null;
//     }
//     const { sound: newSound } = await Audio.Sound.createAsync(require('./assets/songs/fifasong1.mp3'));
//     sound = newSound;
//   } catch (error) {
//     console.error('Error loading sound:', error);
//   }
// };

// export const playSound = async () => {
//   try {
//     if (sound) {
//       await sound.playAsync();
//     }
//   } catch (error) {
//     console.error('Error playing sound:', error);
//   }
// };

// export const pauseSound = async () => {
//   try {
//     if (sound) {
//       await sound.pauseAsync();
//     }
//   } catch (error) {
//     console.error('Error pausing sound:', error);
//   }
// };

// export const stopSound = async () => {
//   try {
//     if (sound) {
//       await sound.stopAsync();
//     }
//   } catch (error) {
//     console.error('Error stopping sound:', error);
//   }
// };

// export const unloadSound = async () => {
//   try {
//     if (sound) {
//       await sound.unloadAsync();
//       sound = null;
//     }
//   } catch (error) {
//     console.error('Error unloading sound:', error);
//   }
// };
// src/utils/audioPlayer.js

import { Audio } from 'expo-av';

let sound = null;

const loadSound = async () => {
  try {
    if (sound) {
      await sound.unloadAsync();
      sound = null;
    }
    const { sound: newSound } = await Audio.Sound.createAsync(require('./assets/songs/fifasong1.mp3'));
    sound = newSound;
  } catch (error) {
    console.error('Error loading sound:', error);
  }
};

export const playSound = async () => {
  try {
    if (!sound) {
      await loadSound();
    }
    await sound.playAsync();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export const stopSound = async () => {
  try {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      sound = null;
    }
  } catch (error) {
    console.error('Error stopping sound:', error);
  }
};
