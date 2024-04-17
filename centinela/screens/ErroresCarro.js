import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ErroresCarros = ({ route }) => {
  const [datosErrores, setDatosErrores] = useState(route.params?.datosErrores || {});

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Temperatura:</Text>
        <Text style={styles.value}>{datosErrores.temperatura}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Aceite:</Text>
        <Text style={styles.value}>{datosErrores.aceite}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Anticongelante:</Text>
        <Text style={styles.value}>{datosErrores.anticongelante}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
  },
  value: {
    fontSize: 18,
  },
});

export default ErroresCarros;
