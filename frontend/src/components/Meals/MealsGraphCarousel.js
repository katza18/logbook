import Carousel from "react-bootstrap/Carousel";
import accountStore from "../../stores/accountStore";
import MealsGraph from "./MealsGraph";
import mealsStore from "../../stores/mealsStore";
import ProteinGraph from "./ProteinGraph";


export default function MealsGraphCarousel() {
    const recCal = accountStore((state) => state.user.calories);
    const recPro = accountStore((state) => state.user.protein);
    const dateCaloriesMap = mealsStore((state) => state.dateCaloriesMap);
    const protein = mealsStore((state) => state.protein);
    const dates = Object.keys(dateCaloriesMap);
    const calories = Object.values(dateCaloriesMap);

    return(
        <Carousel variant="dark" slide={false}>
            <Carousel.Item key={0}>
                <MealsGraph dates={dates} calories={calories} recCal={recCal}/>
            </Carousel.Item>
            <Carousel.Item key={1}>
                <ProteinGraph dates={dates} protein={protein} recPro={recPro} />
            </Carousel.Item>
        </Carousel>
    )
}
