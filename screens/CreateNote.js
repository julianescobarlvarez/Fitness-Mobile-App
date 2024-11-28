import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'

export default function CreateNote(props) {
  
    return (
        <View style={styles.contenedorPadre}>
            <View style={styles.tarjeta}>
                <View style={styles.contenedor}>
                    <TextInput placeholder='Escribe lo que deseas, bebe ><' style={styles.textoInput}/>
                    <TextInput 
                        placeholder='Escribe lo que deseas, bebe2 ><' 
                        multiline={true} 
                        numberOfLines={4} 
                        style={styles.textoInput}
                    />
                    {/*Contenedor fecha */}
                    <View style={styles.inputDate}>
                        <TextInput placeholder='22-11-2024' style={styles.textoDate}/>
                        <TouchableOpacity style={styles.botonDate}>
                            <Text style={styles.subtitle}>Date</Text>
                        </TouchableOpacity>
                    </View>
                    {/*Contenedor hora*/}
                    <View style={styles.inputDate}>
                        <TextInput placeholder='Hora: 6 minutos: 30' style={styles.textoDate}/>
                        <TouchableOpacity style={styles.botonDate}>
                            <Text style={styles.subtitle}>Hora</Text>
                        </TouchableOpacity>
                    </View>
                    {/*Botón para enviar los datos*/}
                    <View>
                        <TouchableOpacity
                            style={styles.botonEnviar}
                            /*onPress={saveNote}*/
                        >
                            <Text style={styles.textoBtnEnviar}>
                                Guardar una nueva nota
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
    
}
  
const styles = StyleSheet.create({
    contenedorPadre:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
    },
    tarjeta:{
        margin:20,
        backgroundColor:'white',
        borderRadius:20,
        width:'90%',
        padding:20,
        shadowColor: '#000',
        shadowOffset:{
            width:0,
            height:2
        },
        shadowOpacity:0.25,
        shadowRadius:4,
        elevation:5
    },
    contenedor:{
        padding:20
    },
    textoInput:{
        borderColor: 'slategray',
        borderWidth:1,
        padding:2,
        marginTop:10,
        borderRadius:8
    },
    inputDate:{
        width:'100%',
        flexWrap:'wrap',
        flexDirection:'row'
    },
    botonDate:{
        backgroundColor:'#B71375',
        borderRadius:5,
        padding:10,
        width:'30%',
        height:'90%',
        marginTop:10,
        marginLeft:10
    },
    textoDate:{
        borderColor:'slategray',
        borderWidth:1,
        padding:10,
        marginTop:10,
        borderRadius:8
    },
    subtitle:{
        color:'white',
        fontSize:18
    },
    botonEnviar:{
        backgroundColor: '#B71375',
        borderColor: '#FC4F00',
        borderWidth:3,
        borderRadius:20,
        marginLeft:20,
        marginRight:20,
        marginTop:20
    },
    textoBtnEnviar:{
        textAlign:'center',
        padding:10,
        color:'white',
        fontSize:16
    }
})
