import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { getFirestore, doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

export default function RegisterUser(props) {
  const initialState = {
    nombre: '',
    apellido: '',
    usuario: '',
    telefono: '',
    direccion: '',
  };

  const [state, setState] = useState(initialState);
  const isFocused = useIsFocused();

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const userId = user.uid;

          // Obtener datos del usuario desde Firestore usando el ID del usuario
          const userDoc = await getDoc(doc(db, 'Usuarios', userId));

          if (userDoc.exists()) {
            // Si el documento existe, cargar los datos en el estado
            setState({ ...userDoc.data() });
          }
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    cargarDatosUsuario();
  }, [isFocused]);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  const saveData = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        const userId = user.uid;

        // Actualizar datos en Firestore usando el ID del usuario
        await updateDoc(doc(db, 'Usuarios', userId), {
          ...state,
        });

        Alert.alert('Datos actualizados', 'Accediendo a la siguiente sección');
        props.navigation.navigate('Home');
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      Alert.alert('Error', 'No se pudo guardar los datos');
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={require('../assets/user.png')} />
        <Text style={styles.text}>Datos obligatorios</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          onChangeText={(value) => handleChangeText(value, 'nombre')}
          value={state.nombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Apellido"
          onChangeText={(value) => handleChangeText(value, 'apellido')}
          value={state.apellido}
        />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          onChangeText={(value) => handleChangeText(value, 'usuario')}
          value={state.usuario}
        />
        <TextInput
          style={styles.input}
          placeholder="Teléfono"
          onChangeText={(value) => handleChangeText(value, 'telefono')}
          value={state.telefono}
        />
        <TextInput
          style={styles.input}
          placeholder="Dirección"
          onChangeText={(value) => handleChangeText(value, 'direccion')}
          value={state.direccion}
        />
        <TouchableOpacity style={styles.boton} onPress={saveData}>
          <Text style={styles.textButton}>Actualizar Datos</Text>
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
    borderRadius: 25,
  },
  container: {
    flex: 1,
    width: 400,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    padding: 10,
    borderRadius: 8,
  },
  boton: {
    backgroundColor: '#a29259',
    fontVariant: 'bold',
    width: 145,
    height: 50,
    alignContent: 'center',
    borderRadius: 15,
  },
  textButton: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingTop: 12,
    textAlign: 'center',
    color: 'white',
  },
});
