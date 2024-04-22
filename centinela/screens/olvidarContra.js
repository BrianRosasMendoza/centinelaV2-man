import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const OlvidarContra = () => {
    const navigation = useNavigation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleAceptar = () => {
        // Aquí puedes implementar la lógica para aceptar la nueva contraseña
        console.log('Contraseña aceptada');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Recuperar Contraseña</Text>
            <Text style={styles.subTitle}>Ingresa tu nueva contraseña</Text>

            <TextInput
                style={styles.input}
                placeholder="Contraseña Nueva"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirmar Contraseña"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.btn} onPress={handleAceptar}>
                <Text style={styles.btnText}>Aceptar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.volverBtnText} onPress={() => navigation.navigate('Login')}>
                <Text>Volver al Inicio</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 40,
        fontFamily: 'Montserrat', 
    },
    subTitle: {
        fontSize: 25,
        marginBottom: 20,
        color: '#666',
        fontFamily: 'Times New Roman', 
    },
    input: {
        width: '30%',
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    btn: {
        width: '20%',
        height: 40,
        backgroundColor: '#A29259',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    btnText: {
        color: '#fff',
        fontWeight: 'bold',
    },

    volverBtnText: {
        marginTop: 15,
        paddingVertical: 10, // Aumenta el espacio vertical del botón
        paddingHorizontal: 20, // Aumenta el espacio horizontal del botón
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#a29259',
    },
});

export default OlvidarContra;
