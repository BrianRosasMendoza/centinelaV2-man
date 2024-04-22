import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import appFirebase from '../credenciales';
import * as Location from 'expo-location';

const db = getFirestore(appFirebase);

const InfoCarro = ({ navigation }) => {
  const [vehicleInfo, setVehicleInfo] = useState({});
  const auth = getAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          const userDocRef = doc(db, 'Usuarios', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.vehiculo) {
              setVehicleInfo(userData.vehiculo);
            } else {
              console.error('No se encontró la información del vehículo');
            }
          } else {
            console.error('No se encontró el registro del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener la información del vehículo', error);
      }
    };

    fetchVehicleData();
  }, [isFocused]);

  const handleConnect = async () => {
    try {
      const response = await axios.get('http://10.0.30.34:5000/ruta_de_conexion');
      
      // Accede a los datos en la respuesta
      const datosDelServidor = response.data;
      console.log('Datos del servidor:', datosDelServidor);
  
      // Pasa los datos a la pantalla EstadoCarro
      navigation.navigate('EstadoCarro', {
        temperatura: datosDelServidor.temperatura,
        aceite: datosDelServidor.aceite,
        anticongelante: datosDelServidor.anticongelante,
      });
    } catch (error) {
      console.error('Error al conectar con el servidor Python', error);
    }
  };

  const handleAccidente = async () => {
    try {
      // Obtener la ubicación actual del dispositivo
      let location = null;
      const { status } = await Location.requestForegroundPermissionsAsync();
  
      if (status === 'granted') {
        location = await Location.getCurrentPositionAsync({});
      }
  
      await axios.get('http://10.0.30.34:5000/ruta_de_conexion', {
  params: {
    accidente: true,
    latitude: location ? location.coords.latitude : null,
    longitude: location ? location.coords.longitude : null,
  },
});
  
      // Mostrar una alerta en la aplicación
      Alert.alert('Ubicación Enviada', 'Tu ubicación ha sido enviada debido a un accidente.');
    } catch (error) {
      console.error('Error al enviar la solicitud de accidente', error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.vertical}>
          <Image
            style={styles.img}
            source={require("../assets/InfoCarro.png")}
          />
        </View>
        <Text style={styles.text}>Marca: {vehicleInfo.marca}</Text>
        <Text style={styles.text}>Modelo: {vehicleInfo.modelo}</Text>
        <Text style={styles.text}>Año: {vehicleInfo.year}</Text>
        <Text style={styles.text}>Vin: {vehicleInfo.vin}</Text>
        <Text style={styles.text}>Matricula: {vehicleInfo.matricula}</Text>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditarCarro')}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate('EstadoCarro')}>
          <Text style={styles.buttonText}>Estado Del carro</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAccidente}>
          <Text style={styles.buttonText}>Accidente</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  vertical: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 50,
  },
  img: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 25,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#a29259',
    width: 180,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#f7faf8',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default InfoCarro;
