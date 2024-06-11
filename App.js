import { StyleSheet, View, Pressable, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DangNhap from './components/layouts/DangNhap';
import DangKy from './components/layouts/DangKy';
import CaiDat from './components/layouts/CaiDat';
import HocPhan from './components/layouts/HocPhan';
// import LopHoc from './components/layouts/LopHoc';
import bottomTab from './components/layouts/bottomTab';
import HoSo from './components/layouts/HoSo';
import { Provider, useSelector } from 'react-redux';
import { store } from './redux/store';
import { selectUser } from './redux/userSlice';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='DangNhap'>
          <Stack.Screen name="DangNhap" component={DangNhap} options={{ headerShown: false }} />
          <Stack.Screen name="DangKy" component={DangKy} options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#2F3856'
            },
            headerTintColor: 'white'
          }} />
          <Stack.Screen name="CaiDat" component={CaiDat} options={{
            headerShown: true,
            title:'Cài đặt',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#0A082D',
            }, 
            headerTintColor: 'white'
          }} />
          <Stack.Screen name="HocPhan" component={HocPhan} options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#2F3856'
            },
            headerTintColor: 'white'
          }} />
          <Stack.Screen name="bottomTab" component={bottomTab} options={{ headerShown: false }} />
          {/* <Stack.Screen name="HoSo" component={HoSo} options={{
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#0A082D'
            },
            headerTintColor: 'white',
            headerRight: () => renderHeaderRightOfHoSo(navigation),
          }} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
