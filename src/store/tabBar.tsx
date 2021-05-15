import React, { createContext, useContext, useState } from 'react';

type ContextProps = {
    showTabBar: boolean,
    setShowTabBar?: Function
}

const TabBarContext = createContext<ContextProps>({
    showTabBar: true
});

const TabBarProvider = ({ children }: any) => {
  const [showTabBar, setShowTabBar] = useState(true);
  return (
    <TabBarContext.Provider value={{ showTabBar, setShowTabBar }}>
      {children}
    </TabBarContext.Provider>
  );
};

export const useTabBar = () => useContext(TabBarContext);

export {
    TabBarProvider
};