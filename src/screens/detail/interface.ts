import { StyleProp, ViewStyle } from "react-native";

export interface IState {
    source?: string
    autoHistogram?: boolean
    blur?: number
}

export interface PropsCvViewer {
    style?: StyleProp<ViewStyle>
    source: string
    autoHistogram?: boolean
}

export interface RefCvViewer {
    setNativeProps?: (values: IState) => void
}

export interface ParamsProps {
    autoHistogram?: boolean
}