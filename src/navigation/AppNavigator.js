import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useSession } from '../context/SessionContext';
import { useNavigation } from '@react-navigation/native';
import LogoutScreen from '../screens/auth/LogoutScreen';
import { Ionicons } from '@expo/vector-icons';


import useAppTheme from '../hooks/useAppTheme';

import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import ProfileScreen from '../screens/common/ProfileScreen';
import DebugLoginScreen from '../screens/common/DebugLoginScreen';
import AdminDashboard from '../screens/dashboard/AdminDashboard';
import KtvDashboard from '../screens/dashboard/KtvDashboard';
import DonViDashboard from '../screens/dashboard/DonViDashboard';
import DonViYeuCauListScreen from '../screens/donvi/DonViYeuCauListScreen';
import TestBottomSheetScreen from '../screens/debug/TestBottomSheetScreen';
import DeviceListScreen from '../screens/donvi/DeviceListScreen';
import NewRequestScreen from '../screens/donvi/NewRequestScreen';

import ThietBiDetailScreen from '../screens/donvi/ThietBiDetailScreen';
import DeviceDetailScreen from '../screens/admin/DeviceDetailScreen';

import PhongListScreen from '../screens/donvi/PhongListScreen';
import AdminRequestListScreen from '../screens/admin/AdminRequestListScreen';
import SplashScreen from '../screens/common/SplashScreen';
import AdminRequestDetailScreen from '../screens/admin/AdminRequestDetailScreen';
import PhanCongDetailScreen from '../screens/admin/PhanCongDetailScreen';
import DeviceByRoomScreen from '../screens/donvi/DeviceByRoomScreen';
import AdminTechnicianListScreen from '../screens/admin/AdminDanhSachKyThuatVienScreen';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function MainDrawer() {
  const { currentUser, clearUser } = useSession();
  const { colors } = useAppTheme();

  return (
    <Drawer.Navigator
      screenOptions={({ route, navigation }) => ({
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.onSurface,
        headerLeft: route.name === 'Home'
          ? () => (
            <Ionicons
              name="menu"
              size={24}
              color={colors.onPrimary}
              style={{ marginLeft: 16 }}
              onPress={() => navigation.openDrawer()}
            />
          )
          : undefined,
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />

      {currentUser ? (
        <Drawer.Screen name="Logout" component={LogoutScreen} />
      ) : (
        <Drawer.Screen name="Login" component={LoginScreen} />
      )}
    </Drawer.Navigator>
  );
}


export default function AppNavigator() {
  const { colors } = useAppTheme();

  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.onPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainDrawer" component={MainDrawer} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="DebugLogin" component={DebugLoginScreen} />
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="KtvDashboard" component={KtvDashboard} />
      <Stack.Screen name="DonViDashboard" component={DonViDashboard} />
      <Stack.Screen name="QLDVDanhSachYeuCau" component={DonViYeuCauListScreen} />
      <Stack.Screen name="TestBottomSheet" component={TestBottomSheetScreen} />
      <Stack.Screen name="DeviceList" component={DeviceListScreen} />
      <Stack.Screen name="NewRequest" component={NewRequestScreen} />

      <Stack.Screen name="ThietBiDetail" component={DeviceDetailScreen} options={{ title: 'Chi tiết thiết bị' }} />
      <Stack.Screen name="DonViThietBiDetail" component={ThietBiDetailScreen} options={{ title: 'Chi tiết thiết bị' }} />


      <Stack.Screen name="PhongList" component={PhongListScreen} />
      <Stack.Screen
        name="AdminRequestList"
        component={AdminRequestListScreen}
        options={{ title: 'DS Yêu cầu' }}
      />
      <Stack.Screen
        name="AdminRequestDetail"
        component={AdminRequestDetailScreen}
        options={{ title: 'Chi tiết yêu cầu' }}
      />
      <Stack.Screen
        name="DeviceDetail"
        component={DeviceDetailScreen}
        options={{ title: 'Chi tiết thiết bị' }}
      />
      <Stack.Screen
        name="PhanCongDetail"
        component={PhanCongDetailScreen}
        options={{ title: 'Chi tiết phân công' }}
      />
      <Stack.Screen name="ThietBiTheoPhong" component={DeviceByRoomScreen} />


      <Stack.Screen
        name="AdminTechnicianList"
        component={AdminTechnicianListScreen}
      />
      {/* <Stack.Screen name="ThietBiTheoPhong" component={ThietBiTheoPhongScreen} /> */}

    </Stack.Navigator>
  );
}







