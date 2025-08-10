import { StyleSheet, Text, View, FlatList, Pressable, Alert, Modal, Dimensions } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons'
import findAllPlansService from '../../../services/findAllPlansService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import deletePlanService from '../../../services/deletePlanService'

// Pantalla que muestra los planes de entrenamiento creados por el usuario
export default function CreatedPlansScreen(props) {
    const [plans, setPlans] = useState([])
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 })
    const [selectedPlanId, setSelectedPlanId] = useState(null)
    const iconRef = useRef({})
    const [userEmail, setUserEmail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    
    // Para manejar los planes que se van a mostrar 
    useEffect(() => {
        const PlansList = async() => {
            try {
                // Conseguir el email de AsyncStorage
                const email = await AsyncStorage.getItem('emailToken')
                
                // Construir un servicio frontend para llamar los planes del usuario
                const plansData = await findAllPlansService(email)
                setPlans(plansData.plans.plan)
                setUserEmail(email)
                //console.log('Datos de los Planes: ', plansData.plans.plan)
            } catch {
                // Verifica el tipo de error para mostrar el mensaje correspondiente
                Alert.alert('No se pudo enviar la solicitud')
            } finally {
                setIsLoading(false)
            }
        }
        PlansList()
    }, [])

    // Función que maneja la posición del menu desplegable de opciones en los planes
    const toggleMenu = (planId) => {
        if (selectedPlanId === planId) {
            setSelectedPlanId(null)
        } else {
            iconRef.current[planId]?.measure((fx, fy, width, height, px, py) => {
                const screenHeight = Dimensions.get('window').height
                const menuHeight = 135

                let top = py + height - 20

                // Si el menú se saldría de la pantalla, muévelo hacia arriba
                if (top + menuHeight > screenHeight) {
                    top = py - menuHeight
                }

                setMenuPosition({ x: px - 140, y: top })
                setSelectedPlanId(planId)
            })
        }
    }

    // Navega a la pantalla anterior después de elegir un plan de la lista
    const handleNavigate = async (planId) => {
        try{
            // Se elimina la vigencia de plan actual del usuario de AsyncStorage
            await AsyncStorage.removeItem('planToken')
            
            // Se usa el servicio de AsyncStorage para guardar el token de plan actual
            await AsyncStorage.setItem('planToken', planId)
            console.log('Se ha llamado al servicio de AsyncStorage con éxito')

            props.navigation.reset({
                index: 0,
                routes: [{ name: 'main' }],
            })

        } catch (error) {
            // Verifica el tipo de error para mostrar el mensaje correspondiente
            Alert.alert('No se pudo enviar la solicitud')
        }
    }

    // Navega a la pantalla anterior después de eliminar un plan
    const handleDeletePlan = async (planId) => {
        try {
            //Se llama al servicio cpara eliminar el plan seleccionado
            const response = await deletePlanService(planId, userEmail)

            if(response){
                Alert.alert('Se ha eliminado con éxito')
                
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'main' }],
                })
                //props.navigation.replace('createdPlans')
            }

        } catch (error) {
            Alert.alert('No se pudo enviar la solicitud')
        }
    }

    // Navega a la siguiente pantalla con los datos del plan seleccionado
    const handleInfoPlan = (plan) => {
        props.navigation.navigate('planInfo', {plan: plan})
    }

    // Para mostrar la lista de los planes de entrenamiento del usuario
    const renderPlan = ({ item }) => (
        <Pressable style={styles.card} onPress={() => handleNavigate(item._id)}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.title}>{item.name}</Text>
                <View>
                    <View style={styles.circleWrapper}>
                        <Pressable 
                            ref={(ref) => { iconRef.current[item._id] = ref }} 
                            onPress={() => toggleMenu(item._id)}
                            android_ripple={{ color: '#c7c7c7', borderless: false}}
                            style={styles.circle}
                        >
                            <Ionicons
                                name="ellipsis-horizontal"
                                size={25}
                                color="black"
                            />
                        </Pressable>
                    </View>
                </View>
            </View>
            {selectedPlanId === item._id && (
                <Modal visible={true} transparent animationType="fade">
                    <Pressable style={StyleSheet.absoluteFill} onPress={() => setSelectedPlanId(null)}>
                        <View style={[styles.menu, {
                            position: 'absolute',
                            top: menuPosition.y,
                            left: menuPosition.x
                        }]}>
                            <Pressable
                                android_ripple={{ color: '#c7c7c7', borderless: false}}
                                onPress={() => {
                                    setTimeout(() => {
                                        handleInfoPlan(item)
                                        setSelectedPlanId(null)
                                    }, 200)
                                }}
                            >
                                <Text style={styles.menuItem}>
                                    Detalles
                                </Text>    
                            </Pressable>
                            <Pressable
                                android_ripple={{ color: '#c7c7c7', borderless: false}}
                                onPress={() => {
                                    setTimeout(() => {    
                                        handleDeletePlan(item._id)
                                        setSelectedPlanId(null)
                                    }, 200)
                                }}
                            >
                                <Text style={styles.menuItem2}>
                                    Eliminar plan
                                </Text>
                            </Pressable>
                        </View>
                    </Pressable>
                </Modal>
            )}
            {item.planIntensity.length === 0 ? (
                <Text style={styles.text}>Nivel: {item.level}</Text>
            ):(
                <Text style={styles.text}>Intensidad: {item.planIntensity.join(', ')}</Text>
            )}
        </Pressable>
    )

    return (
        <View style={styles.container}>
            {isLoading ? (
                null
            ) : plans.length === 0 ? (
                <View style={styles.container2}>
                    <Text style={styles.title2}>No existe ningún plan</Text>
                </View>
            ) : (
                <FlatList
                    data={plans}
                    keyExtractor={(item) => item._id}
                    renderItem={renderPlan}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingTop: 20,
    },
    container2: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },
    listContent: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 16,
        marginBottom: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    title2: {
        fontSize: 20,
        marginBottom: 8
    },
    text: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
    },
    text2: {
        fontSize: 14,
        color: '#444',
        marginBottom: 2,
        textAlign: 'right'
    },
    overlay: {
        flex: 1,
        //backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        //paddingVertical: 50
    },
    menu: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        //paddingHorizontal: 15,
        elevation: 4,
        width: 200
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    menuItem2: {
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    circleWrapper: {
        width: 40,
        height: 40,
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: -8
    },
    circle: {
        flex: 1,
        //backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center'
    }
})