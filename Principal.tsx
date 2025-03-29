import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, Text, Button, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
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
      {/* Contenedor del título */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>MEMORAMA</Text>
        <Text style={styles.title}>ZAPOTECA</Text>
      </View>

      {/* Imagen en el centro */}
      <Image source={require('./assets/images/memorama1.png')} style={styles.image} />

      {/* Botón para iniciar juego y navegar a la segunda pantalla */}
      <Button title="Iniciar juego" onPress={() => navigation.navigate('Idioma')} color="#ff6347" />
      
      {/* Modal con información de créditos */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('./assets/images/img1.png')} style={styles.modalImage} />
            <Text style={styles.title}>Créditos</Text>
            <Text style={styles.text}>Proyecto: "Memorama Zapoteca"</Text>
          <Text style={styles.text}>M.A.V. Martha Patricia Luna González --Directora de proyecto--Diseño e ilustración</Text>
          <Text style={styles.text}>M.C.C. Nieva García Omar Santiago -- Especialista externo</Text>
          <Text style={styles.text}>Vásquez Camacho Leydi Francisca -- Desarrollo</Text>
          <Text style={styles.text}>Silva López Briseyda -- Desarrollo</Text>
          <Text style={styles.text}>Cruz Carrasco Martha Leticia -- Ilustración</Text>
          <Text style={styles.text}>Hernández Gómez Leibniz -- Ilustración</Text>
          <Text style={styles.text}>López Cirilo Kevin Alexis -- Ilustración</Text>
          <Text style={styles.text}>Orlando Vinicio Trujillo Orozco -- Traducción al zapoteco</Text>
          <Text style={styles.text}>Alquisiris Quecha Kelly -- Voz femenina en español-castellano</Text>
          <Text style={styles.text}>Sánchez Vicente Jaqueline Guadalupe -- Voz femenina en zapoteco</Text>
            <Text style={styles.text}>Carrera: {"\n"}Ingeniería en Computación{"\n"}</Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} color="#ff6347" />
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
            headerTitle: '',
            headerStyle: { backgroundColor: '#6200ea' },
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
    padding: 20,
    backgroundColor: '#E7E1F2',
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ea',
    textAlign: 'center',
    marginBottom: 10,
  },
  image: {
    width: 250, 
    height: 250,
    marginVertical: 20, 
  },
  text: {
    fontSize: 11,
    color: '#333',
    marginTop: 15,
    textAlign: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
  fontFamily:'sans-serif-light',
   fontWeight:'normal',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    width: '85%',
  },
  modalImage: {
    width: 100, 
    height: 100, 
    marginBottom: 10,
  },
});

export default Principal;
