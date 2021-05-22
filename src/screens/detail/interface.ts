import { StyleProp, ViewStyle } from "react-native";

export interface IState {
    source?: string
    stateSlider?: number
    switch?: boolean
    type?: "slider" | "switch" | "sliderRe" | any
    propName?: string
}

export interface PropsCvViewer {
    style?: StyleProp<ViewStyle>
    source: string
    autoHistogram?: boolean
}

export interface RefCvViewer {
    setNativeProps?: (values: any) => void
}

export interface ParamsProps {
    autoHistogram?: boolean
}