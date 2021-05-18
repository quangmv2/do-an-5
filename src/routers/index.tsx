import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabBar } from "./tabBar";
import { HomeStackRouter, SettingStackRouter } from "./routers";
import { COLOR, FONTS } from "@style";

const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();

const configTransion = {
    animation: 'spring',
    config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
    },
};


const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerTintColor: "#FFF",
                headerStyle: {
                    backgroundColor: COLOR.COLOR_PRIMARY
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontFamily: FONTS.Roboto
                },
                gestureEnabled: true,
                gestureDirection: "horizontal",
            }}
            initialRouteName='Detail'
        >
            {
                HomeStackRouter.map((router, i) => <HomeStack.Screen
                    name={router.name}
                    component={router.component}
                    key={`HomeStack${i}`}
                    options={router.options}
                />)
            }
        </HomeStack.Navigator>
    )
}

const SettingStackScreen = () => {
    return (
        <SettingStack.Navigator
            screenOptions={{
                headerTintColor: "#FFF",
                headerStyle: {
                    backgroundColor: COLOR.COLOR_PRIMARY
                },
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 16,
                    fontFamily: FONTS.Roboto
                },
                gestureEnabled: true,
                gestureDirection: "horizontal",
            }}
            
        >
            {
                SettingStackRouter.map((router, i) => <SettingStack.Screen
                    name={router.name}
                    component={router.component}
                    key={`SettingStack${i}`}
                    options={router.options}
                />)
            }
        </SettingStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBar={props => <TabBar {...props} />}
                lazy={true}
                screenOptions={{
                    tabBarVisible: false
                }}
            >
                <Tab.Screen name="Home" component={HomeStackScreen} 
                    options={{ 
                        tabBarBadge: 3,
                        tabBarVisible: true,

                    }} 
                />
                <Tab.Screen name="Settings" component={SettingStackScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const IconTabNavigation = (name: string | undefined) => {
    const tab: any = {
        Home: "home",
        Settings: "setting"
    }
    return tab[name || ""];
}

export {
    Navigation,
    IconTabNavigation
};

export * from './routers'