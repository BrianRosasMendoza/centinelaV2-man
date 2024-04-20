import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import appFirebase from '../credenciales';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';

const auth = getAuth(appFirebase);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logueo = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Iniciando sesión', 'Accediendo...');
            props.navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    // Manejador para iniciar sesión con Google
    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            props.navigation.navigate('Home');
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
            Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
        }
    };

    // Manejador para iniciar sesión con Facebook
    const handleFacebookSignIn = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
            props.navigation.navigate('Home');
        } catch (error) {
            console.error('Error al iniciar sesión con Facebook:', error);
            Alert.alert('Error', 'No se pudo iniciar sesión con Facebook.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Login</Text>

                <View style={styles.avatarContainer}>
                    <Image source={require("../assets/user4.png")} style={styles.avatar} />
                </View>

                <Text style={styles.label}>Correo Electrónico</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#727272"
                />
                <Text style={styles.label}>Contraseña</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#727272"
                />

                <TouchableOpacity style={styles.btn} onPress={logueo}>
                    <Text style={styles.btnText}>INGRESAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.registerBtn} onPress={() => props.navigation.navigate('RegisterUser')}>
                    <Text style={styles.registerBtnText}>Registrarme</Text>
                </TouchableOpacity>

                <Text style={styles.alternativeLoginText}>Iniciar sesión de otra manera</Text>

                <View style={styles.socialLogin}>
                    <TouchableOpacity style={styles.socialButton} onPress={handleGoogleSignIn}>
                        <Image source={require("../assets/google_icon.jpg")} style={styles.socialIcon} />
                        <Text style={styles.socialText}>Google</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton} onPress={handleFacebookSignIn}>
                        <Image source={require("../assets/facebook_icon.png")} style={styles.socialIcon} />
                        <Text style={styles.socialText}>Facebook</Text>
                    </TouchableOpacity>
                </View>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    avatarContainer: {
        width: 114,
        height: 114,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#727272',
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 35,
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
        padding: 8,
        borderRadius: 8,
        fontSize: 14,
        textAlign: 'center',
    },
    btn: {
        width: '30%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#A29259',
        borderRadius: 8,
        marginTop: 20,
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#FFFFFF',
        textTransform: 'uppercase',
    },
    registerBtn: {
        marginTop: 15,
        backgroundColor: '#f0f8ff',
        padding: 10,
        borderRadius: 8,
    },
    registerBtnText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#365B6D',
        textTransform: 'uppercase',
    },
    alternativeLoginText: {
        marginTop: 15,
        color: '#727272',
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    socialLogin: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10,
    },
    socialButton: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginHorizontal: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    socialIcon: {
        width: 24,
        height: 24,
        marginRight: 10,
    },
    socialText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
});
