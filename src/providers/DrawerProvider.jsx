import { useState, createContext, useContext } from "react";

const DrawerContext = createContext();

export function useDrawer() {
  return useContext(DrawerContext);
}

export default function DrawerProvider({ children }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [listDrop, setListDrop] = useState(false);

  return (
    <DrawerContext.Provider
      value={{ openDrawer, setOpenDrawer, listDrop, setListDrop }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
