import { useEffect } from "react";
import foodsStore from "../stores/foodsStore";
import FoodUpdate from "./FoodUpdate";
import mealsStore from "../stores/mealsStore";

export default function Food({food}) {
    const store = foodsStore();
    const store2 = mealsStore();

    if (store.updateForm._id && food._id === store.updateForm._id) {
        return <FoodUpdate food={food} />
    }

    return(
        <tr key={food._id}>
            <td>{food.serving}</td>
            <td>{food.name}</td>
            <td>{food.protein}</td>
            <td>{food.carbs}</td>
            <td>{food.fat}</td>
            <td>{food.calories}</td>
            <td>{food.notes}</td>
            <td className="delete" onClick={async() => { await store.deleteFood(food._id); store2.fetchMeals(food.log)}}>X</td>
            <td onClick={() => store.toggleUpdate(food)}>Update</td>
        </tr>
    );
}
