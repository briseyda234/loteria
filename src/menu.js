import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Menu = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>JUEGO DE MEMORIA</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dificultad')}>
        <Text style={styles.buttonText}>JUGAR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    marginVertical: 8,
    width: '80%',
    backgroundColor: '#6200ee',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default Menu;
