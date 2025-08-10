import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export default function StretchingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estiramientos</Text>
      <Text style={styles.subtitle}>
        Realiza algunos estiramientos para evitar lesiones y mejorar la flexibilidad.
      </Text>
      
      <Pressable style={styles.button} onPress={() => navigation.navigate('SummaryScreen')}>
        <Text style={styles.buttonText}>Terminar rutina</Text>
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
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
