import React, { useState, useEffect } from 'react';
import Sound from 'react-native-sound';
import { View, TouchableOpacity, Image, StyleSheet, Modal, Text, Button, ImageBackground } from 'react-native';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const numColumns = 4;
const cardMargin = 3;
const cardWidth = (screenWidth - (cardMargin * 2 * numColumns)) / numColumns;
const cardHeight = cardWidth * 1.4;

Sound.setCategory('Playback');

const allImages = [
  require('./images/imagesZap/1_Ngupi.jpg'),
  require('./images/imagesZap/3_Biux.jpg'),
  require('./images/imagesZap/5_Miaxubi.jpg'),
  require('./images/imagesZap/7_Ladxido.jpg'),
  require('./images/imagesZap/8_Guenda.jpg'),
  require('./images/imagesZap/9_Bicu.jpg'),
  require('./images/imagesZap/11_Guixhe.jpg'),
  require('./images/imagesZap/12_Gubidxa.jpg'),
  require('./images/imagesZap/14_Gueta.jpg'),
  require('./images/imagesZap/15_Zuquii.jpg'),
  require('./images/imagesZap/16_Muxe.jpg'),
  require('./images/imagesZap/17_Gunaa.jpg'),
  require('./images/imagesZap/18_Xigagueta.jpg'),
  require('./images/imagesZap/19_Guelaguidi.jpg'),
  require('./images/imagesZap/20_Belegui.jpg'),
  require('./images/imagesZap/21_Bigu.jpg'),
  require('./images/imagesZap/22_Bizi.jpg'),
  require('./images/imagesZap/23_Baquizxava.jpg'),
  require('./images/imagesZap/24_Binnigue.jpg'),
  require('./images/imagesZap/25_Guichi.jpg'),
  require('./images/imagesZap/26_Tanguyu.jpg'),
  require('./images/imagesZap/27_Beeu.jpg'),
  require('./images/imagesZap/28_Bigose.jpg'),
  require('./images/imagesZap/29_Bizuudi.jpg'),
  require('./images/imagesZap/30_Nisadxu.jpg'),
  require('./images/imagesZap/32_Guiba.jpg'),
  require('./images/imagesZap/33_Guzana.jpg'),
  require('./images/imagesZap/34_Larindxo.jpg'),
  require('./images/imagesZap/35_Binii.jpg'),
  require('./images/imagesZap/36_Benda.jpg'),
  require('./images/imagesZap/37_Bidxi.jpg'),
  require('./images/imagesZap/38_Binidxaba.jpg'),
  require('./images/imagesZap/39_Binniguiba.jpg'),
  require('./images/imagesZap/40_Guchachi.jpg'),
  require('./images/imagesZap/41_Bendabuaa.jpg'),
  require('./images/imagesZap/42_Guiexhuuba.jpg'),
  require('./images/imagesZap/43_Soon.jpg'),
  require('./images/imagesZap/44_Yoo.jpg'),
  require('./images/imagesZap/45_Xhuana.jpg'),
  require('./images/imagesZap/46_Mango.jpg'),
  require('./images/imagesZap/47_Marena.jpg'),
  require('./images/imagesZap/48_Bidaani.jpg'),
  require('./images/imagesZap/49_Luuna.jpg'),
  require('./images/imagesZap/50_Guiechachi.jpg'),
  require('./images/imagesZap/51_Beenda.jpg'),
  require('./images/imagesZap/52_Tlayuda.jpg'),
  require('./images/imagesZap/53_Gunaabenda.jpg'),
  require('./images/imagesZap/54_Berengola.jpg'),
];

