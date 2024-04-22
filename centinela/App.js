//impoetacion de todas las librerias y dependencias a usar
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screens/Login';
import Home from './screens/Home';
import RegisterUser from './screens/RegisterUser';
import RegisterUser2 from './screens/RegisterUser2';
import Contacto from './screens/Contacto';
import Carro from './screens/Carro';
import InfoUsuario from './screens/InfoUsuario';
import InfoCarro from './screens/InfoCarro';
import InfoContacto from './screens/InfoContacto';
import EditarUsuario from './screens/EditarUsuario';
import EditarCarro from './screens/EditarCarro';
import EditarEmergencia from './screens/EditarEmergencia';
import EstadoCarro from './screens/EstadoCarro';
import olvidarContra from './screens/olvidarContra';


export default function App() {

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={
        {
          title:'Inicio de Sesión',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
     <Stack.Screen name="RegisterUser" component={RegisterUser} options={
        {
          title:'Registro cuenta de usuario',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      } />
      <Stack.Screen name="RegisterUser2" component={RegisterUser2} options={
        {
          title:'Registro datos del usuario',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      } />
      <Stack.Screen name="Contacto" component={Contacto}  options={
        {
          title:'Registro de Contacto de Emergencia',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
      <Stack.Screen name="Carro" component={Carro}  options={
        {
          title:'Registro de Contacto de Emergencia',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
      <Stack.Screen name="Home" component={Home}  options={
        {
          title:'Inicio',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
      <Stack.Screen name="InfoUsuario" component={InfoUsuario}  options={
        {
          title:'Datos Del Usuario',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }
      
      />
        <Stack.Screen name="InfoCarro" component={InfoCarro}  options={
        {
          title:'Datos Del vehiculo',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
      <Stack.Screen name="InfoContacto" component={InfoContacto}  options={
        {
          title:'Datos Del Contacto De Emergencia',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
      <Stack.Screen name="EditarUsuario" component={EditarUsuario}  options={
        {
          title:'Editar información del usuario',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
      <Stack.Screen name="EditarEmergencia" component={EditarEmergencia}  options={
        {
          title:'Editar información del contacto',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
      <Stack.Screen name="EditarCarro" component={EditarCarro}  options={
        {
          title:'Editar información del contacto',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
       <Stack.Screen name="EstadoCarro" component={EstadoCarro}  options={
        {
          title:'Estado del vehiculo',
          headerTintColor:'white',
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#221f17'
          }
        }
      }/>
      
   
    </Stack.Navigator>
  );
}

  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
