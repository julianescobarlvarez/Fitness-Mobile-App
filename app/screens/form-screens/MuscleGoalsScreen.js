import { StyleSheet, Text, View, TextInput, Pressable, Alert, Image } from 'react-native'
import React, { useState} from 'react'

//Pantalla que requiere el grupo muscular de interés del usuario
export default function MuscleGoalsScreen(props) {
    const { age, fitnessGoals } = props.route.params
    const [muscleGoals, setMuscleGoals] = useState([])

    const options = [
        { id: 1, name: 'Brazos', value: 'arms'},
        { id: 2, name: 'Pecho', value: 'chest'},
        { id: 3, name: 'Abdomen', value: 'abs'},
        { id: 4, name: 'Piernas', value: 'legs'}
    ]
    
    const handleSelection = (nameOption) => {
        setMuscleGoals(prevState => {
          if (prevState.includes(nameOption)) {
            return prevState.filter(option => option !== nameOption); // Se elimina una opción
          } else {
            return [...prevState, nameOption]; // Se agrega una opción
          }
        })
    }

    const handleNavigate = () => {
        // Navega a la siguiente pantalla, pasando el valor capturado
        console.log(muscleGoals)
        props.navigation.navigate('height', { age, fitnessGoals, muscleGoals: muscleGoals })
    }

    return (
        <View style={styles.container}>
            <Text 
                style={{
                    textAlign: 'center', 
                    fontSize:25, 
                    fontWeight: 'bold'
                }}>
                Elije tu zona muscular de interés
            </Text>
            <Image 
                source={require('../../assets/full-body.png')} 
                style={{height: 300, width: 200, marginHorizontal: 'auto'}}/>
            <View style={styles.nameSection}>
                <Text style={styles.title}>Selecciona las opciones:</Text>
                {options.map(option => (
                    <Pressable
                        key={option.id}
                        style={[styles.button, muscleGoals.includes(option.value) && styles.selectedButton]}
                        onPress={() => handleSelection(option.value)}
                    >
                        <Text style={styles.textButton}>{option.name}</Text>
                    </Pressable>
                ))}
                <Pressable 
                    disabled={muscleGoals.length === 0}
                    style={[styles.nextButton, muscleGoals.length === 0 && styles.disabledButton]} 
                    onPress={handleNavigate}
                >
                    <Text style={styles.textButton}>Continuar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f5f5'
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
    },
    nameSection: {
        alignItems: 'center',
        textAlign: 'center'
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center'
    },
    button: {
        backgroundColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    selectedButton: {
        backgroundColor: '#4745ff',
    },
    textButton: {
        fontSize: 18,
        color: '#fff',
    },
    nextButton: {
        backgroundColor: '#4745ff',
        padding: 15,
        marginTop: 20,
        borderRadius: 5,
        width: '80%',
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#b0b0b0', 
    },
})