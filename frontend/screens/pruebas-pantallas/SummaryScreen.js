import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function SummaryScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resumen de tu rutina</Text>
      <Text style={styles.resultText}>Tiempo invertido: 45:09 minutos</Text>
      <Text style={styles.resultText}>Ejercicios completados: 10</Text>
      <Text style={styles.resultText}>Rondas completadas: 5</Text>

      <Pressable style={styles.button} onPress={() => navigation.navigate('main')}>
        <Text style={styles.buttonText}>Regresar a la pantalla principal</Text>
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
    marginBottom: 10,
  },
  resultText: {
    fontSize: 18,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#4745ff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
