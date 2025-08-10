import { StyleSheet, Text, View, TextInput, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'

// Pantalla de carga
export default function LoadingScreen(props) {
    
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);  // Cambia el estado después de 1 segundo
            props.navigation.navigate('main')
        }, 500);  // Retraso de 1000 ms (1 segundo)
    
        // Se limpia el timeout si el componente se desmonta antes de que termine
        return () => clearTimeout(timer);
        }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' }}>
            <Text> Cargando... </Text>
        </View>
    )
}