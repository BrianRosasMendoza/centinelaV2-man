// Importa las funciones necesarias
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import appFirebase from '../credenciales';

// Obtén una instancia de Firestore
const db = getFirestore(appFirebase);

export default function Contacto(props) {
  // Estado inicial para los datos de contacto
  const initialState = {
    nombreContacto: '',
    apellidoContacto: '',
    telefonoContacto: '',
    parentescoContacto: ''
  };

  // Estado para almacenar los datos de contacto
  const [state, setState] = useState(initialState);
  const isFocused = useIsFocused();

  // Efecto para cargar los datos del usuario cuando la pantalla está enfocada
  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          // Obtén el documento existente del usuario
          const userDocRef = doc(db, 'Usuarios', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            // Si el documento existe, cargar los datos de contacto de emergencia en el estado
            setState({ ...userDoc.data().contactoEmergencia });
          }
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    cargarDatosUsuario();
  }, [isFocused]);

  // Función para manejar cambios en los campos de texto
  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  // Función para guardar los datos en Firestore
  const saveData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;

        // Obtén el documento existente del usuario
        const userDocRef = doc(db, 'Usuarios', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Si el documento existe, actualizarlo con la nueva información del contacto
          await updateDoc(userDocRef, {
            contactoEmergencia: {
              ...state
            }
          });

          // Mostrar mensaje de éxito
          Alert.alert('Actualización exitosa', 'Los datos se han guardado correctamente.');

          // Redirigir al usuario a la pantalla de inicio
          props.navigation.navigate('Home');
        } else {
          // Si el documento no existe, mostrar un mensaje de error
          Alert.alert('Error', 'No se encontró el registro del usuario');
        }
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'No se pudo guardar los datos.');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/sos.png')} />
        <Text style={styles.text}>Datos de tu contacto de emergencia</Text>
        <Text style={styles.text}>En caso de una emergencia, será la persona a ser notificada</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText(value, 'nombreContacto')}
          value={state.nombreContacto}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={(value) => handleChangeText(value, 'apellidoContacto')}
          value={state.apellidoContacto}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          onChangeText={(value) => handleChangeText(value, 'telefonoContacto')}
          value={state.telefonoContacto}
        />
        <TextInput
          style={styles.input}
          placeholder="Parentesco"
          onChangeText={(value) => handleChangeText(value, 'parentescoContacto')}
          value={state.parentescoContacto}
        />
 <TouchableOpacity style={styles.boton} onPress={saveData => props.navigation.navigate('Contacto')}>
          <Text style={styles.textButton}>Guardar datos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  img: {
    width: 200,
    height: 200,
    marginBottom: 15,
    borderRadius: 25
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 20
  },
  boton: {
    backgroundColor: '#365B6D',
    fontVariant: 'bold',
    width: 200,
    height: 40,
    alignContent: 'center',
    borderRadius: 15
  },
  textButton: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white'
  }
});
