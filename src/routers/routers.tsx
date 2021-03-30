import { RouteProp } from "@react-navigation/native";
import { StackNavigationOptions, StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import HomeScreen from "@screens/home";
import SettingScreen from "@screens/setting";
import DetailScreen from "@screens/detail";

const options: StackNavigationOptions = {
    headerTitleAlign: "center",
    gestureDirection: "horizontal-inverted"
}

const Screens = {
    Home: "Home",
    Settings: "Settings",
    Detail: "Detail",
}



const HomeStackRouter: any[] = [
    {
        name: 'Home',
        component: HomeScreen,
        options: {
            headerShown: true,
            headerTitle: "Home",
            headerTitleAlign: "center",
               

        }
    },
    {
        name: 'Detail',
        component: DetailScreen,
        options: {
            headerShown: true,
            headerTitle: "Detail",
            headerTitleAlign: "center",
               
        }
    },
]

const SettingStackRouter: any[] = [
    {
        name: 'Setting',
        component: SettingScreen,
        options: {
            headerShown: true,
            headerTitle: "Settings",
            headerTitleAlign: "center",
           
        }
    }
]

export {
    HomeStackRouter,
    SettingStackRouter,
    Screens
}