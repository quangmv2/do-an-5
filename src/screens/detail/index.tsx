import { observer } from "mobx-react";
import { Button, Switch, Text } from 'native-base'
import React, { FunctionComponent, memo, useCallback, useEffect, useReducer, useRef, useState } from "react";
import { SafeAreaView, StyleSheet, View, FlatList, StatusBar, TouchableOpacity } from "react-native";
// import { Button, Text } from 'native-base'
import RNFS, { stat } from 'react-native-fs'
import RNCVViewer from './RNCVViewer'
import { IState, RefCvViewer } from './interface'
import { dens, reducer } from "@utils";
import { useRoute } from "@react-navigation/native";
import { useTabBar } from "../../store/tabBar";
import Slider, { SliderRef } from '@react-native-community/slider'
import { funcs } from "./funcs";
import { FuncItem, RefFuncItem } from "@components";
import { COLOR } from "@style";
import { onChange } from "react-native-reanimated";


const appPath = RNFS.ExternalStorageDirectoryPath + '/Android/data/com.bsxapp/'

const Detail: FunctionComponent = observer(props => {

    const [state, setState] = useReducer<(prev: IState, state: IState) => IState>(reducer, {
        source: null,
        stateSlider: 0,
        switch: false,
        type: "sliderRe",
        propName: 'light'
    })
    const [index, setIndex] = useState<number>(0);
    const refs = funcs.map(m => useRef<RefFuncItem>())
    const refFunc = refs[index]
    const refSlider = useRef<SliderRef>(null)
    const route: any = useRoute()
    const { setShowTabBar } = useTabBar()

    const ref = useRef<RefCvViewer>()
    useEffect(() => {
        setShowTabBar(false);
        return setShowTabBar(true)
    }, [])

    useEffect(() => {
        if (!route.params || !route.params?.imgPath) return
        ref.current.setNativeProps({
            source: route.params?.imgPath
        })
    }, [route])

    const changeSlider = useCallback((value: number | boolean) => {
        if (typeof value === "boolean") setState({
            switch: value
        })
        else setState({
            stateSlider: value
        })
        if (state.propName != '') ref?.current?.setNativeProps({
            [state.propName]: value
        })
        refFunc.current.setState(value)
    }, [state.propName])

    const onPressFunc = useCallback((index: number, propName: string, value?: number | boolean) => {
        setIndex(index)
        console.log(funcs[index], index);

        if (funcs[index].type === "slider" && typeof value === "number")
            setState({
                stateSlider: value,
                type: funcs[index].type,
                propName
            })
        else
            setState({
                switch: typeof value === "boolean" ? value : false,
                type: funcs[index].type,
                propName
            })
    }, [])

    const viewDefault = useCallback((value: boolean) => {
        ref.current.setNativeProps({
            ['nomral']: value
        })
    }, [])

    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: 'column',
                paddingTop: 20
            }}
        >
            <StatusBar backgroundColor={COLOR.COLOR_PRIMARY} />
            <View style={{ marginHorizontal: 10, flexDirection: "row", justifyContent: "space-between" }}>
                <Button
                    style={{
                        backgroundColor: COLOR.COLOR_PRIMARY,
                        alignSelf: 'flex-start',
                        marginLeft: 10
                    }}
                >
                    <Text>Reset</Text>
                </Button>
                <Button
                    style={{
                        backgroundColor: COLOR.COLOR_PRIMARY,
                        alignSelf: 'flex-end',
                        marginLeft: 10
                    }}
                >
                    <Text>Save</Text>
                </Button>
            </View>
            <TouchableOpacity
                style={styles.viewer}
                onPressIn={() => viewDefault(true)}
                onPressOut={() => viewDefault(false)}
                activeOpacity={1}
            >
                <RNCVViewer
                    style={styles.image}
                    source={state.source}
                    ref={ref}
                />
            </TouchableOpacity>

            <View style={styles.editor}>
                <View style={styles.slider}>
                    {
                        state.type === "switch" ? (
                            <View style={styles.center}>
                                <Switch value={state.switch} onValueChange={changeSlider} />
                            </View>
                        ) : (
                                <View style={styles.sliderContainer}>
                                    <TouchableOpacity onPress={dens(() => changeSlider(0))}>
                                        <Text>{Math.floor(state.stateSlider)}</Text>
                                    </TouchableOpacity>
                                    <View style={{ flex: 1 }}>
                                        <Slider
                                            // collapsable={true}
                                            minimumTrackTintColor={COLOR.COLOR_PRIMARY}
                                            maximumTrackTintColor='#FFFFFF'
                                            value={state.stateSlider}
                                            minimumValue={state.type === "sliderRe" ? -100 : 0}
                                            maximumValue={100}
                                            onValueChange={changeSlider}
                                            step={1}
                                        />
                                    </View>
                                </View>
                            )
                    }
                </View>
                <FlatList
                    data={funcs}
                    renderItem={({ item, index: i }) => {
                        return <FuncItem
                            index={i} name={item.name}
                            ref={refs[i]}
                            propName={item.propName}
                            active={index === i}
                            typeIcon={item.typeIcon}
                            icon={item.icon}
                            onPress={onPressFunc}
                            type={item.type}
                        />
                    }}
                    keyExtractor={(item, index) => `${index}`}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </SafeAreaView>
    )
})

export default memo(Detail)


const styles = StyleSheet.create({
    image: {
        height: "100%",
        width: "100%",
    },
    btn: {
        alignSelf: 'center'
    },
    viewer: {
        flex: 10,
        paddingHorizontal: 10
    },
    editor: {
        flex: 2
    },
    slider: {
        width: "100%",
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    sliderContainer: {
        width: "100%",
        flexDirection: 'row',
        paddingHorizontal: 20,
    }
})