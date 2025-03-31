import React, { useState } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import axios from 'axios';

const App = () => {
  const [nombre, setNombre] = useState('');

  const crearItem = () => {
    axios.post('http://localhost:5000/crear', { nombre })
      .then(response => {
        console.log(response.data);
        alert('Item creado');
      })
      .catch(error => {
        console.error('Hubo un error al crear el item', error);
        alert('Error al crear el item');
      });
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Ingresa un nombre para el nuevo item:</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
        placeholder="Nombre del item"
        value={nombre}
        onChangeText={setNombre}
      />
      <Button title="Crear Item" onPress={crearItem} />
    </View>
  );
};

export default App;
