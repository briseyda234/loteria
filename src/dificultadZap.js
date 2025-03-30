import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground,Image} from 'react-native';

const Zapoteco = ({ navigation }) => {
  return (
    <ImageBackground source={require('./fondo/fondo1.jpg')} style={styles.background}>
      <View style={styles.container}>
        {/* Botón de regreso con icono */}
        <TouchableOpacity style={styles.back} onPress={() => navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Idioma')}>
          <Image source={require('../assets/iconos/deshacer.png')} style={styles.backIcon} />
        </TouchableOpacity>

        <Text style={styles.title}>Selecciona la dificultad:</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NivelFacilZap')}>
          <Text style={styles.buttonText}>Fácil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NivelMedioZap')}>
          <Text style={styles.buttonText}>Medio</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NivelDificilZap')}>
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
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
    backgroundColor:'rgba(0, 0, 0, 0.88)',
  },
  button: {
    padding: 10,
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    width: '60%',
    backgroundColor: 'rgb(255, 251, 251)',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
  },
  buttonText: {
    fontFamily:'sans-serif-light',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.88)',
    textAlign: 'center',
    fontSize: 20,
  },
  back: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backIcon: {
    width: 40, // Ajusta el tamaño del icono
    height: 40,
    tintColor: '#fff', // Ajusta el color si es necesario
  },
});

export default Zapoteco;
