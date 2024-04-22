import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importa el icono
import appFirebase from '../credenciales';

const auth = getAuth(appFirebase);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

export default function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const logueo = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Iniciando sesión', 'Accediendo...');
            props.navigation.navigate('Home');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            props.navigation.navigate('Home');
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
            Alert.alert('Error', 'No se pudo iniciar sesión con Google.');
        }
    };

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
                <View style={styles.avatarContainer}>
                    <Image source={require("../assets/logo.png")} style={styles.avatar} />
                </View>
                <Text style={styles.title}>Log In</Text>

                <Text style={styles.label}>Correo Electrónico</Text>
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
                <Text style={styles.label}>Contraseña</Text>
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
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
                        <Icon name={passwordVisible ? "eye" : "eye-slash"} size={20} color="#727272" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => props.navigation.navigate('olvidarContra')}>
                    <Text style={styles.forgotPassword}>Olvidaste contraseña</Text>
                </TouchableOpacity>

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
        alignItems: 'stretch',
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center',
    },
    avatarContainer: {
        width: 114,
        height: 114,
        alignSelf: 'center',
        marginTop: 20,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
        color: '#727272',
        textAlign: 'right',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 50, // Altura adecuada para alinear con otros campos
        borderWidth: 1,
        borderColor: '#E1E1E1',
        marginBottom: 20,
        padding: 8,
        borderRadius: 10,
        backgroundColor: '#F0F0F0',
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: '100%', // Para ocupar toda la altura del contenedor
        fontSize: 14,
    },
    eyeIcon: {
        marginLeft: 10,
    },
    btn: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
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
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#a29259',
        marginBottom: 15,
        alignSelf: 'center',
    },
    registerBtnText: {
        fontSize: 14,
        width: 100,
        fontWeight: 'bold',
        color: '#a29259',
        textTransform: 'uppercase',
    },
    alternativeLoginText: {
        marginTop: 25,
        color: '#727272',
        fontSize: 12,
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
        marginTop: 8,
        marginBottom:15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E1E1E1',
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
    forgotPassword: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10, // Espacio adicional para separar del botón INGRESAR
        textDecorationLine: 'underline',
    },
});
