//react-router-dom
import { useParams } from "react-router-dom";

//components
import Error from "./Error.tsx";

//data
import allBlogs from "../data/allBlogs.ts";

//styles
import "./../styles/Blog.css";

const Blog = () => {
    const params = useParams();
    console.log(params.blogId);

    const rightBlog = allBlogs.filter((blog) => {
        return blog.id === Number(params.blogId);
    });
    console.log(rightBlog);

  return (
    <div className="blog-container">
        {rightBlog.length === 0 ?
            <Error /> :
                rightBlog.map((blog) => (
                    <div className="blog-contents" key={blog.id}>
                        <span className="blog-category">{`Category: [${blog.category}]`}</span>
                        <h1>{blog.title}</h1>
                        <p className="blog-quote">{blog.quote}</p>
                        {blog.content.map((text:any, index: number) => (
                            <p key={index} className="blog-paragraph">
                                {index === 0 ? (
                                    <span className="paragraph-first-letter">{text.paragraph.charAt(0)}</span>
                                ) : (
                                    text.paragraph.charAt(0)
                                )}
                                {text.paragraph.slice(1)}
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