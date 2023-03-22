import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import foodsStore from '../stores/foodsStore';
import mealsStore from '../stores/mealsStore';
import Food from './Food';

export default function FoodsTable({meal_id}) {
    const store = foodsStore();
    const store2 = mealsStore(store2 => {
        return {
            meals: store2.meals,
            setMacros: store2.setMacros
        }
    });

    let protein = 0, carbs = 0, fat = 0, calories = 0;

    useEffect(() => {

        if (store.foods) store.foods.forEach(food => {
            if (food.meal && food.meal.localeCompare(meal_id) === 0) {
                // eslint-disable-next-line
                if(food.protein) protein += parseInt(food.protein);
                // eslint-disable-next-line
                if(food.carbs) carbs += parseInt(food.carbs);
                // eslint-disable-next-line
                if(food.fat) fat += parseInt(food.fat);
                // eslint-disable-next-line
                if(food.calories) calories += parseInt(food.calories);
            }
        })
        if(store2.meals) store2.meals.forEach(meal => {
            try {
                if(meal._id.localeCompare(meal_id) === 0) {
                    store2.setMacros(protein, carbs, fat, calories, meal._id);
                }
            } catch(err) {
                console.log(err);
            }
        })
        // eslint-disable-next-line
        }, []);

    return(
    <form form="update" onSubmit={store.updateFood}>
    <Table striped bordered hover variant="dark">
        <thead>
        <tr>
            <th>Serving</th>
            <th>Food</th>
            <th>Protein</th>
            <th>Carbs</th>
            <th>Fat</th>
            <th>Calories</th>
            <th>Notes</th>
            <th colSpan={2}>Actions</th>
        </tr>
        </thead>
        <tbody>
            {/* eslint-disable-next-line*/}
            {store.foods && store.foods.map(food => {
                if (food.meal && food.meal.localeCompare(meal_id) === 0)
                    return <Food food={food} key={food._id} />;
            })}
            {/* eslint-disable-next-line */}
            {store2.meals && store2.meals.map(meal => {
                if(meal._id.localeCompare(meal_id) === 0) {
                    return(
                        <tr key={meal._id}>
                            <th></th>
                            <th>Totals:</th>
                            <th>{meal.protein}</th>
                            <th>{meal.carbs}</th>
                            <th>{meal.fat}</th>
                            <th>{meal.calories}</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                );
                }
            })}
        </tbody>
    </Table>
        <button onClick={(e) => store.createFood(e, meal_id)}>Add</button>
        {store.updateForm._id && <button type="submit">Update</button>}
    </form>
    );
}
