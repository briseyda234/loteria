import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Idioma = ({ navigation }) => {
  return (
    <ImageBackground 
      source={require('./fondo/lienzo.jpg')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona el idioma:</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Español')}>
          <Text style={styles.buttonText}>Español</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dificultad')}>
          <Text style={styles.buttonText}>Zapoteco</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff', 
  },
  button: {
    padding: 10,
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    backgroundColor: '#6200ee',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
  },
});

export default Idioma;
