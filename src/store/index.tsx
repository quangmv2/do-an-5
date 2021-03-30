import { createContext, useContext } from "react";
import { UserState } from "./userState";

export const stores = {
    userState: new UserState()
}

export const storeInstance = stores;

export const Store = createContext(stores)

export const useStore = (): any => useContext(Store);

export {
    UserState
}
