import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import foodsStore from '../stores/foodsStore';
import mealsStore from '../stores/mealsStore';
import Food from './Food';

export default function FoodsTable({meal_id, log_id}) {
    const store = foodsStore(store => {
        return {
            updateFood: store.updateFood,
            updateForm: store.updateForm,
            createFood: store.createFood
        }
    });
    const foods = foodsStore((state)=> state.foods );
    const meals = mealsStore((state) => state.meals);
    const store2 = mealsStore(store2 => {
        return {
            fetchMeals: store2.fetchMeals
        }
    });

    return(
        <form form="update" onSubmit={async(e) => {await store.updateFood(e); store2.fetchMeals(log_id)}}>
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
                {foods && foods.map(food => {
                    if (food.meal && food.meal.localeCompare(meal_id) === 0) {
                        //correct date/meal
                        return <Food food={food} key={food._id} />;
                    }
                })}
                {/* eslint-disable-next-line */}
                {meals && meals.map(meal => {
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