const allSounds = [
  require('./assets/zap/1_ngupi.wav'),
  require('./assets/zap/3_biuxi.wav'),
  require('./assets/zap/5_miaxubi.wav'),
  require('./assets/zap/7_ladxido.wav'),
  require('./assets/zap/8_guendarati.wav'),
  require('./assets/zap/9_bicu.wav'),
  require('./assets/zap/11_guixhe.wav'),
  require('./assets/zap/12_gubidxa.wav'),
  require('./assets/zap/14_guetabigui.wav'),
  require('./assets/zap/15_zuquii.wav'),
  require('./assets/zap/16_muxe.wav'),
  require('./assets/zap/gunaa.mp3'), //
  require('./assets/zap/18_xigagueta.wav'),
  require('./assets/zap/19_guelaguidi.wav'),
  require('./assets/zap/20_belegui.wav'),
  require('./assets/zap/21_bigu.wav'),
  require('./assets/zap/22_bizi.wav'),
  require('./assets/zap/23_baquizxava.wav'),
  require('./assets/zap/24_binnigue.wav'),
  require('./assets/zap/25_guichibiaagueta.wav'),
  require('./assets/zap/26_tanguyu.wav'),
  require('./assets/zap/27_beeu.wav'),
  require('./assets/zap/28_bigose.wav'),
  require('./assets/zap/29_bizuudi.wav'),
  require('./assets/zap/30_nisadxuni.wav'),
  require('./assets/zap/32_guibarusanii.wav'),
  require('./assets/zap/33_guzana.wav'),
  require('./assets/zap/34_larindxo.wav'),
  require('./assets/zap/35_binniguuze.wav'),
  require('./assets/zap/36_benda.wav'),
  require('./assets/zap/bidxi.mp3'), //
  require('./assets/zap/38_binidxaba.wav'),
  require('./assets/zap/39_binniguiba.wav'),
  require('./assets/zap/40_guchachi.wav'),
  require('./assets/zap/41_bendabuaa.wav'),
  require('./assets/zap/42_guiexhuuba.wav'),
  require('./assets/zap/43_songuuzebenda.wav'),
  require('./assets/zap/44_yoo.wav'),
  require('./assets/zap/xhuana.mp3'), //
  require('./assets/zap/mango.mp3'), //
  require('./assets/zap/marena.mp3'), //
  require('./assets/zap/48_bidaani.wav'),
  require('./assets/zap/49_luuna.wav'),
  require('./assets/zap/guiechachi.mp3'), //
  require('./assets/zap/beenda.mp3'), //
  require('./assets/zap/tlayuda.mp3'), //
  require('./assets/zap/gunaabenda.mp3'), //
  require('./assets/zap/berengola.mp3'), //
];

const getRandomPairs = (numPairs) => {
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numPairs);
  return [...selected, ...selected].sort(() => Math.random() - 0.5);
};

const Memorama = ({ navigation }) => {
  const [cards, setCards] = useState(getRandomPairs(6));
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    let timer;
    if (timerRunning && time > 0) {
      timer = setInterval(() => setTime((prev) => prev - 1), 1000);
    } else if (time === 0) {
      setTimerRunning(false);
      setGameOver(true);
    }
    return () => clearInterval(timer);
  }, [timerRunning, time]);

  useEffect(() => {
    if (flippedIndexes.length === 2) {
      const [firstIndex, secondIndex] = flippedIndexes;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedIndexes((prev) => [...prev, firstIndex, secondIndex]);
      }
      setTimeout(() => setFlippedIndexes([]), 500);
    }
  }, [flippedIndexes]);

  useEffect(() => {
    if (matchedIndexes.length === cards.length && cards.length > 0) {
      setGameWon(true);
      setTimerRunning(false);
    }
  }, [matchedIndexes, cards]);

  /*const handlePress = (index) => {
    if (!flippedIndexes.includes(index) && !matchedIndexes.includes(index)) {
      setFlippedIndexes([...flippedIndexes, index]);
      if (!timerRunning) setTimerRunning(true);
    }
  };*/

  const handlePress = (index) => {
    if (!flippedIndexes.includes(index) && !matchedIndexes.includes(index)) {
      const newFlipped = [...flippedIndexes, index];
      setFlippedIndexes(newFlipped);
  
      playSpecificSound(cards[index]); 
  
      if (!timerRunning) setTimerRunning(true);
    }
  };  

  const playSpecificSound = (imageSource) => {
    const imageIndex = allImages.findIndex(img => img === imageSource);

    console.log('Índice de imagen:', imageIndex);
    console.log('Ruta del sonido:', allSounds[imageIndex]);
  
    if (imageIndex !== -1 && allSounds[imageIndex]) {
      //const sound = new Sound(`sounds/${allSounds[imageIndex]}`, Sound.MAIN_BUNDLE, (error) => {
      const sound = new Sound(allSounds[imageIndex], (error) => {
        if (error) {
          console.log('Error al cargar el audio:', error);
          return;
        }
  
        sound.play((success) => {
          if (!success) {
            console.log('Error al reproducir sonido');
          }
          sound.release();
        });
      });
    }
  };  

  const restartGame = () => {
    setCards(getRandomPairs(6));
    setFlippedIndexes([]);
    setMatchedIndexes([]);
    setGameWon(false);
    setGameOver(false);
    setTime(180);
    setTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }; 

