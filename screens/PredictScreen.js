import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import useStore from '../store'; // Import Zustand store

const backgroundImage = require('../assets/predictW.jpg');
const { width, height } = Dimensions.get('window');

const PredictScreen = () => {
  const [overall, setOverall] = useState(50);
  const [movementReaction, setMovementReaction] = useState(50);
  const [potential, setPotential] = useState(50);
  const [attackingShortPassing, setAttackingShortPassing] = useState(50);
  const [skillBallPassing, setSkillBallPassing] = useState(50);
  const [skillBallControl, setSkillBallControl] = useState(50);
  const [predictedSalary, setPredictedSalary] = useState(null);
  const { selectedModel } = useStore(state => ({
    selectedModel: state.selectedModel
  }));

  const handleSubmit = async () => {
    const features = [overall, movementReaction, potential, attackingShortPassing, skillBallPassing, skillBallControl];
    console.log(selectedModel);
    try {
      const response = await fetch('http://192.168.0.104:8000/api/predict/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features, model_choice: selectedModel }),
      });
      if (response.ok) {
        const result = await response.json();
        console.log('API Response:', result);
        setPredictedSalary(Math.floor(result.predicted_salary));
      } else {
        console.error('API Error:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <StatusBar style="light" />
        <View style={styles.formContainer}>
          <Text style={styles.label}>Overall</Text>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={overall} onValueChange={setOverall} />
          <Text style={styles.sliderValue}>{overall}</Text>

          <Text style={styles.label}>Movement Reaction</Text>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={movementReaction} onValueChange={setMovementReaction} />
          <Text style={styles.sliderValue}>{movementReaction}</Text>

          <Text style={styles.label}>Potential</Text>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={potential} onValueChange={setPotential} />
          <Text style={styles.sliderValue}>{potential}</Text>

          <Text style={styles.label}>Attacking Short Passing</Text>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={attackingShortPassing} onValueChange={setAttackingShortPassing} />
          <Text style={styles.sliderValue}>{attackingShortPassing}</Text>

          <Text style={styles.label}>Skill Ball Passing</Text>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={skillBallPassing} onValueChange={setSkillBallPassing} />
          <Text style={styles.sliderValue}>{skillBallPassing}</Text>

          <Text style={styles.label}>Skill Ball Control</Text>
          <Slider style={styles.slider} minimumValue={0} maximumValue={100} step={1} value={skillBallControl} onValueChange={setSkillBallControl} />
          <Text style={styles.sliderValue}>{skillBallControl}</Text>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Predict Salary</Text>
          </TouchableOpacity>
        </View>

        {predictedSalary !== null && (
          <Text style={styles.salaryText}>Predicted Salary:<Text style={styles.st}>€{predictedSalary}</Text></Text>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { width, height, justifyContent: 'flex-start', alignItems: 'center' },
  overlay: { flex: 1, width: '100%', paddingHorizontal: 20, justifyContent: 'flex-start' },
  formContainer: { width: '100%', paddingTop: 20, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 45, marginTop: 35, alignItems: 'center' },
  slider: { width: '100%', height: 20, marginBottom: 1 },
  label: { fontSize: 16, color: 'white', textAlign: 'center', marginBottom: 1 },
  sliderValue: { fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 20, fontFamily: 'Ubuntu', fontWeight: 'bold' },
  button: { backgroundColor: '#1e90ff', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold', fontFamily: 'Ubuntu' },
  salaryText: { fontSize: 24, color: 'white', marginTop: 20, fontFamily: 'Ubuntu', fontWeight: 'bold', textAlign: 'center' },
  st: { fontSize: 24, color: 'green', marginTop: 20, fontFamily: 'Ubuntu', fontWeight: 'bold', textAlign: 'center' },
});

export default PredictScreen;
