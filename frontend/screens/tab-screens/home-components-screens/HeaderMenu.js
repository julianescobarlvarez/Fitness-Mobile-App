import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Modal, Pressable, Animated } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

export default function HeaderMenu() {
    const [menuVisible, setMenuVisible] = useState(false)
    const navigation = useNavigation()
    const scale = useRef(new Animated.Value(0)).current
    const opacity = useRef(new Animated.Value(0.4)).current

    //Animación optimizada que simula el ripple nativo de android al iniciar
    const startRipple = () => {
        scale.setValue(0)
        opacity.setValue(0.7)
        Animated.timing(scale, {
            toValue: 0.4,
            duration: 200,
            useNativeDriver: true,
        }).start()
    }

    //Animación optimizada que simula el ripple nativo de android al finalizar
    const endRipple = () => {
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    //Maneja el estado de visibilidad del menu desplegable de opciones
    const toggleMenu = () => {
        setMenuVisible(!menuVisible)
    }

    //Deshabilita el menu desplegable y navega a la pantalla siguiente
    const goToCreatedPlans = () => {
        setMenuVisible(false)
        navigation.navigate('createdPlans')
    }

    return (
        <>
            <View style={styles.container}>
                <Pressable 
                    onPress={toggleMenu} 
                    onPressIn={startRipple}
                    onPressOut={endRipple}
                    style={styles.circle}
                >
                    <Animated.View
                        style={[
                            styles.ripple,
                            {
                            transform: [{ scale }],
                            opacity,
                            },
                        ]}
                    />
                    <Ionicons
                        name="ellipsis-vertical"
                        size={25}
                        color="black"
                    />
                </Pressable>
            </View>
            <Modal visible={menuVisible} transparent animationType="fade">
                <Pressable style={styles.overlay} onPress={toggleMenu}>
                    <View style={styles.menu}>
                        <Text style={styles.menuItem} onPress={goToCreatedPlans}>
                        Planes creados
                        </Text>
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'flex-end',
  },    
    overlay: {
        flex: 1,
        //backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingVertical: 50
    },
    menu: {
        backgroundColor: 'white',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        elevation: 5,
        width: 200
    },
    menuItem: {
        fontSize: 16,
        paddingVertical: 10
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 5
    },
    circle: {
        flex: 1,
        //backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    ripple: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: '#aaa',
        borderRadius: 50,
    }
})
