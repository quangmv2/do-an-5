import { useNavigation } from "@react-navigation/native";
import { COLOR } from "@style";
import { Button, Text } from "native-base";
import React, { FunctionComponent, memo, useEffect } from "react";
import { StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
import { NavigationState } from "react-native-tab-view";
import { Screens } from "@routers";
import { useStore, UserState } from "@store";
import { toJS } from "mobx";
import { observer } from "mobx-react";
import { SearchInput } from "@components";

type Props = {
}

const Home: FunctionComponent = observer(props => {

    const navigation = useNavigation();
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
            <Button 
                style={{
                    alignSelf: "center",
                    marginTop: 20,
                    borderRadius: 10,
                    backgroundColor: COLOR.COLOR_PRIMARY,
                    overflow: "hidden"
                }}
                onPress={() => navigation.navigate(Screens.Detail)}
            >
                <Text
                    style={{
                        textAlign: "center"
                    }}
                >
                    Home
                </Text>
            </Button>
            <SearchInput 
                style={{
                    marginHorizontal: 15,
                    borderRadius: 15,
                    marginTop: 20
                }}
            />
        </SafeAreaView>
    )
})

export default memo(Home)