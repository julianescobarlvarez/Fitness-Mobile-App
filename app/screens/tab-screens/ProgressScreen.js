import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Pressable, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Datos de la gráfica
const data = [30, 70, 50, 80, 60, 90, 120, 180, 300, 90, 60, 30, 70, 60, 65, 50, 80, 40, 70, 50];

// Componente para la gráfica de barras
const BarChart = ({ data }) => {
    // Encuentra el valor máximo de los datos para ajustar las alturas de las barras
    const maxValue = Math.max(...data);
    
    // Función para generar las marcas del eje Y
    const generateYAxisLabels = () => {
        const numberOfTicks = 6; // Número de marcas en el eje Y
        const step = Math.ceil(maxValue / numberOfTicks);
        let labels = [];
        
        for (let i = 0; i <= maxValue; i += step) {
            labels.push(maxValue - i);
        }
        
        return labels;
    };

    // Genera las etiquetas del eje Y
    const yAxisLabels = generateYAxisLabels();

    return (
        <View style={styles.chartContainer}>
            {/* Eje Y */}
            <View style={styles.yAxisContainer}>
                {yAxisLabels.map((label, index) => (
                    <Text key={index} style={styles.yAxisLabel}>{label}</Text>
                ))}
            </View>
            <ScrollView
                horizontal={true} 
                showsHorizontalScrollIndicator={false}
            > 
                {/* Barras de la gráfica */}
                <View style={styles.barsContainer}>
                    {data.map((value, index) => {
                        const barHeight = (value / maxValue) * 200
                        return (
                            <View key={index} style={[styles.bar, { height: barHeight }]}>
                                <Text style={styles.barLabel}>{value}</Text>
                                <Text key={index} style={styles.xAxisLabel}>{index + 1}</Text>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>  
        </View>
    );
};

// Componente principal
export default function ProgressScreen() {
    
    // IMC inicial
    const [bmi, setBMI] = useState(21.7);
    const [bfp, setBFP] = useState(18)

    // Rango de IMC (puedes ajustar estos valores a lo que necesites)
    const minBMI = 15
    const maxBMI = 40

    const minBFP = 1
    const maxBFP = 40

    // Rango de colores para la barra
    const rangeColors = ['#0e9b01', '#04f700', 'yellow', '#ff9500', 'red']
    const rangeColors2 = ['#0000c1', '#00e7e0', '#00e7e0', '#0000c1']

    const colorStops = [0, 0.20, 0.45, 0.75, 1]
    const colorStops2 = [0, 0.14, 0.57, 1]
    
    // Función para calcular la posición del indicador en función del IMC
    const calculateBMIPosition = (bmi) => {
        return ((bmi - minBMI) / (maxBMI - minBMI)) * 100;
    };

    const BMIPosition = calculateBMIPosition(bmi);

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
        return ((bfp - minBFP) / (maxBFP - minBFP)) * 100;
    }

    const ifBFPValue = () => {
        if(bmi < 6){
            return 'Tu porcentaje de grasa corporal es más bajo que el de un atleta.'
        }
        if(bmi >= 6 && bmi <= 13){
            return 'Estás en el rango común de un deportista de alto rendimiento.'
        }
        if(bmi >= 14 && bmi <= 17){
            return 'Estás en el rango común de una persona activa.'
        }
        if(bmi >= 18 && bmi <= 24){
            return 'Estás en el rango común de una persona promedio.'
        }
        if(bmi >= 25 && bmi <= 31){
            return 'Estás en el rango común de una persona con sobrepeso.'
        }
        else{
            return 'Estás en el rango común de una persona con obesidad.'
        }
    }

    const BFPPosition = calculateBFPPosition(bfp);

    return (
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
        </ScrollView>
    )
}

// Estilos
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginHorizontal: 15,
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
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: 240,
        padding: 5,
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
    yAxisContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 10,
        height: '100%',
    },
    yAxisLabel: {
        color: '#333',
        fontSize: 12,
        fontWeight: 'bold',
        paddingBottom: 12,
        paddingTop: 2
    },
    barsContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingBottom: 20,
        paddingTop: 5
    },
    bar: {
        width: 25,
        backgroundColor: '#4f66e4',
        justifyContent: 'flex-end',
        marginHorizontal: 5,
        borderRadius: 2,
    },
    barLabel: {
        color: 'white',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 5,
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
    xAxisLabel: {
        position: 'absolute',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#333',
        bottom: -20,
        width: 23
    },
});
