import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal, Text, Button } from 'react-native';

const allImages = [
  require('./images/1_Armadillo.jpg'),
  require('./images/3_Mosquito.jpg'),
  require('./images/5_Alacran.jpg'),
  require('./images/7_Corazon.jpg'),
  require('./images/8_Muerte.jpg'),
  require('./images/9_Perro.jpg'),
  require('./images/11_Hamaca.jpg'),
  require('./images/12_Sol.jpg'),
  require('./images/14_Totopo.jpg'),
  require('./images/15_Horno.jpg'),
  require('./images/16_Muxe.jpg'),
  require('./images/17_Dama.jpg'),
  require('./images/18_Jicalpextle.jpg'),
  require('./images/19_Huarache.jpg'),
  require('./images/20_Estrella.jpg'),
  require('./images/21_Tortuga.jpg'),
  require('./images/22_Tlacuache.jpg'),
  require('./images/23_Tarantula.jpg'),
  require('./images/24_Borracho.jpg'),
  require('./images/25_Nopal.jpg'),
  require('./images/26_Muneca.jpg'),
  require('./images/27_Luna.jpg'),
  require('./images/28_Zanate.jpg'),
  require('./images/29_Enagua.jpg'),
  require('./images/30_Mezcal.jpg'),
  require('./images/32_Joya.jpg'),
  require('./images/33_Mayordomo.jpg'),
  require('./images/34_Bandera.jpg'),
  require('./images/35_Pescador.jpg'),
  require('./images/36_Mojarra.jpg'),
  require('./images/37_Rana.jpg'),
  require('./images/38_Diablito.jpg'),
  require('./images/39_Soldado.jpg'),
  require('./images/40_Iguana.jpg'),
  require('./images/41_Camaron.jpg'),
  require('./images/42_JazminIstmo.jpg'),
  require('./images/43_SonDelPescado.jpg'),
  require('./images/44_Casa.jpg'),
  require('./images/45_Xhuana.jpg'),
  require('./images/46_Mango.jpg'),
  require('./images/47_Marena.jpg'),
  require('./images/48_Huipil.jpg'),
  require('./images/49_Catre.jpg'),
  require('./images/50_FlorDeMayo.jpg'),
  require('./images/51_Serpiente.jpg'),
  require('./images/52_Tlayuda.jpg'),
  require('./images/53_Sirena.jpg'),
  require('./images/54_Gallo.jpg'),
];

const getRandomPairs = (numPairs) => {
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numPairs);
  return [...selected, ...selected].sort(() => Math.random() - 0.5);
};

const Memorama = () => {
  const [cards, setCards] = useState(getRandomPairs(15));
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(180);
  const [timerRunning, setTimerRunning] = useState(false);
  const [attempts, setAttempts] = useState(20);
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
      setAttempts((prev) => prev - 1);
      setTimeout(() => setFlippedIndexes([]), 500);
    }
  }, [flippedIndexes]);

  useEffect(() => {
    if (matchedIndexes.length === cards.length) {
      setGameWon(true);
      setTimerRunning(false);
    }
    if (attempts === 0) {
      setGameOver(true);
      setTimerRunning(false);
    }
  }, [matchedIndexes, attempts]);

  const handlePress = (index) => {
    if (!flippedIndexes.includes(index) && !matchedIndexes.includes(index)) {
      setFlippedIndexes([...flippedIndexes, index]);
      if (!timerRunning) setTimerRunning(true);
    }
  };

  const restartGame = () => {
    setCards(getRandomPairs(15));
    setFlippedIndexes([]);
    setMatchedIndexes([]);
    setGameWon(false);
    setGameOver(false);
    setTime(300);
    setAttempts(20);
    setTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.controls}>
        <Text style={styles.timer}>{formatTime(time)}</Text>
        <Text style={styles.attempts}>🃏 Intentos: {attempts}</Text>
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
              source={flippedIndexes.includes(index) || matchedIndexes.includes(index) ? card : require('./images/back.jpg')} 
              style={styles.image} 
            />
          </TouchableOpacity>
        ))}
      </View>

      <Modal visible={gameWon} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 ¡Felicidades! Has ganado 🎉</Text>
            <Button title="Jugar de nuevo" onPress={restartGame} />
          </View>
        </View>
      </Modal>

      <Modal visible={gameOver} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>⏳ ¡Tiempo agotado!</Text>
            <Button title="Intentar de nuevo" onPress={restartGame} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

// 🎨 Estilos
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
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  buttonText: {
    fontSize: 18,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
  card: {
    width: 50,
    height: 80,
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
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Memorama;
