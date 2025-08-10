import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function WarmUpScreen({ navigation, route }) {
  // Suponemos que recibimos la rutina desde la pantalla anterior a través de `route.params`
  const { planData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Comienza tu calentamiento!</Text>
      <Text style={styles.subtitle}>Realiza un calentamiento básico antes de comenzar tu rutina.</Text>

      <Pressable 
        style={styles.button}
        onPress={() => {
          // Aquí pasamos `planData` (ejercicios y objetivos) a la pantalla de ejercicios
          navigation.navigate('prueba2', { exercises: planData.trainingDays, goalType: planData.fitnessGoals });
        }}
      >
        <Text style={styles.buttonText}>Seguir a los ejercicios</Text>
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
    backgroundColor: '#4745ff',
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

