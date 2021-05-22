import { COLOR } from '@style';
import { Icon, Text } from 'native-base';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface FuncItemProps {
    name?: string
    onPress?: (index: number, propName: string, value?: number | boolean) => void
    index: number
    propName: string,
    active?: boolean,
    icon: string
    typeIcon?: any
    type: string
}

export interface RefFuncItem {
    name: string
    setState: (value?: number | boolean) => void
}

const FuncItem = memo(forwardRef<RefFuncItem, FuncItemProps>(({
    name,
    onPress,
    index,
    propName,
    active,
    typeIcon,
    icon,
    type
}, ref) => {

    const [state, setState] = useState<number | boolean>(type === "slider" ? 0 : false);

    useImperativeHandle(ref, () => ({
        setState,
        name
    }))

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress && onPress(index, propName, state)}
            activeOpacity={active ? 1 : 0.8}
        >
            <Icon style={[active && styles.active]} name={icon} type={typeIcon} />
            <Text style={[active && styles.active, styles.text]}>{name}</Text>
        </TouchableOpacity>
    );
}))

export {
    FuncItem
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 12
    },
    active: {
        color: COLOR.COLOR_PRIMARY
    }
})