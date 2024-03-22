//react
import React, { useContext } from "react";

import { BlogType } from "./ArticlesContextProvider";


type userContextType = {
    username: string | null,
    setUsername: (username: string | null) => void
}

type authorizationContextType = {
    authorized: boolean,
    setAuthorized: (authorized: boolean) => void
}

type descriptionContextType = {
    description: string,
    setDescription: (description: string) => void
}

const userContext = React.createContext<userContextType>({
    username: null,
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

export const descriptionContext = React.createContext<descriptionContextType>({
    description: "",
    setDescription: () => {}
})

export function useAuth() {
    return useContext(authorizationContext);
}

export default userContext;

