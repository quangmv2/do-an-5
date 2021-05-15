import { Root } from "native-base";
import React, { FunctionComponent, memo } from "react";
import { Navigation } from "@routers";
import { Provider } from "mobx-react";
import { stores } from "@store";
import { TabBarProvider } from "../../store/tabBar";

const App: FunctionComponent = props => {
    return (
        <Root>
            <TabBarProvider>
                <Provider stores={stores}>
                    <Navigation />
                </Provider>
            </TabBarProvider>
        </Root>
    )
}

export default memo(App)