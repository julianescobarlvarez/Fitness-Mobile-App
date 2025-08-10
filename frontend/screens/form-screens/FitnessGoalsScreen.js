import { StyleSheet, Text, View, Pressable, AlertImage, Image } from 'react-native'
import React, { useState } from 'react'

// Pantalla que requiere el objetivo fitness del usuario
export default function FitnessGoalsScreen(props) {
    const { age } = props.route.params
    const [fitnessGoals, setFitnessGoals] = useState('')

    // Para escalar la imagen
    const [highlightedIndex, setHighlightedIndex] = useState(null)

    // Función para manejar el parpadeo de la imagen seleccionada
    const handlePressIn = (index) => {
        setHighlightedIndex(index)
    };

    // Navega a la siguiente pantalla, pasando los valores capturados
    const handleNavigate = () => {
        console.log(fitnessGoals)
        if (fitnessGoals == 'lose weight'){
            props.navigation.navigate('height', { age, fitnessGoals: fitnessGoals, muscleGoals: [] })
        }
        else if (fitnessGoals == 'muscle mass'){
            props.navigation.navigate('muscleGoals', { age, fitnessGoals: fitnessGoals, blockedOptions : ['abs'] })
        }
        else{
            props.navigation.navigate('muscleGoals', { age, fitnessGoals: fitnessGoals, blockedOptions : [] })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¿Cuál es tu objetivo?</Text>
            <View 
                style={[
                    styles.containerOption, 
                    highlightedIndex === 0 && { borderColor: '#4745ff', borderRadius: 10, backgroundColor: '#4745ff' }
                ]}
                onStartShouldSetResponder={() => true} 
                onResponderStart={() => handlePressIn(0)}
                onResponderRelease={() => setFitnessGoals('lose weight')} 
            >
                <Text style={[styles.text, highlightedIndex === 0 && { color: 'white'}]}>Bajar de peso</Text>
                <Pressable 
                    onPress={() => setFitnessGoals('lose weight')}
                    onPressIn={() => handlePressIn(0)}    
                >
                    <Image
                        source={require("../../assets/lose-weight.png")} 
                        style={{ 
                            width: 100, 
                            height: 100,
                            marginRight: 10,
                        }}
                    /> 
                </Pressable>
            </View>
            <View 
                style={[
                    styles.containerOption, 
                    highlightedIndex === 1 && { borderColor: '#4745ff', borderRadius: 10, backgroundColor: '#4745ff' }
                ]}
                onStartShouldSetResponder={() => true}
                onResponderStart={() => handlePressIn(1)}
                onResponderRelease={() => setFitnessGoals('muscle mass')}
            >
                <Text style={[styles.text, highlightedIndex === 1 && { color: 'white'}]}>Aumentar músculo</Text>
                <Pressable 
                    onPress={() => setFitnessGoals('muscle mass')}
                    onPressIn={() => handlePressIn(1)}
                >
                    <Image
                        source={require("../../assets/muscle.png")} 
                        style={{ 
                            width: 100, 
                            height: 100,
                            marginRight: 10,
                        }}
                    />
                </Pressable>
            </View>
            <View 
                style={[
                    styles.containerOption, 
                    highlightedIndex === 2 && { borderColor: '#4745ff', borderRadius: 10, backgroundColor: '#4745ff' }
                ]}
                onStartShouldSetResponder={() => true}
                onResponderStart={() => handlePressIn(2)}
                onResponderRelease={() => setFitnessGoals('be strong')}
            >
                <Text style={[styles.text, highlightedIndex === 2 && { color: 'white'}]}>Fuerza corporal</Text>
                <Pressable 
                    onPress={() => setFitnessGoals('be strong')}
                    onPressIn={() => handlePressIn(2)}
                >
                    <Image
                        source={require("../../assets/strenght.png")} 
                        style={{ 
                            width: 100, 
                            height: 100,
                            marginRight: 10,
                        }}
                    />
                </Pressable>
            </View>
            <View style={styles.buttonContainer}> 
                {fitnessGoals == 'muscle mass' ? (
                    <Text style={styles.text2}>
                        Se requiere un peso externo (mancuernas, discos, bidón de agua, etc.) 
                        para una correcta hipertrofia
                    </Text>
                ): null}
                <Pressable 
                    disabled={fitnessGoals === ''} 
                    onPress={handleNavigate}
                    style={[styles.nextButton, fitnessGoals === '' && styles.disabledButton]}     
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
        marginTop: 30
    },
    title: {
        fontSize:25,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10
    },
    containerOption: {
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
        marginRight: 20,
        marginLeft: 20,
        borderWidth: 1,
        borderColor: '#b6b6b6'
    },
    text: {
        fontSize: 22, 
        fontWeight: 'bold', 
        color: '#black', 
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10, 
        borderRadius: 10, 
    },
    text2:{
        fontSize: 15,
        color: 'black',
        marginHorizontal: 15
    },
    textButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    textOption:{
        fontSize: 18,
        color: '#000'
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