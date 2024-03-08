//react
import React, { useContext } from "react";

import { BlogType } from "./ArticlesContextProvider";


type userContextType = {
    username: string,
    setUsername: (username: string) => void
}

type authorizationContextType = {
    authorized: boolean,
    setAuthorized: (authorized: boolean) => void
}

const userContext = React.createContext<userContextType>({
    username: "",
    setUsername: () => {}
});

export const articlesContext = React.createContext<{
    allBlogArticles: BlogType[],
}>({
    allBlogArticles: [], 
});

export const authorizationContext = React.createContext<authorizationContextType>({
    authorized: false,
    setAuthorized: () => {}
})

export function useAuth() {
    return useContext(authorizationContext);
}

export default userContext;

