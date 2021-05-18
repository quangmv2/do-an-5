import { observer } from "mobx-react";
import React, { FunctionComponent, memo, useEffect, useReducer, useRef } from "react";
import { SafeAreaView, Image, StyleSheet, View, FlatList } from "react-native";
// import { Button, Text } from 'native-base'
import RNFS from 'react-native-fs'
// import RNCVViewer from './RNCVViewer'
import { IState, RefCvViewer } from './interface'
import { reducer } from "@utils";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useTabBar } from "../../store/tabBar";
import Slider from '@react-native-community/slider'
import { funcs } from "./funcs";
import { FuncItem, RefFuncItem } from "@components";


const appPath = RNFS.ExternalStorageDirectoryPath + '/Android/data/com.bsxapp/'

const Detail: FunctionComponent = observer(props => {

    const [state, setState] = useReducer<(prev: IState, state: IState) => IState>(reducer, {
        autoHistogram: false,
        source: null,
        stateSlider: 0
    })
    const refs = funcs.map(m => useRef<RefFuncItem>())

    const navigation = useNavigation();
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

    const onSetValueAutoHist = () => {
        // ref.current.setNativeProps({
        //     autoHistogram: !state.autoHistogram
        // })
        // setState({
        //     autoHistogram: !state.autoHistogram
        // })
    }

    const changeBlur = (value: number) => {
        // ref.current.setNativeProps({
        //     blur: Math.floor(value)
        // })
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: 'column',
                paddingTop: 20
            }}
        >
            <View style={styles.viewer}>
                {/* <RNCVViewer
                    style={styles.image}
                    source={state.source}
                    // autoHistogram={state.autoHistogram}
                    ref={ref}
                /> */}
            </View>

            <View style={styles.editor}>
                <View style={styles.slider}>
                <Slider 
                    minimumValue={state.stateSlider}
                    maximumValue={255}
                    onValueChange={changeBlur}
                />
                </View>
                <FlatList
                    data={funcs}
                    renderItem={({ item, index }) => {
                        return <FuncItem name={item.name} ref={refs[index]} />
                    }}
                    keyExtractor={(item, index) => `${index}`}
                    horizontal={true}
                />
            </View>
        </SafeAreaView>
    )
})

export default memo(Detail)


const styles = StyleSheet.create({
    image: {
        height: 400,
        width: 400
    },
    btn: {
        alignSelf: 'center'
    },
    viewer: {
        flex: 10
    },
    editor: {
        flex: 2
    },
    slider: {
        paddingHorizontal: 10
    }
})