import React, { useState, useEffect } from 'react'
import { Pressable, StyleSheet, Text, View, Alert, Image } from 'react-native'
import { auth, dbFirebase } from '../../../.expo/credentials'
import { signOut } from 'firebase/auth'
import { collection, getDocs } from 'firebase/firestore'

export default function ProfileConfigScreen() {

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
            Alert.alert('Error', 'Hubo un error al cerrar sesión');
        }
      }
    //Imagen del perfil con IF(si está vacio [yes], else [no])
    return (
        <View style={styles.container}>
            <View
                style={{
                    alignItems: 'center',
                    marginTop: 20,
                    marginBottom: 20
                }}
            >
                <Image
                    source={require("../../assets/profile.png")} 
                    style={{ 
                        borderRadius: 10,
                        width: 130, 
                        height: 110,
                    }}
                />
                <Text 
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>Angelo</Text>
            </View>
            <View style={styles.container2}>
                <Pressable onPress={handleSignOut} style={styles.buttonContainer2}>
                    <Text style={{
                        textAlign: 'center'
                    }}>Cerrar sesión</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f5f5',
    },
    challengeContainer: {
        backgroundColor: 'white',
        marginHorizontal: 15,
        padding: 20,
        borderRadius: 10,
    },
    challengeSubContainer: {
        alignItems: 'center', 
        flexDirection: 'row', 
        paddingHorizontal: 15, 
        padding: 15, 
        marginTop: 15, 
        justifyContent: 'space-between', 
        paddingBottom: 0
    },
    container2: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    buttonContainer: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginTop: 15,
        padding: 20,
        borderRadius: 10,
    },
    buttonContainer2: {
        backgroundColor: 'white',
        marginHorizontal: 5,
        marginTop: 15,
        padding: 20,
        borderRadius: 10,
    },
    medalContainer: {
        alignItems: 'center', 
        flexDirection: 'row', 
        paddingHorizontal: 35, 
        justifyContent: 'space-between'
    }
});