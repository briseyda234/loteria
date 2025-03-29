import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, Text, Button, StyleSheet, Image, View, TouchableOpacity,ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Sound from 'react-native-sound';
import Menu from './src/menu';
import Idioma from './src/idioma';
import Español from './src/dificultadE';
import NivelFacilEsp from './src/facilE';
import Dificultad from './src/dificultad';  // Asegúrate de tener la ruta correcta
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
        source={require('./src/fondo/flor_fondo_negro1.jpg')} // Reemplaza con tu imagen
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
        <Stack.Screen name="Dificultad" component={Dificultad} />
        <Stack.Screen name="Idioma" component={Idioma} options={{ headerShown: false }} />
        <Stack.Screen name="Español" component={Español} options={{ headerShown: false }} />
        <Stack.Screen name="NivelFacilEsp" component={NivelFacilEsp} options={{ headerShown: false }} />
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
    height:'109%',
    paddingTop: 35, // Ajusta el desplazamiento hacia arriba
  },
  colorContainer: {
    flex: 1, // Ocupa la mitad inferior
    backgroundColor: 'red', // Color sólido
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  titleContainer: {
    color:'white',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fefefe',
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
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default Principal;
