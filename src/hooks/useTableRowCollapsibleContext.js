import React, { createContext, useContext, useState } from 'react'

const context = createContext(null)

export const TableRowCollapsibleContextProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <context.Provider value={{open, setOpen}}>
            {children}
        </context.Provider>
    )
}

function useTableRowCollapsibleContext() {
  return useContext(context);
}

export default useTableRowCollapsibleContext