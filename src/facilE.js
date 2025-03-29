import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal, Text, Button, ImageBackground } from 'react-native';

const allImages = [
  require('./images/imagesEsp/1_Armadillo.jpg'),
  require('./images/imagesEsp/3_Mosquito.jpg'),
  require('./images/imagesEsp/5_Alacran.jpg'),
  require('./images/imagesEsp/7_Corazon.jpg'),
  require('./images/imagesEsp/8_Muerte.jpg'),
  require('./images/imagesEsp/9_Perro.jpg'),
  require('./images/imagesEsp/11_Hamaca.jpg'),
  require('./images/imagesEsp/12_Sol.jpg'),
  require('./images/imagesEsp/14_Totopo.jpg'),
  require('./images/imagesEsp/15_Horno.jpg'),
  require('./images/imagesEsp/16_Muxe.jpg'),
  require('./images/imagesEsp/17_Dama.jpg'),
  require('./images/imagesEsp/18_Jicalpextle.jpg'),
  require('./images/imagesEsp/19_Huarache.jpg'),
  require('./images/imagesEsp/20_Estrella.jpg'),
  require('./images/imagesEsp/21_Tortuga.jpg'),
  require('./images/imagesEsp/22_Tlacuache.jpg'),
  require('./images/imagesEsp/23_Tarantula.jpg'),
  require('./images/imagesEsp/24_Borracho.jpg'),
  require('./images/imagesEsp/25_Nopal.jpg'),
  require('./images/imagesEsp/26_Muneca.jpg'),
  require('./images/imagesEsp/27_Luna.jpg'),
  require('./images/imagesEsp/28_Zanate.jpg'),
  require('./images/imagesEsp/29_Enagua.jpg'),
  require('./images/imagesEsp/30_Mezcal.jpg'),
  require('./images/imagesEsp/32_Joya.jpg'),
  require('./images/imagesEsp/33_Mayordomo.jpg'),
  require('./images/imagesEsp/34_Bandera.jpg'),
  require('./images/imagesEsp/35_Pescador.jpg'),
  require('./images/imagesEsp/36_Mojarra.jpg'),
  require('./images/imagesEsp/37_Rana.jpg'),
  require('./images/imagesEsp/38_Diablito.jpg'),
  require('./images/imagesEsp/39_Soldado.jpg'),
  require('./images/imagesEsp/40_Iguana.jpg'),
  require('./images/imagesEsp/41_Camaron.jpg'),
  require('./images/imagesEsp/42_Jazmin.jpg'),
  require('./images/imagesEsp/43_SonDelPescado.jpg'),
  require('./images/imagesEsp/44_Casa.jpg'),
  require('./images/imagesEsp/45_Xhuana.jpg'),
  require('./images/imagesEsp/46_Mango.jpg'),
  require('./images/imagesEsp/47_Marena.jpg'),
  require('./images/imagesEsp/48_Huipil.jpg'),
  require('./images/imagesEsp/49_Catre.jpg'),
  require('./images/imagesEsp/50_FlorDeMayo.jpg'),
  require('./images/imagesEsp/51_Serpiente.jpg'),
  require('./images/imagesEsp/52_Tlayuda.jpg'),
  require('./images/imagesEsp/53_Sirena.jpg'),
  require('./images/imagesEsp/54_Gallo.jpg'),
];

const getRandomPairs = (numPairs) => {
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numPairs);
  return [...selected, ...selected].sort(() => Math.random() - 0.5);
};

const Memorama = ({ navigation }) => {
  const [cards, setCards] = useState(getRandomPairs(5));
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(300);
  const [timerRunning, setTimerRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);

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

  const handlePress = (index) => {
    if (!flippedIndexes.includes(index) && !matchedIndexes.includes(index)) {
      setFlippedIndexes([...flippedIndexes, index]);
      if (!timerRunning) setTimerRunning(true);
    }
  };

  const restartGame = () => {
    setCards(getRandomPairs(5));
    setFlippedIndexes([]);
    setMatchedIndexes([]);
    setGameWon(false);
    setGameOver(false);
    setTime(300);
    setTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      <View style={styles.container}>
        <Text style={styles.timerText}>
          Tiempo restante:{"\n"}
          {minutes}:{remainingSeconds < 10 ? '0' : ''}{remainingSeconds}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* 🕒 Controles superiores */}
      <View style={styles.controls}>
        <Text style={styles.timer}>{formatTime(time)}</Text>
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

      <Modal visible={gameOver} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Tiempo agotado!</Text>
            <Button title="Intentar de nuevo" onPress={restartGame} />
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
    borderColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    width: '40%',
    height: '40%',
    backgroundColor: '#6200ee',
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 4,
    alignItems: "center", 
    justifyContent: "center", 
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    width: 70,
    height: 100,
    margin: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  modalText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
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
});

export default Memorama;
