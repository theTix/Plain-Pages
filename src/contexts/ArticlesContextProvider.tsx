//react
import { useEffect, useState } from "react";

//firebase
import { collection, onSnapshot } from "firebase/firestore";
import db from "./../firebase/firebase";

//context
import { articlesContext } from "./context";


export interface BlogType {
    id: number;
    title: string;
    category: string;
    quote: string,
    content: {[key: string]: string};
    author: string;
}

type ArticlesContextProviderProps = {
    children: React.ReactNode;
}

const ArticlesContextProvider: React.FC<ArticlesContextProviderProps> = ({children}) => {
    const [ allBlogArticles, setAllBlogArticles ] = useState<BlogType[]>([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "all-blog-articles"), (snapshot) => {
            const data: BlogType[] = snapshot.docs.map(doc => doc.data() as BlogType);
            setAllBlogArticles(data);
        })
        return unsub;
    }, []);

  return (
    <articlesContext.Provider value={{allBlogArticles}}>
        {children}
    </articlesContext.Provider>
  )
}

export default ArticlesContextProvider;