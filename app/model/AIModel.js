import React, { useState, useEffect } from 'react';
import { View, Button, Text } from 'react-native';
import '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';

//Espera a recibir el visto bueno y funcionar al activarse esta pantalla
useEffect(() => {
    const initTensorFlow = async () => {
      await tf.ready();  // Inicializa TensorFlow.js
      console.log('TensorFlow.js está listo');
    };
  
    initTensorFlow();
}, []);

const [model, setModel] = useState(null);

useEffect(() => {
  const loadModel = async () => {
    await tf.ready();  // Asegúrate de que TensorFlow está listo
    const model = await tf.loadLayersModel(require('./assets/model.json'));  // Cargar el modelo
    setModel(model);  // Guardar el modelo cargado en el estado
  };

  loadModel();
}, []);