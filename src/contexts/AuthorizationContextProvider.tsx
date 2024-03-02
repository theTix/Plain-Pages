//react
import { useEffect, useState } from "react";

//context
import { authorizationContext } from "./context.ts";

//firebase
import { auth } from "../firebase/firebase.ts";
import { onAuthStateChanged } from "firebase/auth";


type AuthContextProviderProps = {
    children: React.ReactNode
}

console.log()

export const AuthorizationContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
    const [ currentUser, setCurrentUser ] = useState<any>(null);
    const [ authorized, setAuthorized ] = useState<boolean>(false);
    const [ loading, setLoading ] = useState<boolean>(true);

    console.log(currentUser);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, initializeUser);
      return unsubscribe;
    }, []);

    async function initializeUser(user: any) {
      if (user) {
        setCurrentUser({ ...user });
        setAuthorized(true);
      } else {
        setCurrentUser(null);
        setAuthorized(false);
      }
      setLoading(false);
    }

    const value = {
      currentUser,
      setCurrentUser,
      authorized,
      setAuthorized,
      loading,
      setLoading
    }

  return (
    <authorizationContext.Provider value={value} >
        {!loading && children}
    </authorizationContext.Provider>
  )
}
