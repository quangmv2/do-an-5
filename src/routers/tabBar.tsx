import React, { FunctionComponent, useCallback, useState } from "react";
import {
    View,
    Dimensions,
    StyleSheet,
} from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Tab from "./tab";
import { COLOR } from "@style";


const TabBar = ({ state, navigation, descriptors }: BottomTabBarProps) => {

    const [selected, setSelected] = useState<string>(state.routeNames && state.routeNames.length > 0 ? state.routeNames[0] : "");

    const totalWidth = Dimensions.get("window").width;
    const tabWidth = totalWidth / state.routes.length;

    const pressSelect = useCallback((name) => {
        if (name != selected) {
            setSelected(name);
        }
    }, [selected])

    const focusedOptions = descriptors[state.routes[state.index].key].options;

    if (focusedOptions.tabBarVisible === false) {
        return null;
    }
        return (
            <View style={[styles.wrapper, { width: totalWidth }]}>
                <View style={styles.container}>
                    {
                        state.routes.map(route =>
                            <Tab
                                {...route.params}
                                key={route.key}
                                name={route.name}
                                onPress={pressSelect}
                                option={descriptors[route.key]}
                                color={selected == route.name ? COLOR.COLOR_PRIMARY : "gray"}
                                route={route}
                                navigation={navigation}
                                isFocused={selected == route.name}
                            />
                        )
                    }
                </View>
            </View>
        );
    };
    const styles = StyleSheet.create({
        wrapper: {
            height: 60,
            shadowOffset: {
                width: 0,
                height: -1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 4.0,
            backgroundColor: "white",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            elevation: 10,
            position: "absolute",
            bottom: 0,
        },
        container: {
            flexDirection: "row",
            justifyContent: "center",
            height: "100%"
        },
    });

    export {
        TabBar
    }