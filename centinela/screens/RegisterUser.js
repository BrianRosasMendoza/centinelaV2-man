import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import appFirebase from '../credenciales';

const auth = getAuth(appFirebase);

export default function RegisterUser(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

const registro = async () => {
    if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Error', 'Todos los campos son obligatorios');
        return;
    }
    if (password !== confirmPassword) {
        Alert.alert('Error', 'Las contraseñas no coinciden');
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert('Registro exitoso', 'Redirigiendo a la pantalla de inicio de sesión...');
        // Agregar un pequeño retraso antes de redirigir para asegurar que la alerta sea visible
        setTimeout(() => {
            props.navigation.navigate('Login');
        }, 1000);
    } catch (error) {
        console.error(error);
        let errorMessage = 'No se pudo registrar el usuario';
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'El correo electrónico ya está en uso';
        }
        Alert.alert('Error', errorMessage);
    }
};

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Image style={styles.img} source={require("../assets/user4.png")} />
                <Text style={styles.text}>Sing Up</Text>

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
                    <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                        <Icon name={passwordVisible ? "eye" : "eye-slash"} size={20} color="#727272" />
                    </TouchableOpacity>
                </View>

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
                    <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.eyeIcon}>
                        <Icon name={confirmPasswordVisible ? "eye" : "eye-slash"} size={20} color="#727272" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.boton} onPress={registro}>
                    <Text style={styles.textButton}>REGISTRAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: 370,
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        width: 100,
        height: 100,
        marginBottom: 15,
        borderRadius: 25,
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#E1E1E1',
        borderRadius: 10,
        marginBottom: 10,
        paddingHorizontal: 17,
        backgroundColor: '#F0F0F0',
    },
    icon: {
        marginRight: 17,
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
        marginTop: 30,
    },
    textButton: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
    },
});
