//react
import { useEffect, useState } from "react";

//react-router-dom
import { NavLink, Outlet } from "react-router-dom";

//react icons
import { TbAdjustmentsHorizontal } from "react-icons/tb";

//styles
import "./../styles/Blogs.css";

const Blogs = () => {
  const [ clicked, setClicked ] = useState(false);
  console.log(clicked);

  useEffect(() => {
    const dropFilters = () => {
      const categoriesContainer = document.getElementsByClassName("blogs-categories")[0] as HTMLElement;
      const filterIcon = document.getElementById("filter-icon") as HTMLElement;

      categoriesContainer.style.maxHeight = window.innerWidth <= 900 && clicked ? "1000px" : "0";
      categoriesContainer.style.padding = window.innerWidth <= 900 && clicked ? "10px 0" : "0";
      filterIcon.style.backgroundColor = window.innerWidth <= 900 && clicked ? "black" : "transparent";
    }

    dropFilters();

    window.addEventListener("resize", dropFilters);

    return () => {
      window.removeEventListener("resize", dropFilters);
    }

  }, [clicked]);

  return (
    <div className="blogs-container">
      <section className="blogs-container-description">
        <h1>Blogs</h1>
        <p>Here you can find all the articles!</p>
        <p>Take a look!</p>
        <div className="filter-btn-container">
          <TbAdjustmentsHorizontal id="filter-icon" onClick={() => setClicked(clicked ? false : true)} />
        </div>
        <div className="blogs-categories">
          <NavLink to="/blogs/category/hobbies">Hobbies</NavLink>
          <NavLink to="/blogs/category/studying">Studying</NavLink>
          <NavLink to="/blogs/category/life-advice">Life Advice</NavLink>
          <NavLink to="/blogs/category/nature">Nature</NavLink>
        </div>
      </section>
      <section className="blogs-container-blog-titles">
        <Outlet />
      </section>
    </div>
  )
}

export default Blogs