/*  const playSpecificSound = (imageSource) => {
    const imageIndex = allImages.findIndex(img => img === imageSource);
  
    if (imageIndex !== -1 && allSounds[imageIndex]) {
      const sound = new Sound(allSounds[imageIndex], Sound.MAIN_BUNDLE, (error) => {
        if (error) {
          console.log('Error al cargar el audio:', error);
          return;
        }
  
        sound.play((success) => {
          if (!success) {
            console.log('Error al reproducir sonido');
          }
          sound.release(); // Libera la memoria
        });
      });
    }
  };  */

  return (
    <View style={styles.container}>
      {/* Botón de regreso con icono */}
      <TouchableOpacity style={styles.back} onPress={() => setModalVisible(true)}>
        <Image source={require('../assets/iconos/deshacer.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <View style={styles.controls}>
        <Text style={styles.timerText}>TIEMPO RESTANTE{'\n'}{formatTime(time)}</Text>
      </View>

      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity 
            key={index} 
            style={styles.card} 
            onPress={() => handlePress(index)}
            disabled={matchedIndexes.includes(index)}
          >
            <Image 
              source={flippedIndexes.includes(index) || matchedIndexes.includes(index) ? card : require('./images/reverso2.jpg')} 
              style={styles.image} 
            />
          </TouchableOpacity>
        ))}
      </View>

    <Modal transparent={true} visible={modalVisible} animationType="fade">
  <View style={styles.modalBackground1}>
    <View style={styles.modalContainer1}>
      <Text style={styles.modalText1}>¿Estás seguro de abandonar el juego?</Text>
      <View style={styles.buttonRow1}>
        <TouchableOpacity
          style={styles.buttonYes1}
          onPress={() => {
            setModalVisible(false);
            if (navigation.canGoBack()) {
              navigation.goBack();
            } else {
              navigation.navigate('Menu');
            }
          }}
        >
          <Text style={styles.buttonText1}>Sí</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonNo1}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.buttonText1}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>

</Modal>

      <Modal visible={gameWon} transparent={true} animationType="slide">
        <ImageBackground source={require("./fondo/fondo.jpg")} style={styles.modalBackground} imageStyle={{opacity: 0.8}}>
          <Text style={styles.modalText}>¡Felicidades!{"\n"}Has ganado</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={restartGame}>
                <Text style={styles.buttonText}>JUGAR DE NUEVO</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>REGRESAR</Text>
              </TouchableOpacity>
            </View>
        </ImageBackground>
      </Modal>

      {/*<Modal visible={gameOver} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡El tiempo se ha acabado!</Text>
            <Button title="INTENTAR DE NUEVO" onPress={restartGame} />
          </View>
        </View>
      </Modal>*/}

      <Modal visible={gameOver} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText2}>¡El tiempo se ha acabado!</Text>
              <TouchableOpacity style={styles.button2} onPress={restartGame}>
                <Text style={styles.buttonText}>INTENTAR DE NUEVO</Text>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    marginTop: 20,
  },
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center", 
    color: "#333",
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    //borderColor: '#fff',
    //borderRadius: 10,
    marginVertical: 10,
    width: '40%',
    height: '40%',
    backgroundColor: 'rgb(255, 251, 251)',
    //borderRightWidth: 2,
    //borderLeftWidth: 2,
    //borderBottomWidth: 4,
    alignItems: "center", 
    justifyContent: "center", 
  },
  buttonText: {
    color: 'rgb(104, 95, 95)',
    textAlign: 'center',
    fontSize: 18,
    //fontWeight: 'bold',
  },
  button2: {
    //borderColor: '#000',
    //borderRadius: 10,
    marginVertical: 10,
    width: '50%',
    backgroundColor: 'rgb(233, 233, 233)',
    //borderRightWidth: 2,
    //borderLeftWidth: 2,
    //borderBottomWidth: 4,
    //justifyContent: "center", 
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    margin: cardMargin,
  },  
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  modalText2: {
    fontSize: 25,
    //fontWeight: 'bold',
    color: '#515151',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 0, 0, 0.5)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 25,
    //fontWeight: 'bold',
    color: 'rgb(255, 251, 251)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-between',
    gap: 25,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backIcon: {
    width: 35, // Ajusta el tamaño del icono
    height: 35,
    tintColor: '#fff', // Ajusta el color si es necesario
  },
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  modalBackground1: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer1: {
   // backgroundColor: 'white',
   backgroundColor: '#ef5350', // Fondo rojo cálido para el contenedor
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText1: {
    fontSize: 17,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'sans-serif-light',
    fontWeight: 'bold',
    color: 'white', // Texto negro
  },
  buttonRow1: {
    flexDirection: 'row',
    gap: 20,
  },
  buttonYes1: {
    fontFamily: 'sans-serif-light',
  fontWeight: 'bold',
  textAlign: 'center',
  //fontSize: 20,
  backgroundColor: '#fff', // Fondo blanco
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: '#fff',
    
  },
  
  buttonNo1: {
    fontFamily: 'sans-serif-light',
  fontWeight: 'bold',
  textAlign: 'center',
  //fontSize: 20,
  backgroundColor: '#fff', // rojo claro
  paddingHorizontal: 15,
  paddingVertical: 10,
  borderRadius: 8,
  borderWidth: 2,
  borderColor: '#fff',
  },
  
  buttonText1: {
    fontFamily: 'sans-serif-light',
  fontWeight: 'bold',
  textAlign: 'center',
  fontSize: 20,
  color: '#000', // Texto negro
 // paddingHorizontal: 10,
  //paddingVertical: 5,
  
  },
  
});

export default Memorama;