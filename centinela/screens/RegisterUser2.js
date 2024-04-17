import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useIsFocused } from '@react-navigation/native';
import appFirebase from '../credenciales';

const db = getFirestore(appFirebase);

export default function RegisterUser(props) {
  const initialState = {
    nombre: '',
    apellido: '',
    usuario: '',
    telefono: '',
    direccion: ''
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

        // Ahora, guarda los datos en la colección de Usuarios usando el ID del usuario
        await setDoc(doc(db, 'Usuarios', userId), {
          ...state
        });

        Alert.alert('Registro exitoso', 'Accediendo a la siguiente sección');
        props.navigation.navigate('Contacto');
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo hacer el registro');
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
          <Text style={styles.textButton}>Registrar Datos</Text>
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
    width: 145,
    height: 70,
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
