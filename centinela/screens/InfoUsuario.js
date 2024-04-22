import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, TextInput} from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import appFirebase from '../credenciales';
import ImageZoom from 'react-native-image-pan-zoom';


const db = getFirestore(appFirebase);

export default function PerfilUsuario({ navigation }) {
  const [userInfo, setUserInfo] = useState({});
  const [newPassword, setNewPassword] = useState('');
  const auth = getAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          const userDocRef = doc(db, 'Usuarios', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            setUserInfo(userDoc.data());
          } else {
            console.error('No se encontró el registro del usuario');
          }
        }
      } catch (error) {
        console.error('Error al obtener la información del usuario', error);
      }
    };

    fetchUserData();
  }, [isFocused]);
  const sendEmergencySMS = async () => {
    if (location) {
      try {
        // Resto del código sigue igual
        const phoneNumber = contactoInfo.telefonoContacto;
        const message = `¡Emergencia! Mi ubicación actual es: https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}`;
        
        const url = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
        Linking.openURL(url).catch((err) => {
          console.error('Error al abrir la aplicación de mensajes', err);
          Alert.alert('Error', 'Error al abrir la aplicación de mensajes');
        });
      } catch (error) {
        console.error('Error al obtener la información del contacto de emergnecia', error);
      }
    } else {
      Alert.alert('Error', 'No se pudo obtener la ubicación');
    }
  };
 

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.vertical}>
          <Image
            style={styles.img}
            source={require("../assets/user.png")}
          />
          <Text style={styles.textFoto}>{userInfo.foto}</Text>
        </View>
        <Text style={styles.text}>Nombre: {userInfo.nombre}</Text>
        <Text style={styles.text}>Apellido: {userInfo.apellido}</Text>
        <Text style={styles.text}>Usuario: {userInfo.usuario}</Text>
        <Text style={styles.text}>Correo: {auth.currentUser.email}</Text>
        <Text style={styles.text}>Contraseña: *********</Text>
        <Text style={styles.text}>Teléfono: {userInfo.telefono}</Text>
  
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditarUsuario')}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('InfoContacto')}>
          <Text style={styles.buttonText}>Contacto de emergencia</Text>
        </TouchableOpacity>
  
        
        <View style={styles.slide}>
          <TouchableWithoutFeedback>
            <ImageZoom
              cropWidth={2000}
              cropHeight={700}
              imageWidth={1500}
              imageHeight={1500}
            >
              <View style={styles.mapContainer}>
                <Image source={require('../assets/map.png')} style={styles.image2} />
              </View>
            </ImageZoom>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.barra}>
          <TouchableOpacity onPress={sendEmergencySMS} style={styles.buttonContainer}>
            <Image source={require('../assets/advertencia.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('InfoUsuario')} style={styles.buttonContainer}>
            <Image source={require('../assets/userB.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('InfoCarro')} style={styles.buttonContainer}>
            <Image source={require('../assets/iconoCarro.png')} style={styles.buttonImage} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('')} style={styles.buttonContainer}>
            <Image source={require('../assets/notificacion.png')} style={styles.buttonImage} />
          </TouchableOpacity>
        </View>
      
      </View>
    </ScrollView>
  );
  }

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
    marginBottom: 30,
  },
  textFoto: {
    marginLeft: 10,
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  textNormal: {
    fontSize: 20,
    marginBottom: 30,
  },
  body: {},
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
  },
  button: {
    backgroundColor: '#a29259',
    width: 200,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button2: {
    backgroundColor: '#a29259',
    width: 200,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  changePasswordContainer: {
    marginTop: 20,
  },
  changePasswordLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
});
