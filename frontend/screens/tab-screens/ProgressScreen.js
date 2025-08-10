import React, { useState, useCallback} from 'react'
import { View, Text, StyleSheet, Animated, Pressable, ScrollView, TextInput, Modal, Alert } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'
import findPlanService from '../../services/findPlanService'
import BarChart from './progress-components-screens/BarChart'
import addWeightService from '../../services/addWeightService'
import patchProgressDataService from '../../services/patchProgressDataService'

// Pantalla de progreso
export default function ProgressScreen(props) {
    const [plan, setPlan] = useState(null)
    const [data, setData] = useState([10])
    const [bmi, setBMI] = useState(1)
    const [bfp, setBFP] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const [fadeAnim] = useState(new Animated.Value(0))
    const [weight, setWeight] = useState('60')
    const [menuVisible, setMenuVisible] = useState(false)
    const [email, setEmail] = useState(null)
    const [refreshKey, setRefreshKey] = useState(0)

    useFocusEffect(
        useCallback(() => {
            const actualPlan = async () => {
                try {
                    const planId = await AsyncStorage.getItem('planToken')
                    const email = await AsyncStorage.getItem('emailToken')

                    if (planId) {
                        const planData = await findPlanService(planId)
                        
                        if (planData) {
                            const actualPlan = planData.actualPlan
                            setPlan(actualPlan)
                            setData(actualPlan.weeklyProgress[0].bodyWeight)
                            setBMI(actualPlan.weeklyProgress[0].bmi.toFixed(1))
                            setBFP(actualPlan.weeklyProgress[0].bfp.toFixed(1))
                        }
                    }
                } catch (err) {
                    console.error(err)
                } finally {
                    setIsLoading(false)
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 400,
                        useNativeDriver: true
                    }).start()
                }
            }
            actualPlan()
        }, [refreshKey])
    )

    // Rango de índice de masa corporal
    const minBMI = 15
    const maxBMI = 40

    // Rango de porcentaje de grasa corporal
    const minBFP = 1
    const maxBFP = 40

    // Rango de colores para la barra
    const rangeColors = ['#0e9b01', '#04f700', 'yellow', '#ff9500', 'red']
    const rangeColors2 = ['#0000c1', '#00e7e0', '#00e7e0', '#0000c1']

    const colorStops = [0, 0.20, 0.45, 0.75, 1]
    const colorStops2 = [0, 0.14, 0.57, 1]
    
    // Función para calcular la posición del indicador en función del IMC/BMI
    const calculateBMIPosition = (bmi) => {
        return ((bmi - minBMI) / (maxBMI - minBMI)) * 100
    }

    const BMIPosition = calculateBMIPosition(bmi)

    // Para evaluar la respuesta correspondiente al valor de IMC/BMI
    const ifBMIValue = () => {
        if(bmi < 18.5){
            return 'Tu IMC indica que es inferior al rango recomendado.'
        }
        if(bmi >= 18.5 && bmi <= 24.9){
            return '¡Felicidades! Tu IMC está dentro del rango saludable.'
        }
        if(bmi >= 25 && bmi <= 29.9){
            return 'Tu IMC indica que tienes sobrepeso.'
        }
        if(bmi >= 30 && bmi <= 34.9){
            return 'Tu IMC indica que tienes obesidad.'
        }
        if(bmi >= 35 && bmi <= 39.9){
            return 'Tu IMC indica que tienes obesidad de grado 2'
        }
        else{
            return 'Tu IMC indica que tienes obesidad de grado 3.'
        }
    }

    const calculateBFPPosition = (bfp) => {
        return ((bfp - minBFP) / (maxBFP - minBFP)) * 100
    }

    const BFPPosition = calculateBFPPosition(bfp)

    // Para evaluar la respuesta correspondiente al valor de BFP
    const ifBFPValue = () => {
        if(bfp < 6){
            return 'Tu porcentaje de grasa corporal es más bajo que el de un atleta.'
        }
        if(bfp >= 6 && bfp <= 13){
            return 'Estás en el rango común de un deportista de alto rendimiento.'
        }
        if(bfp >= 14 && bfp <= 17){
            return 'Estás en el rango común de una persona activa.'
        }
        if(bfp >= 18 && bfp <= 24){
            return 'Estás en el rango común de una persona promedio.'
        }
        if(bfp >= 25 && bfp <= 31){
            return 'Estás en el rango común de una persona con sobrepeso.'
        }
        else{
            return 'Estás en el rango común de una persona con obesidad.'
        }
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
            </View>
        )
    }

    //Maneja el estado de visibilidad del menu desplegable de opciones
    const toggleMenu = () => {
        setMenuVisible(!menuVisible)
    }

    const addUserWeight = async(planId, weight, email) => {
        //console.log('Plan actual: ', JSON.stringify(planData, null, 2))
        try {
            Number(weight.trim())
            await addWeightService(planId, weight) 
            await patchProgressDataService(planId, email)

            setRefreshKey(prev => prev + 1)
            toggleMenu()

        } catch (error) {
            // Verifica el tipo de error para mostrar el mensaje correspondiente
            Alert.alert('No se pudo enviar la solicitud')
        }

    }

    return (
        <Animated.View style={[styles.container2, { opacity: fadeAnim }]}>   
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
                <Text style={styles.titleBar}>Peso semanal</Text>
                <View style={{borderWidth: 1, borderColor: '#ddd'}}>
                    <BarChart data={data} />
                </View>    
                <Text style={styles.titleBMI}>IMC: {bmi}</Text>
                <View style={styles.bmiContainer}>
                    <View style={styles.barContainer2}>
                        {/* Barra de progreso con gradiente */}
                        <LinearGradient
                            colors={rangeColors}
                            locations={colorStops}
                            style={styles.bar2}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                        {/* Barra de progreso con gradiente */}
                        </LinearGradient>

                        {/* Indicador triangular */}
                        <Animated.View
                            style={[
                                styles.indicator,
                                {
                                    left: `${BMIPosition}%`, // Movimiento del indicador
                                },
                            ]}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>{ifBMIValue()}</Text>
                    </View>
                </View>
                <Text style={styles.titleBMI}>PGC: {bfp}%</Text>
                <View style={styles.bfpContainer}>
                    <View style={styles.barContainer2}>
                        {/* Barra de progreso con gradiente */}
                        <LinearGradient
                            colors={rangeColors2}
                            locations={colorStops2}
                            style={styles.bar2}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                        {/* Barra de progreso con gradiente */}
                        </LinearGradient>

                        {/* Indicador triangular */}
                        <Animated.View
                            style={[
                                styles.indicator,
                                {
                                    left: `${BFPPosition}%`, // Movimiento del indicador
                                },
                            ]}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>{ifBFPValue()}</Text>
                    </View>
                </View>
                <View style={{marginVertical: 35}}></View>
            </ScrollView>
            {plan? (
                <>
                    <Pressable 
                        style={({ pressed }) => [
                            styles.button2,
                            pressed && styles.buttonPressed
                        ]} 
                        onPress={() => {
                            setTimeout(() => {
                                toggleMenu()
                            }, 100)
                        }}
                    >
                        <Ionicons 
                            name="scale-sharp"
                            size={35} 
                            color={'white'} 
                        />
                    </Pressable>
                    <Modal visible={menuVisible} transparent animationType="fade">
                        <Pressable 
                            style={{
                                backgroundColor: 'rgba(0,0,0,0.5)', 
                                flex: 1, 
                                justifyContent: 'flex-end'
                            }}
                            onPress={() => toggleMenu()}
                        >
                            <Pressable onPress={() => {}}>
                                <View style={styles.sectionContainer}>
                                    <Text style={styles.titleBMI}>Peso: </Text>
                                    <TextInput
                                        style={styles.input}
                                        value={weight}
                                        onChangeText={setWeight}
                                        keyboardType="numeric"
                                    />
                                    <View style={styles.button3Container}>
                                        <Pressable 
                                            style={styles.button3} 
                                            onPress={() => addUserWeight(plan._id, weight, email)}
                                        >
                                            <Text style={styles.textButton3}>Aplicar cambios</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Pressable>
                        </Pressable>
                    </Modal>
                </>
            ):(null)}
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginHorizontal: 15,
    },
        container2: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    titleBar: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 15
    },
    titleBMI: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15
    },
    bmiContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10
    },
    bfpContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 20
    },
    text: {
        marginBottom: 15,
        fontSize: 16,
        color: 'black'
    },
    barContainer2: {
        position: 'relative',
        width: 300,
        height: 20,
        marginBottom: 20,
        marginTop: 20
    },
    bar2: {
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        borderRadius: 1,
        overflow: 'hidden',
    },
    segment: {
        flex: 1,
        height: '100%',
      },
    indicator: {
        position: 'absolute',
        top: -10, 
        width: 0,
        height: 0,
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderTopWidth: 10,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#000', 
        marginLeft: -10
    },
    button: {
        padding: 10,
        backgroundColor: '#3498db',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    emptySpace: {
        backgroundColor: 'blue',
        marginLeft: 0,
    },
    xAxisContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button2: {
        position: 'absolute', 
        bottom: 15,
        right: 0,
        backgroundColor: '#4745ff', 
        width: 60,
        height: 60,
        padding: 10,
        borderRadius: 15, 
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        marginRight: 15

    },
    buttonPressed: {
        backgroundColor: '#7775ff',
        transform: [{ scale: 0.98 }],
        opacity: 0.95
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginTop: 4,
        borderRadius: 6,
    },
    button3Container: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginVertical: 30
    },
    button3: {
        backgroundColor: '#4745ff',
        padding: 15,
        borderRadius: 5,
        width: '65%',
        alignItems: 'center',
    },
    textButton3: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    sectionContainer: {
        backgroundColor: 'white',
        height: 300,
        paddingHorizontal: 15,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    }
})
