import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image,Alert } from 'react-native'
//Validaciom con autentication
import appFirebase from '../credenciales'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
const auth=getAuth(appFirebase)

export default function Login(props) {
    //variable de estado
    const [email,setEmail]=useState()
    const[password,setPassword]=useState()

    const logueo=async()=>{
        
            
            Alert.alert('Iniciando sesión','accediendo...')
            props.navigation.navigate('Home')
        
         
    }
    
    return (
        <View style={styles.container}>
            <Image style={styles.img} source={require("../assets/logo.png")}/>
            <Text style={styles.text}>Ingresar</Text>
            <TextInput style={styles.input} placeholder="Correo" onChangeText={(text)=>setEmail(text)}/>
            <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} onChangeText={(text)=>setPassword(text)}/>  
            <TouchableOpacity style={styles.boton} onPress={logueo}>
                <Text  style={styles.textButton}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.boton} onPress={() => props.navigation.navigate('RegisterUser')}>
                <Text  style={styles.textButton}>Registrarse</Text>
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
    width:160,
    height:40,
    alignContent:'center',
    borderRadius:15,
    marginTop:20,
  }, 
  textButton:{
    fontSize:25,
    fontWeight:'bold',
    textAlign:'center',
    color:'white'
  }
});
