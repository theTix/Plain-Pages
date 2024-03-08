//react-router-dom
import { Link, useParams } from "react-router-dom";

//components
import Error from "./Error.tsx";

//context
import { useContext } from "react";
import { articlesContext } from "../contexts/context.ts";

//styles
import "./../styles/Blog.css";

const Blog = () => {
    const {allBlogArticles} = useContext(articlesContext);

    const params = useParams();
    console.log(params.blogId);

    const rightBlog = allBlogArticles.filter((blog) => {
        return blog.id === Number(params.blogId);
    });
    console.log(rightBlog);


  return (
    <div className="blog-container">
        {rightBlog.length === 0 ?
            <Error /> :
                rightBlog.map((blog) => (
                    <div className="blog-contents" key={blog.id}>
                        <Link to={`/blogs/category/${blog.category}`} className="blog-category">{`Category: [${blog.category}]`}</Link>
                        <h1>{blog.title}</h1>
                        <p className="blog-quote">{blog.quote}</p>
                        {Object.values(blog.content).map((paragraphContent, index: number) => (
                            <p key={index} className="blog-paragraph">
                                {index === 0 ? (
                                    <span className="paragraph-first-letter">{paragraphContent.charAt(0)}</span>
                                ) : (
                                    paragraphContent.charAt(0)
                                )}
                                {paragraphContent.slice(1)}
                            </p>
                        ))}
                        <p className="blog-author">{blog.author}</p>
                    </div>
                ))
        }

    </div>
  )
}

export default Blog