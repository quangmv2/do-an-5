import { UserState, useStore } from "@store";
import { COLOR } from "@style";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { Text } from "native-base";
import React, { FunctionComponent, memo, useEffect } from "react";
import { StatusBar, SafeAreaView } from "react-native";

const Detail: FunctionComponent = observer( props => {

    const { userState } = useStore();

    useEffect(() => {
        getStore()
    }, [])

    const getStore = async () => {
        let user: UserState = await toJS(userState);
        await userState.setUsername("quangmv2")
        console.log(user)
        user = await toJS(userState);
        console.log(user)
    }

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={COLOR.COLOR_PRIMARY} />
            <Text
                style={{
                    textAlign: "center"
                }}
            >Detail</Text>
        </SafeAreaView>
    )
})

export default memo(Detail)