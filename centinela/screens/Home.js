import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Image, Text, Linking, Dimensions, TouchableWithoutFeedback } from 'react-native';
import Swiper from 'react-native-swiper/src';
import * as Location from 'expo-location';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import appFirebase from '../credenciales';
import ImageZoom from 'react-native-image-pan-zoom';
//modificacion del carrusel de imagenes y barra inferior
const db = getFirestore(appFirebase);

export default function Home(props) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [contactoInfo, setContactoInfo] = useState({});
  const auth = getAuth();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchContactoData = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          const userDocRef = doc(db, 'Usuarios', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Comprobar si la subcolección "vehiculo" existe en el documento del usuario
            if (userData.contactoEmergencia) {
              setContactoInfo(userData.contactoEmergencia);
            } else {
              console.error('No se encontró la información del contacto de emergencia');
            }
          } else {
            console.error('No se encontró el registro del contacto de emergencia');
          }
        }
      } catch (error) {
        console.error('Error al obtener la información del contacto de emergencia', error);
      }
    };

    fetchContactoData();

    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permiso para acceder a la ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
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
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide}>
            <Image source={require('../assets/img1.jpg')} style={styles.image} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../assets/img2.jpg')} style={styles.image} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../assets/img3.jpg')} style={styles.image} />
          </View>
          <View style={styles.slide}>
            <Image source={require('../assets/img4.jpg')} style={styles.image} />
          </View>
          </Swiper>
      </View>
      <View style={styles.slide}>
        <TouchableWithoutFeedback>
          <ImageZoom
            cropWidth={300}
            cropHeight={300}
            imageWidth={200}
            imageHeight={200}
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
        <TouchableOpacity onPress={() => props.navigation.navigate('InfoUsuario')} style={styles.buttonContainer}>
          <Image source={require('../assets/userB.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('InfoCarro')} style={styles.buttonContainer}>
          <Image source={require('../assets/iconoCarro.png')} style={styles.buttonImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => props.navigation.navigate('')} style={styles.buttonContainer}>
          <Image source={require('../assets/notificacion.png')} style={styles.buttonImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  /*carouselContainer: {
    width: '100%',
    height: '50%',
    marginTop: -120, // Ajusta según tus necesidades para pegar el carrusel arriba
  },

  image: {
    width: '70%', // Ajusta según tus necesidades
    height: '70%', // Ajusta según tus necesidades
    resizeMode: 'cover',
  },
  wrapper: {},
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },*/
  mapContainer: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'hidden',
  },
 
  image2: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  barra: {
    height: 70,
    width: '100%',
    backgroundColor: '#365B6D',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
  buttonContainer: {
    marginHorizontal: 10,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 30,
    height: 30,
  },
  locationContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 10,
  },
});
