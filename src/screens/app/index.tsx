import { Root } from "native-base";
import React, { FunctionComponent, memo } from "react";
import { Navigation } from "@routers";
import { Provider } from "mobx-react";
import { stores } from "@store";

const App: FunctionComponent = props => {
    return (
        <Root>
            <Provider stores={stores}>
                <Navigation />
            </Provider>
        </Root>
    )
}

export default memo(App)