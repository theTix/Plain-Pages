//react
import { useState } from "react";

//react-icons
import { TbArrowBigLeft, TbArrowBigRight, TbCircle, TbCircleFilled } from "react-icons/tb";

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
    <section className="home-container" aria-label="Slider Of All Blog Themes">
        <div className="slider-content">
            {ImageSlider.map((slide) => (
                <div 
                    className="home-slider-slide" 
                    key={slide.id} 
                    style={{translate: `${-100 * imgIndex}%`}}
                >
                    <img src={slide.img} alt={slide.alt} aria-hidden={slide.id !== imgIndex}/>
                    <h2 className="home-slider-title">{slide.title}</h2>
                </div>
            ))}
        </div>
        <button 
            onClick={showPrevImg} 
            className="slider-btn"
            aria-label="View Previous Slide Button"
        >
            <TbArrowBigLeft aria-hidden />
        </button>
        <button 
            onClick={showNextImg} 
            className="slider-btn"
            aria-label="View Next Slide Button"
        >
            <TbArrowBigRight aria-hidden />
        </button>
        <div className="home-slider-nav">
            {ImageSlider.map((slide) => (
                <button 
                key={slide.id} 
                onClick={() => setImgIndex(slide.id)}
                aria-label={`View Image ${slide.id + 1}`}
                >
                    {slide.id === imgIndex ? <TbCircleFilled aria-hidden /> : <TbCircle aria-hidden />}
                </button>
            ))}
        </div>
    </section>
  )
}

export default Home