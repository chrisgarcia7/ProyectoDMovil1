import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Tabbar from './Components/Tabbar';
import Login from './Components/Login';
import StackLogin from './Components/StackLogin';
import Provider from './Context/Provider';

export default function App() {
  return (
    <Provider>
      <StackLogin></StackLogin>

    </Provider>
    

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
