import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Modal, Text, Button } from 'react-native';

// 📦 Todas las imágenes
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

// 🔀 Función para obtener 6 pares aleatorios
const getRandomPairs = (numPairs) => {
  const shuffled = [...allImages].sort(() => Math.random() - 0.5);
  const selected = shuffled.slice(0, numPairs);
  const pairs = [...selected, ...selected].sort(() => Math.random() - 0.5);
  return pairs;
};

const Memorama = () => {
  const [cards, setCards] = useState(getRandomPairs(6));
  const [flippedIndexes, setFlippedIndexes] = useState([]);
  const [matchedIndexes, setMatchedIndexes] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [time, setTime] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // 🕒 Control del cronómetro
  useEffect(() => {
    let timer;
    if (timerRunning) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning]);

  // 🔄 Verificar pares
  useEffect(() => {
    if (flippedIndexes.length === 2) {
      const [firstIndex, secondIndex] = flippedIndexes;

      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedIndexes((prev) => [...prev, firstIndex, secondIndex]);
      }

      setTimeout(() => setFlippedIndexes([]), 500);
    }
  }, [flippedIndexes]);

  // ✅ Revisar si el usuario ganó
  useEffect(() => {
    if (matchedIndexes.length === cards.length && cards.length > 0) {
      setGameWon(true);
      setTimerRunning(false);
    }
  }, [matchedIndexes, cards]);  

  // 🃏 Manejar clic en carta
  const handlePress = (index) => {
    if (!flippedIndexes.includes(index) && !matchedIndexes.includes(index)) {
      setFlippedIndexes([...flippedIndexes, index]);
      if (!timerRunning) setTimerRunning(true);
    }
  };

  // 🔄 Reiniciar juego
  const restartGame = () => {
    setCards(getRandomPairs(6));
    setFlippedIndexes([]);
    setMatchedIndexes([]);
    setGameWon(false);
    setTime(0);
    setTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };
  
  return (
    <View style={styles.container}>

      {/* 🕒 Controles superiores */}
      <View style={styles.controls}>
        <TouchableOpacity 
          onPress={() => setTimerRunning(!timerRunning)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{timerRunning ? '⏸️' : '▶️'}</Text>
        </TouchableOpacity>
        
        <Text style={styles.timer}>{formatTime(time)}</Text>

        <TouchableOpacity 
          onPress={restartGame}
          style={styles.button}
        >
          <Text style={styles.buttonText}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* 🃏 Tablero */}
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
  
      {/* 🎉 Modal de Victoria */}
      <Modal visible={gameWon} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>🎉 ¡Felicidades! Has ganado 🎉</Text>
            <Text style={styles.modalText}>⏳ Tiempo: {formatTime(time)}</Text>
            <Button title="Jugar de nuevo" onPress={restartGame} />
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
    justifyContent: 'space-between', 
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
    marginTop: 20,
  },
  card: {
    width: 80,
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
