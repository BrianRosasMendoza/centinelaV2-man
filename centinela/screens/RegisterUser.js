import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../credenciales'; // Asegúrate de que este sea el camino correcto a tus credenciales de Firebase

const auth = getAuth(appFirebase);

export default function RegisterUser(props) {
    // Estado del formulario
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    // Función de registro de usuario
    const registro = async () => {
        // Validar campos vacíos
        if (!username || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Todos los campos son obligatorios');
            return;
        }
        // Validar coincidencia de contraseñas
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        // Intentar registrar al usuario
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Registro exitoso', 'Redirigiendo a la pantalla de inicio de sesión...');
            // Navegar a la pantalla de inicio de sesión después de un registro exitoso
            props.navigation.navigate('Login');
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'No se pudo registrar el usuario');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image style={styles.img} source={require("../assets/user4.png")} />
                <Text style={styles.text}>SIGN UP</Text>
                
                {/* Campo de entrada para Username con ícono de usuario */}
                <View style={styles.inputContainer}>
                    <Icon name="user" size={20} color="#727272" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Username"
                        value={username}
                        onChangeText={setUsername}
                        placeholderTextColor="#727272"
                    />
                </View>

                {/* Campo de entrada para Correo con ícono de correo */}
                <View style={styles.inputContainer}>
                    <Icon name="envelope" size={20} color="#727272" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Correo"
                        value={email}
                        onChangeText={setEmail}
                        placeholderTextColor="#727272"
                    />
                </View>

                {/* Campo de entrada para Contraseña con ícono de candado y ojito */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#727272" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={setPassword}
                        placeholderTextColor="#727272"
                    />
                    {/* Botón para alternar la visibilidad de la contraseña */}
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                        <Icon name={passwordVisible ? "eye" : "eye-slash"} size={20} color="#727272" />
                    </TouchableOpacity>
                </View>

                {/* Campo de entrada para Confirmación de Contraseña con ícono de candado y ojito */}
                <View style={styles.inputContainer}>
                    <Icon name="lock" size={20} color="#727272" style={styles.icon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmar Contraseña"
                        secureTextEntry={!confirmPasswordVisible}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        placeholderTextColor="#727272"
                    />
                    {/* Botón para alternar la visibilidad de la confirmación de contraseña */}
                    <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
                        <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={20} color="#727272" />
                    </TouchableOpacity>
                </View>

                {/* Botón de registro */}
                <TouchableOpacity style={styles.boton} onPress={registro}>
                    <Text style={styles.textButton}>Registrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: '40%',
        padding: 20,
        borderRadius: 15,
        backgroundColor: '#fffaf6',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
        alignItems: 'center',
    },
    img: {
        width: 200,
        height: 200,
        marginBottom: 15,
        borderRadius: 25,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 40,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 20,
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 40,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    boton: {
        backgroundColor: '#A29259',
        fontVariant: 'bold',
        width: 140,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
    },
    textButton: {
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
});
