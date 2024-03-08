//react-router-dom
import { Link, useParams } from "react-router-dom";

//components
import Error from "./Error.tsx";

//context
import { useContext } from "react";
import { articlesContext } from "../contexts/context.ts";

const SelectiveListOfArticles = () => {
    const { allBlogArticles } = useContext(articlesContext);

    const param = useParams();
    console.log(param);
    const filteredBlogs = allBlogArticles.filter((article) => {
        return param.categoryId === article.category;
    });

  return (
    <div>
        {filteredBlogs.length === 0 ? 
        <Error /> :
        filteredBlogs.map((blog:any) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`} className="blog-title-container">
              <h2>{blog.title}</h2>
              <p>{blog.author}</p>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default SelectiveListOfArticles