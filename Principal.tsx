import React, { useState } from 'react';
import { Modal, SafeAreaView, Text, Button, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Menu from './src/menu';
import Dificultad from './src/dificultad';  // Asegúrate de tener la ruta correcta
// Crear el stack de navegación
const Stack = createStackNavigator();

// Pantalla de inicio (HomeScreen)
function HomeScreen({ modalVisible, setModalVisible, navigation }: { modalVisible: boolean; setModalVisible: (visible: boolean) => void; navigation: any }) {
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
      <Button title="Iniciar juego" onPress={() => navigation.navigate('Menu')} color="#ff6347" />
      
      {/* Modal con información de créditos */}
      <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image source={require('./assets/images/img1.png')} style={styles.modalImage} />
            <Text style={styles.title}>Créditos</Text>
            <Text style={styles.text}>Proyecto Dirigido: {"\n"}M.A.V. Martha P. Luna González</Text>
            <Text style={styles.text}>Desarrollado por: {"\n"}Briseyda Silva Lopez</Text>
            <Text style={styles.text}>Leydi Francisca Vazquez Camacho</Text>
            <Text style={styles.text}>Carrera: {"\n"}Ingeniería en Computación</Text>
            <Text style={styles.text}>Versión: 1.0 </Text>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} color="#ff6347" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Segunda pantalla (SecondScreen)
function SecondScreen({ navigation }: { navigation: any }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¡Has llegado a la segunda pantalla!</Text>
      <Button title="Ir a la tercera pantalla" onPress={() => navigation.navigate('ThirdScreen')} />
    </SafeAreaView>
  );
}

// Nueva tercera pantalla (ThirdScreen)
function ThirdScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>¡Estás en la tercera pantalla!</Text>
    </SafeAreaView>
  );
}

// Componente principal de la app
function Principal() {
  const [modalVisible, setModalVisible] = useState(false);

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
                <TouchableOpacity onPress={() => ('Sonido')} style={styles.iconButton}>
                  <Image source={require('./assets/iconos/music.png')} style={styles.icon} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}


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
    fontSize: 18,
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
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    width: '85%',
  },
  modalImage: {
    width: 120, 
    height: 120, 
    marginBottom: 10,
  },
});

export default Principal;
