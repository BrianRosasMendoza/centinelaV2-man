import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

export default function Contacto(props) {
  const initialState = {
    nombreContacto: '',
    apellidoContacto: '',
    telefonoContacto: '',
    parentescoContacto: ''
  };

  const [state, setState] = useState(initialState);
  const isFocused = useIsFocused();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user && isFocused) {
      // Si el usuario no está autenticado y la pantalla está enfocada,
      // redirige a la pantalla de inicio de sesión
      props.navigation.navigate('Login');
    }
  }, [isFocused, props.navigation]);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // El usuario está autenticado, puedes acceder a user.uid
        const userId = user.uid;

        // Obtener el documento existente
        const userDocRef = doc(db, 'Usuarios', userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          // Si el documento existe, actualizarlo con la nueva información del contacto
          await updateDoc(userDocRef, {
            ...userDoc.data(),  // Mantener la información existente
            contactoEmergencia: {
              ...state
            }
          });

          Alert.alert('Actualización exitosa', 'Accediendo a la siguiente sección');
          props.navigation.navigate('Carro');
        } else {
          // Si el documento no existe, mostrar un mensaje de error
          Alert.alert('Error', 'No se encontró el registro del usuario');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo hacer la actualización');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/emergencia.png')} />
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
        <TouchableOpacity style={styles.boton} onPress={saveData}>
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
    backgroundColor: '#a29259',
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
    color: '#f7faf8'
  }
});
