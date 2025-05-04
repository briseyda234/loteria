import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, Text, Button, StyleSheet, Image, View, TouchableOpacity,ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sound from 'react-native-sound';
import Menu from './src/menu';
import Idioma from './src/idioma';
import DificultadEsp from './src/dificultadEsp';
import DificultadZap from './src/dificultadZap'; 
import NivelFacilEsp from './src/facilE';
import NivelMedioEsp from './src/medioE';
import NivelDificilEsp from './src/dificilE';
import { Dimensions, ScrollView} from 'react-native';
const { width, height } = Dimensions.get('window');

import NivelFacilZap from './src/facilZ';
import NivelMedioZap from './src/medioZ';
import NivelDificilZap from './src/dificilZ';
// Crear el stack de navegación
const Stack = createStackNavigator();
const Principal = () => {
 // const [backgroundMusic, setBackgroundMusic] = useState(null);
 const [backgroundMusic, setBackgroundMusic] = useState<Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [icon, setIcon] = useState(require('./assets/iconos/music.png')); // Icono inicial

  useEffect(() => {
    // Cargar el sonido al iniciar la app
    const music = new Sound(require('./assets/audio/musica1.mp3'), (error) => {

      if (error) {
        console.log('Error al cargar la música:', error);
        return;
      }
        music.setVolume(0.2); // Reducir el volumen al 30%
      music.setNumberOfLoops(-1); // -1 para repetir infinito
      music.play(); // Inicia la música automáticamente
      setBackgroundMusic(music);
    });

    return () => {
      // Limpiar el sonido al cerrar la app
      if (music) {
        music.release();
      }
    };
  }, []);

const toggleSound = () => {
  if (backgroundMusic) {
    if (isPlaying) {
      backgroundMusic.pause();
      setIcon(require('./assets/iconos/musicoff.png')); // Cambia el icono a "mute"
    } else {
      backgroundMusic.play();
      setIcon(require('./assets/iconos/music.png')); // Cambia el icono a "play"
    }
    setIsPlaying(!isPlaying);
  }
};

// Pantalla de inicio (HomeScreen)
function HomeScreen({ modalVisible, setModalVisible, navigation }: { modalVisible: boolean; setModalVisible: (visible: boolean) => void; navigation: any}) {
  return (
    <SafeAreaView style={styles.container}>
   
      {/* Sección superior con imagen */}
      <ImageBackground 
        source={require('./src/fondo/flor_fondo_negro33.png')} // Reemplaza con tu imagen
        style={styles.imageContainer}
         resizeMode="cover"
      >
      
      </ImageBackground>

      {/* Sección inferior con color sólido */}
      <View style={styles.colorContainer}>
      <View style={styles.titleContainer}>
          <Text style={styles.title}>MEMORAMA</Text>
          <Text style={styles.title}>ZAPOTECA</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Idioma')}>
    <Text style={styles.buttonText}>Iniciar Juego</Text>
  </TouchableOpacity>
      </View>

      
      {/* Modal con información de créditos */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
        
          <View style={styles.modalContent}>
          <ScrollView style={styles.scrollView}>
            <Image source={require('./assets/images/logo.jpg')} style={styles.modalImage} />
            <Text style={styles.title1}>Créditos</Text>
            <Text style={styles.text}>Proyecto: {"\n"}"Memorama Zapoteca"</Text>
          <Text style={styles.text}>Directora de proyecto--Diseño e ilustración{"\n"}M.A.V. Martha Patricia Luna González</Text>
          <Text style={styles.text}>Especialista externo{"\n"}M.C.C. Nieva García Omar Santiago</Text>
          <Text style={styles.text}>Desarrollo{"\n"}Vásquez Camacho Leydi Francisca</Text>
          <Text style={styles.text}>Desarrollo{"\n"}Silva López Briseyda</Text>
          <Text style={styles.text}>Ilustración{"\n"}Cruz Carrasco Martha Leticia</Text>
          <Text style={styles.text}>Ilustración{"\n"}Hernández Gómez Leibniz</Text>
          <Text style={styles.text}>Ilustración{"\n"}López Cirilo Kevin Alexis</Text>
          <Text style={styles.text}>Traducción al zapoteco{"\n"}Orlando Vinicio Trujillo Orozco</Text>
          <Text style={styles.text}>Voz femenina en español-castellano{"\n"}Alquisiris Quecha Kelly</Text>
          <Text style={styles.text}>Voz femenina en zapoteco{"\n"}Sánchez Vicente Jacqueline Guadalupe </Text>
            <Text style={styles.text}>Carrera: {"\n"}Ingeniería en Computación{"\n"}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
  <Text style={styles.closeButtonText}>Cerrar</Text>
</TouchableOpacity>
            </ScrollView>
          </View>
          
        </View>
      </Modal>
    </SafeAreaView>
  );
}


// Componente principal de la app

  const [modalVisible, setModalVisible] = useState(false);
  //const[isPlaying,setIsPlaying]=useState(true);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen 
          name="HomeScreen"
          options={{
            headerTransparent: true, // Hace que el header sea transparente
            headerTitle: '',
           // headerStyle: { backgroundColor: '#6200ea' },
            headerTintColor: 'white',
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={toggleSound} style={styles.iconButton}>
                  <Image 
                  source={icon} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.iconButton}>
                  <Image source={require('./assets/iconos/icono1.png')} style={styles.icon} />
                </TouchableOpacity>
              </View>
            ),
          }}
        >
          {(props) => <HomeScreen {...props} modalVisible={modalVisible} setModalVisible={setModalVisible} />}
        </Stack.Screen>
        <Stack.Screen name="Menu" component={Menu} options={{ headerTitle: '' }} />
        <Stack.Screen name="Idioma" component={Idioma} options={{ headerShown: false }} />
        <Stack.Screen name="Español" component={DificultadEsp} options={{ headerShown: false }} />
        <Stack.Screen name="Zapoteco" component={DificultadZap} options={{ headerShown: false }} />
        <Stack.Screen name="NivelFacilEsp" component={NivelFacilEsp} options={{ headerShown: false }} />
        <Stack.Screen name="NivelMedioEsp" component={NivelMedioEsp} options={{ headerShown: false }} />
        <Stack.Screen name="NivelDificilEsp" component={NivelDificilEsp} options={{ headerShown: false }} />
        <Stack.Screen name="NivelFacilZap" component={NivelFacilZap} options={{ headerShown: false }} />
        <Stack.Screen name="NivelMedioZap" component={NivelMedioZap} options={{ headerShown: false }} />
        <Stack.Screen name="NivelDificilZap" component={NivelDificilZap} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    
  },
  imageContainer: {
    flex: 1, // Ocupa la mitad superior
    justifyContent: 'flex-start', // Alinea la imagen hacia arriba
    width: '100%',
    paddingTop: 35, // Ajusta el desplazamiento hacia arriba
  },
  colorContainer: {
    flex: 1, // Ocupa la mitad inferior
    backgroundColor: 'red', // Color sólido
    justifyContent: 'center',
    alignItems: 'center',
   
    width: width, // Usa el ancho de la pantalla
    height: height, // Usa la altura de la pantalla 
  },
  titleContainer: {
    color:'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 20,
    fontFamily:'Roboto',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    color: '#fefefe',
    textAlign: 'center',  
    marginBottom:1,
    fontFamily:'sans-serif-light',
    fontWeight: 'bold',
  },
  title1: {
    fontSize: 28,
    fontFamily:'sans-serif-light',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 250, 
    height: 250,
    marginVertical: 20, 
  },
  text: {
    fontSize: 13,
    color: 'white',
    marginTop: 15,
    textAlign: 'center',
    fontFamily:'sans-serif-light',
    fontWeight: 'bold',
  },

  iconButton: {
    marginRight: 15,
    padding: 5,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: 'white', // Para cambiar el color si el icono es monocromático
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   // backgroundColor: 'rgba(166, 5, 5, 0.5)',
  },
  modalContent: {
    fontFamily:'sans-serif-light',
    fontWeight: 'bold',
   color: 'white',
  backgroundColor: 'rgb(29, 29, 29)',
   // padding: 30,   
    borderRadius: 15,
    alignItems: 'center',
    width: width * 0.85, // 85% del ancho de la pantalla
    maxHeight: height * 0.8, // 80% de la altura de la pantalla
  },
  scrollView:{
width:'100%',
  },
  modalImage: {
    top:10,
    width: 100, 
    height: 100, 
    marginBottom: 10,
    alignItems:'center',
    alignSelf: 'center'
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
  closeButton:{
    backgroundColor: 'rgb(255, 251, 251)', // Rojo vibrante
    padding: 10,
    borderColor: '#fff',
    marginVertical: 10,
    borderRadius: 10,
    alignSelf: 'center', // Centrar el botón dentro del modal
    borderRightWidth: 2,
    borderLeftWidth: 4,
    borderBottomWidth: 2,
    width:'60%'
  },
  closeButtonText: {
    fontFamily:'sans-serif-light',
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.88)',
    textAlign: 'center',
    fontSize: 20,
  },
  modalBackground: {
    flex: 1,
    width: '100%',
    justifyContent: 'center', 
    alignItems: 'center', 
  },
});

export default Principal;
