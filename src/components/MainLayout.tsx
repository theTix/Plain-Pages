//react-icons
import { TbBrandFacebookFilled, TbBrandInstagram, TbBrandTiktokFilled, TbBrandYoutubeFilled, TbDoorEnter, TbDoorExit, TbUser } from "react-icons/tb";

//components
import Home from "./Home";

//style
import "../styles/MainLayout.css";

const MainLayout: React.FC = () => {
  return (
    <div className="main-layout">
        <div className="header-container">
            <h1>Plain Pages</h1>
            <div className="header-nav">
                <a href="">About</a>
                <a href="">Blog</a>
                <a href="">Contact</a>
            </div>
            <div className="header-userinfo">
                <a href="">Sign Up <TbUser /></a>
                <a href="">Log In <TbDoorEnter /></a>
            </div>
        </div>

        <div className="main-container">
            <Home />
        </div>

        <div className="footer-container">
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
                    <span><TbBrandFacebookFilled /></span>
                    <span><TbBrandInstagram /></span>
                    <span><TbBrandTiktokFilled /></span>
                    <span><TbBrandYoutubeFilled /></span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MainLayout