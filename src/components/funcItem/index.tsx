import { Text } from 'native-base';
import React, { forwardRef, memo, useImperativeHandle, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface FuncItemProps {
    name?: string
    onPress?: (value?: number) => void
}

export interface RefFuncItem {
    setState: (value?: number) => void
}

const FuncItem= memo(forwardRef<RefFuncItem, FuncItemProps>(({
    name,
    onPress
}, ref) => {

    const [state, setState] = useState<number>(0);

    useImperativeHandle(ref, () => ({
        setState
    }))

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress && onPress(state)}>
            <Text>{name}</Text>
        </TouchableOpacity>
    );
}))

export {
    FuncItem
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        backgroundColor: 'red',
        paddingHorizontal: 5,
        justifyContent: 'center'
    },
    text: {

    }
})