import { Text, Button } from 'native-base';
import React, { useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { ColorConv, Core, CvImage, CvInvoke } from '../../nativeModules';

interface EditorProps {

}


const originalImagePath = './test.jpg'

const Editor: React.FC<EditorProps> = () => {

    const [color, setColor] = useState<any>(ColorConv.COLOR_BGR2GRAY);

    console.log(color);
    

    return (
        <SafeAreaView>
            {/* <CvInvoke func='bitwise_not' params={{ "p1": "dstMat", "p2": "dstMat" }}> */}
                {/* <CvInvoke func='rotate' params={{ "p1": "dstMat", "p2": "dstMat", "p3": Core.ROTATE_90_COUNTERCLOCKWISE }}> */}
                    <CvInvoke func='cvtColor' params={{ "p1": "srcMat", "p2": "dstMat", "p3": color }}>
                        <CvImage
                            style={{ width: 200, height: 200 }}
                            source={require(`${originalImagePath}`)}
                        />
                    </CvInvoke>
                {/* </CvInvoke> */}
            {/* </CvInvoke> */}
            <Button 
                onPress={() => {
                    if (color === ColorConv.COLOR_BGR2GRAY) setColor(ColorConv.COLOR_RGB2HSV_FULL) 
                    else setColor(ColorConv.COLOR_BGR2GRAY)
                }}
            >
                <Text>Click</Text>
            </Button>
        </SafeAreaView>
    );
}

export default Editor;