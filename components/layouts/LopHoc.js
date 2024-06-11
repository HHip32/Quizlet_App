
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, useWindowDimensions, FlatList, ScrollView } from 'react-native';

export default function App({ navigation, route }) {

    return (
        <View style={{ flex: 1 }}>

            <View style={{}}>
                <Text>ssss</Text>
            </View>

            <View style={{}}>

            </View>

            {/* <Tab.Navigator style={{ flex: 15 }}
                initialRouteName={tabScreen[start]}
                tabBarOptions={{
                    scrollEnabled: true,
                    activeTintColor: "white",
                    indicatorStyle: { backgroundColor: "white" },
                }}
                screenOptions={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: 400, },
                    tabBarItemStyle: { width: 110 },
                    tabBarStyle: { backgroundColor: "#0A082D", borderBottomWidth: 3, borderColor: '#2F3857', marginHorizontal: 15 },
                }}>

                <Tab.Screen
                    name='HocPhanTab'
                    component={HocPhanTab}
                    options={{
                        tabBarLabel: 'Học phần'
                    }}
                />
            </Tab.Navigator> */}

        </View>
    )
}