import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Español = ({ navigation }) => {
  return (
    <ImageBackground 
          source={require('./fondo/lienzo.jpg')} 
          style={styles.background}
    >
      <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Regresar</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona la dificultad:</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NivelFacilEsp')}>
          <Text style={styles.buttonText}>Fácil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* Lógica para empezar el juego */}}>
          <Text style={styles.buttonText}>Medio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* Lógica para empezar el juego */}}>
          <Text style={styles.buttonText}>Difícil</Text>
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
  back: {
    position: 'absolute', 
    top: 40,  // Distancia desde la parte superior (ajústalo según sea necesario)
    right: 20, // Lo alinea al lado derecho
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semitransparente para mejor visibilidad
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Español;
