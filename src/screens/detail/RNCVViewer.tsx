import React, { forwardRef, memo, useImperativeHandle, useRef } from "react";
import { requireNativeComponent, View } from 'react-native'
import { IState, ParamsProps, PropsCvViewer, RefCvViewer } from "./interface";

const CVViewer = requireNativeComponent('RNCVViewer')


const CVImageViewer = memo(forwardRef<RefCvViewer, PropsCvViewer>((props: any, refParent) => {

    const ref: any = useRef<View>()

    useImperativeHandle(refParent, () => ({
        setNativeProps
    }))

    const setNativeProps = (values?: IState) => {
        values && ref?.current?.setNativeProps(values)
    
    }

    return (
        <CVViewer {...props} ref={ref} />
    )
}))

export default CVImageViewer