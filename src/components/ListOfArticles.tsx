//react-router-dom
import { Link } from "react-router-dom";

//data
import allBlogs from "./../data/allBlogs.ts";

const ListOfArticles = () => {
  return (
    <div>
        {allBlogs.map((blog:any) => (
          <div key={blog.id}>
            <Link to={`${blog.id}`} className="blog-title-container">
              <h2>{blog.title}</h2>
              <p>{blog.author}</p>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default ListOfArticles