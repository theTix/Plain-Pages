//react
import { PropsWithChildren, useState } from "react";

//context
import { profileImgContext } from "./context";

type ProfileImgContextProviderProps = PropsWithChildren;

const ProfileImgContextProvider: React.FC<ProfileImgContextProviderProps> = ({children}) => {
    const [ profilePic, setProfilePic ] = useState(null);

  return (
    <profileImgContext.Provider value={{profilePic, setProfilePic}}>
        {children}
    </profileImgContext.Provider>
  )
}

export default ProfileImgContextProvider