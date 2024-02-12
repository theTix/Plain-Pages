import Balloons from "./../assets/balloons.jpg";
import Camera from "./../assets/camera.jpg";
import Knitting from "./../assets/knitting.jpg";
import Literature from "./../assets/literature.jpg";
import Waterfall from "./../assets/waterfall.jpg";
import WomanFree  from "./../assets/woman-hands.jpg";

export type ImageSliderProps = {
    id: number,
    alt: string,
    img: string,
    title: string
}

export const ImageSlider: ImageSliderProps[] = [
    {
        id: 0,
        alt: "Assorted-color Hot Air Balloons on Grass Field during Golden Hour",
        img: Balloons,
        title: "Read about:"
    },
    {
        id: 1,
        alt: "A Black Analog Camera",
        img: Camera,
        title: "Photography"
    },
    {
        id: 2,
        alt: "Knitting and Hat on Top of a Round table",
        img: Knitting,
        title: "Knitting"
    },
    {
        id: 3,
        alt: "Autumn Still Life with a Book, Coffee and Pumpkin",
        img: Literature,
        title: "Reading"
    },
    {
        id: 4,
        alt: "Selective Focus Photography of Waterfalls",
        img: Waterfall,
        title: "Travel"
    },
    {
        id: 5,
        alt: "Woman Raising Her Hands Facing Cityscape Near Body of Water",
        img: WomanFree,
        title: "World"
    }
]