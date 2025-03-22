import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
const Dificultad = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButtonTop} 
        onPress={() => navigation.navigate('Principal')}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Selecciona la dificultad</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => {/* Lógica para empezar el juego */}}>
        <Text style={styles.buttonText}>Fácil</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {/* Lógica para empezar el juego */}}>
        <Text style={styles.buttonText}>Medio</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {/* Lógica para empezar el juego */}}>
        <Text style={styles.buttonText}>Difícil</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
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
  backButtonTop: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 12,
    backgroundColor: '#ff6347',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Dificultad;
