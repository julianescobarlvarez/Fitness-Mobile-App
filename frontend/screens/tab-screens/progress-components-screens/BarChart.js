import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

// Componente para la gráfica de barras
const BarChart = ({ data }) => {
    // Encuentra el valor máximo de los datos para ajustar las alturas de las barras
    const maxValue = Math.max(...data)
    
    // Función para generar las marcas del eje Y
    const generateYAxisLabels = () => {
        const numberOfTicks = 6; // Número de marcas en el eje Y
        const step = Math.ceil(maxValue / numberOfTicks)
        let labels = []
        
        for (let i = 0; i <= maxValue; i += step) {
            labels.push(maxValue - i)
        }
        
        return labels
    }

    // Genera las etiquetas del eje Y
    const yAxisLabels = generateYAxisLabels()

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
                        )
                    })}
                </View>
            </ScrollView>  
        </View>
    )
}

const styles = StyleSheet.create({
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        height: 240,
        padding: 5,
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
    xAxisLabel: {
        position: 'absolute',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#333',
        bottom: -20,
        width: 23
    }
})

export default BarChart