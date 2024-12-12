import { StyleSheet, Text, View, TextInput, Pressable, Alert, ScrollView } from 'react-native'
import React, { useState} from 'react'
import { Checkbox } from 'react-native-paper'

//Pantalla que muestra un calendario con los días de la semana para que el usuario elija
//en qué días va a entrenar y a cuanto tiempo va a estar en el entrenamiento.
//Las posibilidades son de 4, 8 o 12 semanas
export default function TrainingCalendarScreen(props) {
    const { 
        age,
        fitnessGoals, 
        muscleGoals, 
        height, 
        weight, 
        physicalLevel, 
        activityLevel 
    } = props.route.params
    
    const [trainingCalendar, setTrainingCalendar] = useState([])
    const [checked, setChecked] = useState(false);
    // Lista de días de la semana
    const daysOfWeek = [
        { id: 1, name: 'Lun', value: 'monday' },
        { id: 2, name: 'Mar', value: 'tuesday' },
        { id: 3, name: 'Mié', value: 'wednesday' },
        { id: 4, name: 'Jue', value: 'thursday' },
        { id: 5, name: 'Vie', value: 'friday' },
        { id: 6, name: 'Sáb', value: 'saturday' },
        { id: 7, name: 'Dom', value: 'sunday' },
    ];

    // Función para manejar la selección o deselección de un día
    const handleToggleDay = (dayValue) => {
        if (trainingCalendar.includes(dayValue)) {
            setTrainingCalendar(trainingCalendar.filter(value => value !== dayValue));
        } else {
            setTrainingCalendar([...trainingCalendar, dayValue]); 
        }
        setChecked(!checked)
    };
    
    const handleNavigate = () => {
        // Navega a la siguiente pantalla, pasando el valor capturado
        console.log(trainingCalendar)
        props.navigation.navigate('plan', { 
            age,
            fitnessGoals, 
            muscleGoals,  
            height, 
            weight, 
            physicalLevel, 
            activityLevel, 
            trainingCalendar: trainingCalendar
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Elije los días de entrenamiento</Text>
            <Text style={styles.subtitle}>Sugerimos que sean al menos 3 días de la semana para un progreso notable</Text>
            <View style={styles.row}>
                {/* Mostramos la primera fila de días */}
                {daysOfWeek.slice(0, 4).map(day => (
                <View key={day.id} style={styles.dayContainer}>
                    <Checkbox
                        status={trainingCalendar.includes(day.value) ? 'checked' : 'unchecked'}
                        onPress={() => handleToggleDay(day.value)}
                        color="#4745ff"
                    />
                    <Text>{day.name}</Text>
                </View>
                ))}
            </View>
            <View style={styles.row2}>
                {/* Mostramos la segunda fila de días */}
                {daysOfWeek.slice(4).map(day => (
                <View key={day.id} style={styles.dayContainer}>
                    <Checkbox
                        status={trainingCalendar.includes(day.value) ? 'checked' : 'unchecked'}
                        onPress={() => handleToggleDay(day.value)}
                        color="#4745ff"
                    />
                    <Text>{day.name}</Text>
                </View>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <Pressable 
                    disabled={trainingCalendar.length === 0}
                    style={[styles.nextButton, trainingCalendar.length === 0 && styles.disabledButton]} 
                    onPress={handleNavigate}
                >
                    <Text style={styles.textButton}>Continuar</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    container2: {
        flexDirection: 'column',
        flexWrap: 'wrap',
    },
    buttonContainer: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 30
    },
    daysContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        padding: 15,
        backgroundColor: 'green',
        borderRadius: 5,
    },
    title: {
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 0,
        margin: 20
    },
    subtitle: {
        fontSize: 16,
        color: 'black',
        margin: 20,
        marginBottom: 50,
        textAlign: 'center'
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        margin: 10,
    },
    row2: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
        marginHorizontal: 55,
        margin: 10,
    },
    dayContainer: {
        alignItems: 'center',
        borderColor: '#b6b6b6',
        borderWidth: 1,
        borderRadius: 10,
        width: 80,  
        height: 70,  
    },
})