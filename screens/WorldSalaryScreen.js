import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, ImageBackground } from 'react-native';

const backgroundImage = require('../assets/salaryimage.jpg'); // Replace with your image path

const { width } = Dimensions.get('window');

const PlayersScreen = () => {
  // Import JSON data
  const data = require('../assets/data.json');

  // Render the header
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Name</Text>
      <Text style={styles.headerText}>Age</Text>
      <Text style={styles.headerText}>Goals</Text>
      <Text style={styles.headerText}>Assists</Text>
      <Text style={[styles.headerText, styles.headerWage]}>Wage</Text>
    </View>
  );

  // Render each row
  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.age}</Text>
      <Text style={styles.cell}>{item.goals}</Text>
      <Text style={styles.cell}>{item.assists}</Text>
      <Text style={[styles.cell, styles.wage]}>{`€${item.wage.toLocaleString()}`}</Text>
    </View>
  );

  return (
    <ImageBackground
      source={backgroundImage}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {renderHeader()}
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  headerWage: {
    color: '#93d400',
  },
  row: {
    flexDirection: 'row',
    backgroundColor: 'rgba(38, 152, 240, 0.5)',
    padding: 10,
    marginBottom: 5,
    borderRadius: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color:"#fff"
  },
  wage: {
    color: '#93d400',
    fontWeight: 'bold',
  },
});

export default PlayersScreen;
