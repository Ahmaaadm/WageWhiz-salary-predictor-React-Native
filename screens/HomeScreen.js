import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';
import { playSound, stopSound } from '../AudioPlayer'; // Ensure the correct import path

// Import the local image
const backgroundImage = require('../assets/hw2.jpg');

// Get the dimensions of the screen
const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    const initializeSound = async () => {
      try {
        // await loadSound();
        await playSound();
      } catch (error) {
        console.error('Error loading or playing sound:', error);
      }
    };

    initializeSound();

    // Clean up sound on component unmount
    return () => {
      // unloadSound();
    };
  }, []);

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main')}>
          <Text style={styles.buttonText}>Let's Start</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 110, // Adjust this value to control the distance from the bottom
    alignSelf: 'center', // Center the button horizontally
    backgroundColor: '#7987A1', // Change this to your desired background color
    padding: 25,
    borderRadius: 35,
  },
  buttonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Ubuntu',
  },
});

export default HomeScreen;
