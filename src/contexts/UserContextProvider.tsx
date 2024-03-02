//react
import { useState } from "react";

//context
import userContext from "./context.ts";

type UserContextProviderProps = {
  children: React.ReactNode
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({children}) => {
    const [ username, setUsername ] = useState("");

  return (
    <userContext.Provider value={{username, setUsername}}>
        {children}
    </userContext.Provider>
  )
}