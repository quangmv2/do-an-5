import { Icon, Input, View, Item } from "native-base";
import React, { FunctionComponent, useCallback, useState, memo, useEffect } from "react";
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from "react-native";

type Props = {
    style?: StyleProp<ViewStyle>,
    onChangeText?: Function,
    value?: string
}

const SearchInput: FunctionComponent<Props> = (({
    style,
    onChangeText,
    value
}) => {

    const [text, setText] = useState<string>('');

    useEffect(() => {
        if (!value || value == '') return;
        setText(value)
    }, [value])

    const clearText = useCallback(() => {
        setText('')
        onChangeText && onChangeText('')
    }, [])

    const onChange = useCallback((txt: string) => {
        setText(txt)
        onChangeText && onChangeText(txt)
    }, [])

    return (
        <View style={[styles.container, style]}>
            <Item
                style={styles.inputContainer}
            >
                <Icon name="search" type="Octicons" />
                <Input
                    placeholder="Search..."
                    style={styles.input}
                    onChangeText={onChange}
                    value={text}
                    autoCapitalize="none"
                    autoCorrect={false}
                    clearButtonMode="while-editing"
                    // keyboardType=""
                />
                {
                    // text &&
                    <TouchableOpacity onPress={clearText}
                        style={{
                            display: text && text.length > 0 ? "flex" : "none"
                        }}
                    >
                        <Icon name="close" type="EvilIcons" />
                    </TouchableOpacity>
                }

            </Item>
        </View>
    )
})

export {
    SearchInput
}

const styles = StyleSheet.create({
    container: {
        height: 50,
        // borderWidth: 1,
        // borderColor: "#FFF",
        backgroundColor: "#FFF",
        paddingHorizontal: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        // borderRadius: 14
    },
    inputContainer: {
        height: "100%",
        // backgroundColor: "#FFF",
        maxHeight: "100%",
        overflow: "hidden"
    },
    input: {
        // width: "100%",
        height: "100%",
        maxHeight: "100%",
        justifyContent: "center",
    }
})