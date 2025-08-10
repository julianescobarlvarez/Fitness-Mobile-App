import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView, Animated, ImageBackground, BackHandler, Alert } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Menu, Button, Divider } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'
import { Calendar, LocaleConfig } from 'react-native-calendars'
import AsyncStorage from '@react-native-async-storage/async-storage'
import findPlanService from '../../services/findPlanService'
import ChallengeSystemScreen from './home-components-screens/ChallengeSystemScreen'

// Pantalla de inicio
export default function HomeScreen(props) {
    const [thereActualPlan, setThereActualPlan] = useState(false)
    const [plan, setPlan] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [fadeAnim] = useState(new Animated.Value(0))

    
    // Se usa useFocusEffect para que el evento solo esté activo cuando la pantalla esté enfocada
    useFocusEffect(
        React.useCallback(() => {
        const onBackPress = () => {
            // Se cierra la aplicación cuando se presiona el botón de retroceso
            BackHandler.exitApp()
            return true; // Esto prevenie la acción predeterminada
        }

        // Registra el evento de retroceso
        BackHandler.addEventListener('hardwareBackPress', onBackPress)

        // Limpia el evento cuando la pantalla pierda el foco
        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress)
        }, [])
    )

    useEffect(() => {
        const actualPlan = async() => {
            try {
                // Se usa el servicio de AsyncStorage para guardar el id de plan actual
                const planId = await AsyncStorage.getItem('planToken')

                if(planId){
                    //Construir un servicio frontend para llamar los id
                    const planData  = await findPlanService(planId)

                    //Se evalua si existe el plan
                    if(planData){
                        setPlan(planData.actualPlan)
                        setThereActualPlan(true)
                    } else {
                        setThereActualPlan(false)
                    }
                }
                else{
                    setThereActualPlan(false) 
                }

            } catch {
                // Verifica el tipo de error para mostrar el mensaje correspondiente
                Alert.alert('No se pudo enviar la solicitud')
                setThereActualPlan(false)

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
    }, [])

    // Para ajustar el idioma del calendario al español local
    LocaleConfig.locales['es'] = {
    monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ],
    monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic'
    ],
    dayNames: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado'
    ],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
    today: 'Hoy'
    }

    LocaleConfig.defaultLocale = 'es'

    // Para poder conseguir los días para el calendario
    // Entrada: ["Martes", "Jueves"]
    // Salida: ["2025-06-10", "2025-06-12", ...]
    //console.log('plan.trainingDays:', plan.trainingDays)

    let markedDates = {}
    let todayRoutine = null
    let routineToShow = null

    if (plan && plan.trainingDays) {
        const getTrainingDates = (trainingDays, startDate, endDate) => {
            const daysOfWeek = {
                'Domingo': 0,
                'Lunes': 1,
                'Martes': 2,
                'Miércoles': 3,
                'Jueves': 4,
                'Viernes': 5,
                'Sábado': 6
            }

            const trainingDaysIndex = trainingDays.map(day => daysOfWeek[day])
            const [d1, m1, y1] = plan.startDate.split('/')
            const [d2, m2, y2] = plan.endDate.split('/')
            const start = new Date(`${y1}-${m1}-${d1}`)
            const end = new Date(`${y2}-${m2}-${d2}`)
            const dates = []

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                if (trainingDaysIndex.includes(d.getDay())) {
                    const iso = d.toISOString().split('T')[0]
                    dates.push(iso)
                }
            }

            return dates
        }

        const trainingDates = getTrainingDates(
            plan.trainingDays.map(d => d.day),
            plan.startDate,
            plan.endDate
        )

        const getCurrentWeekDates = () => {
            const today = new Date()
            const day = today.getDay() === 0 ? 7 : today.getDay()
            const diff = today.getDate() - day + 1
            const startOfWeek = new Date(today.setDate(diff))
            const weekDates = []

            for (let i = 0; i < 7; i++) {
                const d = new Date(startOfWeek)
                d.setDate(startOfWeek.getDate() + i)
                weekDates.push(d.toISOString().split('T')[0])
            }
            return weekDates
        }

        const weekDates = getCurrentWeekDates()
        const today = new Date().toISOString().split('T')[0]

        trainingDates.forEach(date => {
            const isThisWeek = weekDates.includes(date)
            const isBeforeToday = new Date(date) < new Date(today)

            if (date === today) {
                // El día actual no tendrá marca como si los de la semana
                markedDates[date] = {}
            } else if (isBeforeToday) {
                // No se marcan los días pasados
            } else {
                // Futuras fechas si estarán marcadas
                markedDates[date] = {
                    selected: true,
                    selectedColor: isThisWeek ? '#aaf' : '#ededed'
                }
            }
        })

        const todayWeekday = new Date().toLocaleDateString('es-CL', { weekday: 'long' }).toLowerCase()

        const getNextTrainingDay = (planDays, today) => {
            const orderedDays = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo']
            const todayIndex = orderedDays.indexOf(today)

            for (let i = 1; i <= 7; i++) {
                const nextIndex = (todayIndex + i) % 7
                const nextDay = orderedDays[nextIndex]
                const match = planDays.find(d => d.day.toLowerCase() === nextDay)
                if (match) return match
            }
            return null
        }

        todayRoutine = plan.trainingDays.find(d => d.day.toLowerCase() === todayWeekday)
        routineToShow = todayRoutine ?? getNextTrainingDay(plan.trainingDays, todayWeekday)
    }

    let groupedExercises = {}
    
    //Un diccionario para traducir las palabras al español
    const muscleGroupTranslations = {
        arms: 'Brazos',
        chest: 'Pecho',
        abs: 'Abdomen',
        legs: 'Piernas',
        cardio: 'Cardio'
    }
    //Gestiona la visualización de ejercicios por grupo muscular
    if (routineToShow?.exercises) {
        groupedExercises = routineToShow.exercises.reduce((acc, ex) => {
            const group = ex.muscleGroup?.[0] || 'cardio'
            if (group) {
                if (!acc[group]) acc[group] = []
                if (!acc[group].some(e => e.name === ex.name)) {
                    acc[group].push(ex)
                }
            }
            return acc
        }, {})
    }

    if (isLoading) {
        return (
            <View style={styles.container}>
            </View>
        )
    }

    const handleNavegate = (planData) => {
        props.navigation.navigate('detailsRoutine', {planData: planData})
        //console.log('Plan actual: ', JSON.stringify(planData, null, 2))
    }

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}> 
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{backgroundColor: '#f5f5f5'}}>
                {thereActualPlan ? (
                    <>
                        <View style={{backgroundColor: 'white', borderRadius: 10, overflow: 'hidden'}}>    
                            <Text style={styles.title3}>
                                {plan.name}
                            </Text>
                            <Calendar
                                firstDay={1}
                                markedDates={markedDates}
                                onDayPress={(day) => {
                                //const selectedWeekday = new Date(day.dateString).toLocaleDateString('es-CL', { weekday: 'long' })
                                //const match = plan.trainingDays.find(d => d.day.toLowerCase() === selectedWeekday.toLowerCase())

                                }}
                                theme={{
                                    todayTextColor: 'blue',
                                    dotColor: 'blue',
                                    selectedDayBackgroundColor: '#aaf',
                                    selectedDayTextColor: '#000',
                                    calendarBackground: 'white'
                                }}
                                style={{
                                    height: 320,
                                }}
                            />
                        </View>

                        {routineToShow && (
                            <View style={{ 
                                    backgroundColor: '#ffffff',
                                    borderRadius: 12,
                                    marginVertical: 20,
                                    padding: 20,
                                }}>
                                <Text style={{ 
                                    textAlign: 'center',
                                    marginBottom: 15,
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    color: '#333'
                                }}>
                                    {todayRoutine ? 'Tu rutina de hoy ' : 'Tu próxima rutina '}
                                    - Semana: {plan.weeklyProgress[0].week}
                                </Text>
                                <Text style={{ 
                                    fontSize: 16,
                                    fontWeight: '600',
                                    color: '#444',
                                    marginBottom: 6
                                }}>
                                🗓 Día: {routineToShow.day}
                                </Text>
                                <View style={{ marginTop: 15 }}>
                                    {Object.entries(groupedExercises).map(([group, exercises], i) => (
                                        <View 
                                            key={i} 
                                            style={{ marginBottom: 20 }}
                                        >
                                            <Text 
                                                style={{ 
                                                    fontWeight: 'bold', 
                                                    fontSize: 18, 
                                                    color: '#333', 
                                                    marginBottom: 5 
                                                }}
                                            >
                                                {muscleGroupTranslations[group] || group}:
                                            </Text>
                                            {exercises.map((ex, j) => (
                                                <View 
                                                    key={j} 
                                                    style={{ marginLeft: 10, marginBottom: 4 }}
                                                >
                                                    <Text style={{ fontSize: 16, color: '#111' }}>• {ex.name}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    ))}
                                </View>
                            </View>
                        )}
                        <View style={styles.button2Container}>
                            <Pressable 
                                style={styles.button2} 
                                onPress={() => handleNavegate(plan)}
                            >
                                {todayRoutine ? (
                                    <Text style={styles.textButton2}>Ver rutina</Text>
                                ) : (
                                    <Text style={styles.textButton2}>Ver próxima rutina</Text>
                                )}
                            </Pressable>
                        </View>
                    </>
                ) : (
                    <>
                        <View>
                            <Text style={styles.title}>EXPLORA TU POTENCIAL</Text>
                            <Text style={styles.textTitle}>
                            Cada cuerpo es diferente. Nuestra aplicación 
                            crea un plan de entrenamiento basado en tu nivel, preferencias 
                            y objetivos.
                            </Text>
                        </View>
                        <Pressable onPress={() => props.navigation.navigate('form')}>
                            <ImageBackground
                                source={require("../../assets/main-photo.png")} 
                                style={styles.container2}
                                resizeMode="cover"
                                >
                                <View style={styles.overlay}> 
                                    <Text style={styles.text}>
                                    Crea un entrenamiento personalizado
                                    </Text>
                                </View>
                            </ImageBackground>
                        </Pressable>
                        <View style={styles.container4}></View>
                    </>
                )}
                <ChallengeSystemScreen/>
            </ScrollView>
            <Pressable 
                style={({ pressed }) => [
                    styles.button,
                    pressed && styles.buttonPressed
                ]} 
                onPress={() => {
                    setTimeout(() => {
                        props.navigation.navigate('form')
                    }, 100)
                }}
            >
                <Ionicons 
                    name="add-circle-outline" 
                    size={35} 
                    color={'white'} 
                />
            </Pressable>
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
        backgroundColor: '#707070',
        marginTop: 15,
        height: 230,
        borderRadius: 10,
        overflow: 'hidden'
    },
    container3: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center', 
        width: '340'
    },
    container4: {
        marginBottom: 90
    },
    container5: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center', 
        width: '350'
    },
    button: {
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
        elevation: 3

    },
    buttonText: {
        color: 'white', 
        fontWeight: 'bold',
    },
    buttonPressed: {
        backgroundColor: '#7775ff',
        transform: [{ scale: 0.98 }],
        opacity: 0.95
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
    },
    title2: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
    },
    title3: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 15,
        textAlign: 'center'
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        marginTop: 160
    },
    textTitle: {
        fontSize: 17,
        marginTop: 15
    },
    textTitle2: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 15
    },
    text: {
        color: 'white',
        fontSize: 18,
        padding: 15,
        fontWeight: 'bold',
    },
    titleContain: {
        fontWeight: 'bold', 
        fontSize: 18
    },
    textContain: {
        fontSize: 16
    },
    button2Container: {
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15
    },
    button2: {
        backgroundColor: '#4745ff',
        padding: 15,
        //marginTop: 20,
        borderRadius: 5,
        width: '55%',
        alignItems: 'center',
    },
    textButton2: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    }
})