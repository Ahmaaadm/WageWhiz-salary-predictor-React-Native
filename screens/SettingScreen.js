import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Dimensions, Switch, Modal, TouchableOpacity } from 'react-native';
import { stopSound, playSound } from '../AudioPlayer'; // Update the import path if needed
import useStore from '../store'; // Import the Zustand store

const backgroundImage = require('../assets/settingimg.jpg'); // Replace with your image path

const SettingScreen = () => {
  const [isMusicOn, setIsMusicOn] = React.useState(true); // State to manage the music toggle
  const [modalVisible, setModalVisible] = React.useState(false); // State to manage the modal visibility
  const { selectedModel, setSelectedModel } = useStore(state => ({
    selectedModel: state.selectedModel,
    setSelectedModel: state.setSelectedModel
  }));

  const toggleMusic = () => {
    if (isMusicOn) {
      stopSound();
      setIsMusicOn(!isMusicOn);
    } else {
      playSound();
      setIsMusicOn(!isMusicOn);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>Music</Text>
          <Switch
            value={isMusicOn}
            onValueChange={toggleMusic}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isMusicOn ? "#dbdad0" : "#f4f3f4"}
          />
        </View>
        <View style={styles.settingContainer}>
          <Text style={styles.settingText}>Select Model</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.modelButton}>
            <Text style={styles.modelButtonText}>{selectedModel === 'gbr' ? 'GBR Model Engine' : 'RF Model Engine'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>More settings available soon...</Text>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => { setSelectedModel('gbr'); setModalVisible(false); }} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>GBR Model</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { setSelectedModel('rf'); setModalVisible(false); }} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>RF Model</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingTop: 30,
  },
  header: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 32,
    fontWeight: 'bold',
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  settingText: {
    color: 'white',
    fontSize: 20,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 18,
    fontStyle: 'italic',
  },
  modelButton: {
    backgroundColor: '#1e90ff', // Change color as needed
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  modelButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalButton: {
    backgroundColor: '#1e90ff', // Change color as needed
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SettingScreen;
