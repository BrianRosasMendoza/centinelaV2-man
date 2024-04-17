import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

export default function InfoContacto({ navigation }) {
  const [ContactoInfo, setContactoInfo] = useState({});
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
        console.error('Error al obtener la información del contacto de emergnecia', error);
      }
    };

    fetchContactoData();
  }, [isFocused]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.vertical}>
          <Image
            style={styles.img}
            source={require("../assets/sos.png")}
          />
          {/* Puedes mostrar la foto del vehículo aquí */}
        </View>
        <Text style={styles.text}>Nombre: {ContactoInfo.nombreContacto}</Text>
        <Text style={styles.text}>Apellido: {ContactoInfo.apellidoContacto}</Text>
        <Text style={styles.text}>Parentesco: {ContactoInfo.parentescoContacto}</Text>
        <Text style={styles.text}>Telefono: {ContactoInfo.telefonoContacto}</Text>
        

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditarEmergencia')}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
       
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
  body: {},
  button: {
    backgroundColor: '#365B6D',
    width: 140,
    height: 40,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
