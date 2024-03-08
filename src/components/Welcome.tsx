//react
import { useContext, useEffect, useState } from "react";

//firebase
import { collection, onSnapshot } from "firebase/firestore";
import db from "./../firebase/firebase";

//styles
import "./../styles/Welcome.css";
import userContext from "../contexts/context";
import { NavLink } from "react-router-dom";

type BlogTopic = {
    id: number,
    img1: string,
    alt1: string,
    img2: string,
    alt2: string,
    img3: string,
    alt3: string,
    title: string
}

const Welcome = () => {
    const { username } = useContext(userContext);
    const [blogTopics, setBlogTopics] = useState<BlogTopic[]>([]);

    console.log(blogTopics);
    
    useEffect(() => {
        const unsub = onSnapshot( collection(db, "blog-topics"), (snapshot) => {
            const data: BlogTopic[] = snapshot.docs.map(doc => doc.data() as BlogTopic);
            setBlogTopics(data);
        });
        return unsub;
    }, []);

  return (
    <div className="welcome-page">
        <section className="welcome-section-container">
            <div className="welcome-welcome-part">
                <h1>{username === "" ? "Welcome!" : `Welcome, ${username}!`}</h1>
                <p>This is <span>Plain Pages</span>. We offer a wide variety of articles on different topics that mght interest you!</p>
                <p>Take a look yourself!</p>
                <h2>Read About:</h2>
            </div>
        </section>

        {blogTopics.map((topic) => (
            <section className="welcome-section-container" key={topic.id}>
                <NavLink to={`/blogs/category/${topic.title.toLowerCase()}`}>
                    <div className="welcome-section-image-cluster">
                        <div className="welcome-image-container">
                            <img src={topic.img1} alt={topic.alt1} />
                        </div>
                        <div className="welcome-image-container">
                            <img src={topic.img2} alt={topic.alt2} />
                        </div>
                        <div className="welcome-image-container">
                            <img src={topic.img3} alt={topic.alt3} />
                        </div>
                    </div>
                    <div className="welcome-section-title-container">
                        <h1>{topic.title}</h1>
                    </div>
                </NavLink>
            </section>
        ))}

    </div>
  )
}

export default Welcome