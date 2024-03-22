//react
import { PropsWithChildren, useState } from "react";

//context
import { descriptionContext } from "./context";

type DescriptionContextProviderProps = PropsWithChildren;

const DescriptionContextProvider: React.FC<DescriptionContextProviderProps> = ({children}) => {
    const [ description, setDescription ] = useState("");

  return (
    <descriptionContext.Provider value={{description, setDescription}}>
        {children}
    </descriptionContext.Provider>
  )
}

export default DescriptionContextProvider