//react
import { useContext, useEffect, useState } from "react";

//react-router-dom
import { Link, NavLink, Outlet } from "react-router-dom";

//react-icons
import { TbBrandFacebookFilled, TbBrandInstagram, TbBrandTiktokFilled, TbBrandYoutubeFilled, TbDoorEnter, TbDoorExit, TbPlus, TbMinus, TbUser } from "react-icons/tb";

//context
import userContext, { useAuth } from "../contexts/context";

//firebase
import { auth } from "../firebase/firebase";

//style
import "../styles/MainLayout.css";

const MainLayout: React.FC = () => {

    const { username } = useContext(userContext);
    const { authorized, setAuthorized } = useAuth();

    const [ clickedIcon, setClickedIcon ] = useState(<TbPlus />)

    const changeIcon = () => {
        setClickedIcon(clickedIcon.type === TbPlus ? <TbMinus /> : <TbPlus />);
    }

    console.log(window.innerWidth);

    useEffect(() => {
        const makeDropDownMenu = () => {
            const nav = document.getElementsByClassName("header-nav")[0] as HTMLElement;
            const userInfo = document.getElementsByClassName("header-userinfo")[0] as HTMLElement;
            
            nav.style.maxHeight = window.innerWidth <= 880 && clickedIcon.type === TbPlus ? "0px" : "1000px";
            userInfo.style.maxHeight = window.innerWidth <= 880 && clickedIcon.type === TbPlus ? "0px" : "1000px";
        }
    
        // Initial call
        makeDropDownMenu();
    
        window.addEventListener("resize", makeDropDownMenu);
    
        return () => {
            window.removeEventListener("resize", makeDropDownMenu);
        };
    }, [clickedIcon]);
    

  return (
    <section className="main-layout">
        <header className="header-container">
            <div className="header-title">
                <h1><Link to="/">Plain Pages</Link></h1>
                <button onClick={changeIcon}>{clickedIcon}</button>
            </div>
            <div className="header-nav">
                <NavLink to="/about">About</NavLink>
                <NavLink to="/blogs">Blog</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </div>
            {authorized ? (
                <div className="header-userinfo">
                    <NavLink to="/"><span>{username} </span><TbUser aria-hidden /></NavLink>
                    <a 
                        href="/" 
                        onClick={() => {
                            auth.signOut();
                            setAuthorized(false);
                    }}>
                        <span>Log Out </span><TbDoorExit aria-hidden />
                    </a>
                </div>
            ) : (
                <div className="header-userinfo">
                    <NavLink to="/signup"><span>Sign Up </span><TbUser aria-hidden /></NavLink>
                    <NavLink to="/login"><span>Log In </span><TbDoorEnter aria-hidden /></NavLink>
                </div> 
            )}
            
        </header>

        <main className="main-container">
            <Outlet />
        </main>

        <footer className="footer-container">
            <div className="footer-column">
                <h2>Plain Pages</h2>
                <p className="footer-copyright">Copyright @2024</p>
            </div>
            <div className="footer-column">
                <h3>Zagreb</h3>
                <p>invented@business-email.com</p>
                <p>Invented 22, 10000 Zagreb, Croatia</p>
            </div>
            <div className="footer-column">
                <h3>Follow us on:</h3>
                <div className="footer-socialmedia">
                    <span><TbBrandFacebookFilled aria-label="Go To Our Facebook" /></span>
                    <span><TbBrandInstagram aria-label="Go To Our Instagram" /></span>
                    <span><TbBrandTiktokFilled aria-label="Go To Our Tiktok" /></span>
                    <span><TbBrandYoutubeFilled aria-label="Go To Our Youtube" /></span>
                </div>
            </div>
        </footer>
    </section>
  )
}

export default MainLayout