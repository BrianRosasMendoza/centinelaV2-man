import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const olvidarContra = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>¿Olvidaste tu contraseña?</Text>
            <Button
                title="Volver al Inicio"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default olvidarContra;