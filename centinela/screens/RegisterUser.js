import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image,Alert } from 'react-native'

import appFirebase from '../credenciales'
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
const auth=getAuth(appFirebase)

export default function RegisterUser(props) {
    //variable de estado
    const [email,setEmail]=useState()
    const[password,setPassword]=useState()

    const registro=async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password)
            Alert.alert('Registrando usuario','accediendo...')
            props.navigation.navigate('RegisterUser2')
        }catch(error){
            console.log(error)
            Alert.alert('Error','No se pudo registrar el usuario')
        }
    }
    
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require("../assets/userB.png")}/>
            <Text style={styles.text}>SIGN UP</Text>
            <TextInput style={styles.input} placeholder="Correo" onChangeText={(text)=>setEmail(text)}/>
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} onChangeText={(text)=>setPassword(text)}/>  
            <TouchableOpacity style={styles.boton} onPress={registro}>
                <Text  style={styles.textButton}>Registrar</Text>
            </TouchableOpacity>
            
            
        </View>
        
    
    );
}
const styles = StyleSheet.create({
    img:{
        width: 200, 
        height: 200, 
        marginBottom: 15,
        borderRadius:25,
    },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text:{
    fontSize:20,
    fontWeight:'bold',
    marginBottom:30,
  },
  
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius:20
  },
  boton:{
    backgroundColor:'#365B6D',
    fontVariant: 'bold',
    width:140,
    height:45,
    alignContent:'center',
    borderRadius:15
  }, 
  textButton:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center',
    color:'white'
  }
});