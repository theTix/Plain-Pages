//react
import { PropsWithChildren, useState } from "react";

//context
import userContext from "./context.ts";

type UserContextProviderProps = PropsWithChildren;

export const UserContextProvider: React.FC<UserContextProviderProps> = ({children}) => {
    const [ username, setUsername ] = useState<string | null>(null);

  return (
    <userContext.Provider value={{username, setUsername}}>
        {children}
    </userContext.Provider>
  )
}