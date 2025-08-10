import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';

export default function ExerciseScreen(props) {
  const { exercises, goalType } = props.route.params; // Recibimos los ejercicios de los params

  const handleNext = () => {
    // Si no hay más ejercicios, podemos llevarlo a otra pantalla (por ejemplo, resumen)
    props.navigation.navigate('prueba4'); // O cualquier otra pantalla de tu flujo
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>High Knee</Text>
      <Text style={styles.title2}>Series: 3</Text>
      <Text style={styles.title2}>Repeticiones: 12</Text>
      <Text style={styles.title2}>Serie actual: 1</Text>
      <Image
        source={require('../../assets/exercise-default.png')} // Asumiendo que tienes la URL de la imagen
        style={styles.image}
        resizeMode="contain"
      />
      <Pressable style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Siguiente ejercicio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  title2: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4745ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 160,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


