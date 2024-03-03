//react-router-dom
import { Link, useParams } from "react-router-dom";

//data
import allBlogs from "./../data/allBlogs.ts";
import Error from "./Error.tsx";

const SelectiveListOfArticles = () => {
    const param = useParams();
    console.log(param);
    const filteredBlogs = allBlogs.filter((article) => {
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