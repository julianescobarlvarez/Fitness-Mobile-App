import { LinearGradient } from 'expo-linear-gradient';
import React from 'react'
import { StyleSheet, Text, View, ImageBackground, Image, ScrollView } from 'react-native'

export default function UpperBodyScreen(props) {

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <LinearGradient
                    colors={['#707070', 'black']}
                    style={styles.subcontainer2}
                >
                    <ImageBackground 
                        source={require('../../assets/gym-background.png')} 
                        style={{
                            flex: 1,
                            height: 230, 
                            borderRadius: 10,
                            overflow: 'hidden'                  
                        }}  
                        resizeMode="cover"
                    >
                        <ImageBackground 
                            source={require('../../assets/upper-body.png')} 
                            style={{
                                flex: 1,
                                height: 230,                      
                            }}  
                            resizeMode="contain"
                        >
                            <View style={styles.overlay}> 
                                <Text style={styles.text}>
                                    Fortalece tu tren superior con un amplio repertorio de 
                                    ejercicios de fuerza e hipertrofia.
                                </Text>
                            </View>
                        </ImageBackground>
                    </ImageBackground>   
                </LinearGradient>
                <Text style={styles.title}>ÁREAS MUSCULARES</Text>
                <View
                    onStartShouldSetResponder={() => true} 
                    onResponderStart={() => props.navigation.navigate('routines')}
                >
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Hombros</Text>
                        <Image 
                            source={require('../../assets/shoulders-exercise.png')}
                            style={{ 
                                width: 100, 
                                height: 100,
                                marginRight: 10,
                                borderRadius: 10
                            }}    
                        />
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Brazos</Text>
                        <Image 
                            source={require('../../assets/arms-exercise.png')}
                            style={{ 
                                width: 100, 
                                height: 100,
                                marginRight: 10,
                                borderRadius: 10
                            }}    
                        />
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Pecho y serrato</Text>
                        <Image 
                            source={require('../../assets/chest-exercise.png')}
                            style={{ 
                                width: 100, 
                                height: 100,
                                marginRight: 10,
                                borderRadius: 10
                            }}    
                        />
                    </LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={['black', '#707070']}
                        style={styles.subcontainer3}
                        start={{ x: 0.4, y: 0 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <Text style={styles.text}>Espalda</Text>
                        <Image 
                            source={require('../../assets/back-exercise.png')}
                            style={{ 
                                width: 100, 
                                height: 100,
                                marginRight: 10,
                                borderRadius: 10
                            }}    
                        />
                    </LinearGradient>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#f5f5f5',
        marginHorizontal: 15
    },
    container2: {
        backgroundColor: '#707070',
        marginTop: 15,
        height: 230,
        borderRadius: 10,
        overflow: 'hidden'
    },
    subcontainer: {
        margin: 20,
        backgroundColor: 'blue',
        padding: 20,
        borderRadius: 10
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
        marginTop: 135
    },
    text: {
        color: '#f1f1f1',
        fontSize: 18,
        padding: 15,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 30,
        marginBottom: 15,
    },
    subcontainer2: {
        flexDirection: 'row',
        flexShrink: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 10,
    },
    subcontainer3: {
        flexDirection: 'row',
        flexShrink: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        borderRadius: 10,
    }
});