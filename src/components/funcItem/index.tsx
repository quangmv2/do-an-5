import { COLOR } from '@style';
import { Icon, Text } from 'native-base';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface FuncItemProps {
    name?: string
    onPress?: (index: number,  propName: string, value?: number) => void
    index: number
    propName: string,
    active?: boolean,
    icon: string
    typeIcon?: any
}

export interface RefFuncItem {
    setState: (value?: number) => void
}

const FuncItem= memo(forwardRef<RefFuncItem, FuncItemProps>(({
    name,
    onPress,
    index,
    propName,
    active,
    typeIcon,
    icon
}, ref) => {

    const [state, setState] = useState<number>(0);

    useImperativeHandle(ref, () => ({
        setState
    }))

    console.log(index, state);
    

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(index, propName, state)}>
            <Icon style={[active && styles.active]} name={icon} type={typeIcon} />
            <Text  style={[active && styles.active]}>{name}</Text>
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

    },
    active: {
        color: COLOR.COLOR_PRIMARY
    }
})