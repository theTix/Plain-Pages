//react
import { useState } from "react";

//react-icons
import { TbArrowBigLeft, TbArrowBigRight } from "react-icons/tb";

//data
import { ImageSlider } from "../data/ImagesSlider";

//style
import "./../styles/Home.css";

const Home: React.FC = () => {
    const [ imgIndex, setImgIndex ] = useState(0);

    const showNextImg = () => {
        setImgIndex((index: number) => {
            if(index === ImageSlider.length - 1) return 0;
            return index + 1;
        })
    }

    const showPrevImg = () => {
        setImgIndex((index: number) => {
            if(index === 0) return ImageSlider.length - 1;
            return index - 1;
        })
    }

  return (
    <div className="home-container">
        <div className="slider-content" key={imgIndex}>
            <img src={ImageSlider[imgIndex].img} alt=""/>
            <h2></h2>
        </div>
        <button onClick={showPrevImg} className="slider-btn"><TbArrowBigLeft /></button>
        <button onClick={showNextImg} className="slider-btn"><TbArrowBigRight /></button>
    </div>
  )
}

export default Home