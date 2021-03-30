import React, { FunctionComponent } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Badge, Icon, Text } from "native-base";
import { BottomTabBarOptions } from "@react-navigation/bottom-tabs";
import { BottomTabDescriptor, BottomTabNavigationEventMap } from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import { NavigationHelpers } from "@react-navigation/native";
import { FONTS } from "@style";

const IconTabNavigation = (name: string | undefined) => {
  const tab: any = {
      Home: "home",
      Settings: "setting"
  }
  return tab[name || ""];
}

type Props = {
  iconName?: string;
  isCurrent?: boolean;
  name?: string,
  onPress?: Function,
  option?: BottomTabDescriptor,
  color?: string,
  route?: any,
  navigation: NavigationHelpers<Record<string, object | undefined>, BottomTabNavigationEventMap>,
  isFocused: boolean

};
const Tab: FunctionComponent<Props> = ({
  iconName,
  isCurrent,
  name,
  onPress,
  option,
  color,
  route,
  navigation,
  isFocused
}) => {

  const press = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
      onPress && onPress(name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <TouchableOpacity style={styles.container}
      onPress={press}
      onLongPress={onLongPress}
    >
      {
        option?.options.tabBarBadge && <Badge style={styles.badge}>
          <Text>{option?.options.tabBarBadge}</Text>
        </Badge>
      }
      <Icon name={IconTabNavigation(name)} type="AntDesign" color={color} style={{ color: color }} />
      <Text style={[styles.txt, { color: color }]}>{name}</Text>
    </TouchableOpacity>
  );
};

export default Tab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    position: "relative",
    height: "100%",
  },
  txt: {
    fontSize: 14,
    fontWeight: "bold",
    lineHeight: 16,
    fontFamily: FONTS.Roboto
  },
  icon: {
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  badge: {
    position: "absolute",
    left: "50%",
    top: 5
  }
})